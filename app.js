const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const port = 3000;

// MongoDB Router
const connect = require("./models");
connect();

// Middleware
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser(process.env.SECRET_KEY));

// Router
const loginUpPageRouter = require("./routers/login");
app.use("/login", loginUpPageRouter);
const signUpPageRouter = require("./routers/signup");
app.use("/signup", signUpPageRouter);
const mainPageRouter = require("./routers");
app.use("/", mainPageRouter);
const diaryRouter = require("./routers/diary");
app.use("/diary", diaryRouter);

//Render

//캘린더 메인
// app.get("/home", (req, res) => {
//   res.render("index");
// });

//로그인 페이지
app.get("/login", (req, res) => {
  res.render("login");
});

//회원가입페이지
app.get("/signup", (req, res) => {
  res.render("signup");
});

app.listen(port, () => {
  console.log(`listening at http://localhost:3000`);
});

module.exports = app;
