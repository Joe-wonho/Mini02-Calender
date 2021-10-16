const express = require('express');
const router = express.Router();
const { SignUser, CheckDuplicatedID } = require('./controlls/signup');

router
  .route('')
  // 회원가입 등록에 대한 API
  .post(SignUser);

router
  .route('/checkup')
  // 회원가입 페이지 중복확인 이벤트에 대한 처리 API
  .post(CheckDuplicatedID);

module.exports = router;
