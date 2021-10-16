const express = require('express');
const router = express.Router();
const authUser = require('../middlewares/auth-middleware');
const { getMonthDiary } = require('./controlls/index');

router
  .route('/')
  // 메인페이지 해당되는 yyyy-mm 의 1일부터 31일까지 다이어리 처리 API
  .get(authUser, getMonthDiary);

module.exports = router;
