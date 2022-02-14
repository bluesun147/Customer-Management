const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000; // 포트 주소
const cors = require('cors');
// 노드.js 서버

app.use(cors());

app.use(bodyParser.json()); // 알아서 json형태로 변환
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/customers', (req, res) => { // 고객 목록 보여주는 api
    res.send([ // 클라이언트에게 클라에서 명시해둔 그 데이터 그대로 반환
        { // 클라가 이 경로 접속하면 고객정보 담고있는 배열 데이터를 json형식으로 반환
            // REST api에서는 데이터 주고 받을 때 json 형식으로.
            'id': 1,
            'image': 'https://placeimg.com/64/64/1',
            'name' : '홍길동',
            'birthday' : '990101',
            'gender' : '남',
            'job' : '대학생',
           },
           {
            'id': 2,
            'image': 'https://placeimg.com/64/64/2',
            'name' : '가나다',
            'birthday' : '980101',
            'gender' : '여',
            'job' : '프로그래머',
           },
           {
            'id': 3,
            'image': 'https://placeimg.com/64/64/3',
            'name' : '이이이',
            'birthday' : '970101',
            'gender' : '남',
            'job' : '디자이너',
           }
    ]);
})

// 실제 서버 동작 시키기.
app.listen(port, () => console.log(`Listening on port ${port}`));