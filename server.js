const fs = require('fs'); // 파일 접근. database.json에서 db 환경설정 정보 읽어와야함
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000; // 포트 주소
const cors = require('cors');
// 노드.js 서버

app.use(cors());

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

app.get('/api/customers', (req, res) => { // 고객 목록 보여주는 api
    connection.query(
        "SELECT * FROM management.CUSTOMER", // customer 테이블에 접근해서 데이터 가져오도록
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

// 실제 서버 동작 시키기.
app.listen(port, () => console.log(`Listening on port ${port}`));