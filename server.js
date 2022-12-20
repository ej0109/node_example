const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var expressSession = require('express-session');

const app = express();
const db = require('./app/models');
db.sequelize.sync();

var corOptions = {
  origin: "http://localhost:8080",
};


//해당 도메인(http://localhost:5000)만 제한 없이 해당 서버에 요청을 보내고 응답을 받을 수 있다.
app.use(cors(corOptions));

// application/json <- 제이슨타입으로 된거 분석해서 가지고 올 수 있음
app.use(bodyParser.json());

// 클라이언트에서 오는 정보를 서버에서 가지고 올 수 있게 함
app.use(bodyParser.urlencoded({ extended: true }));


//ejs 
// ejs 엔진을 실행하기 위한 코드
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs')
//ejs


///// 세션셋팅
app.use(
  expressSession({
    secret : "my key",
    resave : true,
    saveUninitialized: true,
  })
);



// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});

require('./app/routes/member.routes')(app);
require('./app/routes/board.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}!`);
});