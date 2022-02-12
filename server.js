const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000; // 포트 주소
// 노드.js 서버
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/hello', (req, res) => { // 사용자가 api 경로에 hello로 접속하면
    // http://localhost:5000/api/hello
    res.send({message: "hello Express!!"}); // 메시지 출력
});

// 실제 서버 동작 시키기.
app.listen(port, () => console.log(`Listening on port ${port}`));