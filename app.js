const express = require('express');
const app = express();
const port = 4000;
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');
// MongoDB Router
const connect = require('./models');
connect();

// Middleware
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser(process.env.SECRET_KEY));
app.use(
  cors({
    origin: true,
    credentials: true, // 크로스 도메인 허용
  })
);

// Router
const loginUpPageRouter = require('./routers/login');
app.use('/login', loginUpPageRouter);
const signUpPageRouter = require('./routers/signup');
app.use('/signup', signUpPageRouter);
const mainPageRouter = require('./routers');
app.use('/', mainPageRouter);
const diaryRouter = require('./routers/diary');
app.use('/diary', diaryRouter);

//Render

app.listen(port, () => {
  console.log(`listening at http://localhost:4000`);
});

module.exports = app;
