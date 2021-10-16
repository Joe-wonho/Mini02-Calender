// 다이어리 관련 Router
const express = require('express');
const router = express.Router();
const authUser = require('../middlewares/auth-middleware');
const {
  CreateDiary,
  EditDiary,
  DeleteDiary,
  GetDetailDiary,
} = require('./controlls/diary');

router
  .route('/')
  // 특정 다이어리 불러오기
  .get(authUser, GetDetailDiary)
  // 다이어리 작성
  .post(authUser, CreateDiary)
  // 다이어리 수정
  .put(authUser, EditDiary)
  // 다이어리 삭제
  .delete(authUser, DeleteDiary);

module.exports = router;
