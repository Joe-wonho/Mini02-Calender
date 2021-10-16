const Diaries = require('../../models/diaries');
const Joi = require('joi');
const printError = require('../controlls/unit/error');

// 특정 다이어리 불러오기
GetDetailDiary = async (req, res, next) => {
  try {
    const diaryData = await Diaries.find({
      userID: res.locals.user,
      date: req.query.date,
    });
    res.json(diaryData);
  } catch (err) {
    printError(req, err);
    next(err);
  }
};

// 다이어리 작성 기능
CreateDiary = async (req, res, next) => {
  try {
    // Joi 검증
    const DiarySchema = Joi.object({
      date: Joi.string().required(),
      title: Joi.string().required(),
      content: Joi.string().required(),
      color: Joi.string().required(),
    });
    const userID = res.locals.user;
    const { date, title, content, color } = await DiarySchema.validateAsync(
      req.body
    );
    // Diaries DB 저장
    await Diaries.create({ userID, date, title, content, color });
    res.send({ msg: '다이어리 작성에 성공했습니다.' });
  } catch (err) {
    printError(req, err);
    next();
  }
};

// 다이어리 수정 기능
EditDiary = async (req, res, next) => {
  try {
    const diaryID = req.body.id;
    const { title, content, color } = req.body.post;
    // 다이어리 수정
    await Diaries.findByIdAndUpdate(diaryID, {
      $set: { title, content, color },
    });
    res.send({ msg: 'success' });
  } catch (err) {
    printError(req, err);
    next();
  }
};

// 다이어리 삭제 기능
DeleteDiary = async (req, res, next) => {
  try {
    // 다이어리 삭제
    await Diaries.findByIdAndDelete(req.query.id);
    res.send({ msg: 'success' });
  } catch (err) {
    printError(req, err);
    next();
  }
};

module.exports = {
  CreateDiary,
  EditDiary,
  DeleteDiary,
  GetDetailDiary,
};
