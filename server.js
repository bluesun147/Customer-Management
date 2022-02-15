const fs = require('fs'); // 파일 접근. database.json에서 db 환경설정 정보 읽어와야함
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000; // 포트 주소
// node.js 서버

app.use(bodyParser.json()); // 알아서 json형태로 변환
app.use(bodyParser.urlencoded({extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

const multer = require('multer'); // 파일 처리 위한 라이브러리
const upload = multer({dest: './upload'}) // 업로드 폴더 설정. 사용자 파일 업로드 되는 공간

app.get('/api/customers', (req, res) => { // 고객 목록 보여주는 api
    connection.query( // sql 구문
        "SELECT * FROM management.CUSTOMER WHERE isDeleted = 0", // customer 테이블에 접근해서 삭제안된 데이터 가져오도록
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});
 
/* 
/upload라는 이름의 폴더를 사용자가 접근해서
프로필 이미지 확인할수 있도록 하기 위해
static 사용해 upload 폴더 공유.
image 폴더에서 upload 폴더에 접근하도록
*/
app.use('/image', express.static('./upload'));

// customers 경로에 사용자가 고객 추가 데이터 전송했을 때 이를 처리할수 있도록
app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)'; // 0은 삭제 안된 상태
    // 이미지 jpg만 됨.
    //let image = '/image/' + req.file.filename; // image 경로에 있는 해당 파일 이름으로 이미지에 접근
    let image = 'http://localhost:5000/image/'  + req.file.filename; // image 경로에 있는 해당 파일 이름으로 이미지에 접근
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    // 실제 데이터베이스에 값 넣을 때 각 ?에 데이터 바인딩 됨.
    let params = [image, name, birthday, gender, job]; 
    connection.query(sql, params, // 
        (err, rows, fields) => {
            res.send(rows);
        })
})

app.delete('/api/customers/:id', (req, res) => {
    let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

// 실제 서버 동작 시키기.
app.listen(port, () => console.log(`Listening on port ${port}`));