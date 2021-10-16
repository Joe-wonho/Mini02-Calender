const express = require('express');
const { TryLogin, GetLoginPage } = require('./controlls/login');
const router = express.Router();
const authUser = require('../middlewares/auth-middleware');

router
  .route('')
  //로그인 페이지 렌더링
  .get(authUser, GetLoginPage)
  //로그인 이벤트
  .post(TryLogin);

module.exports = router;
