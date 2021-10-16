const express = require('express');
const app = express();
const port = 4000;
const loginUpPageRouter = require('./routers/login');
const signUpPageRouter = require('./routers/signup');
const mainPageRouter = require('./routers/index');
const diaryRouter = require('./routers/diary');
const cors = require('cors'); //추가공부
const connect = require('./models');
connect();
require('dotenv').config(); //환경변수를 위해 사용

// middleware
app.use(cors({ credentials: true, origin: true }));
// express 사용을 위한 설정 middle ware 설정
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// 라우터를 위한 middle ware 설정
app.use('/', mainPageRouter);
app.use('/login', loginUpPageRouter);
app.use('/signup', signUpPageRouter);
app.use('/diary', diaryRouter);

//errorHandler 추가하기

//쿠키파서 사용하지 않고 토큰 받기 만약 쿠키파서 적용시 코드
// const cookieParser = require('cookie-parser');
// app.use(cookieParser(process.env.SECRET_KEY)); //쿠키파서 사용할 경우 쓴다.

module.exports = app;
