const express = require('express');
const router = express.Router();
const authUser = require('../middlewares/auth-middleware');
const Diaries = require('../models/diaries');
const Joi = require('joi');

//다이어리 불러오기
router.get('/', authUser, async (req, res) => {
  if (res.locals.user) {
    const userID = res.locals.user;
    const date = req.query.date;
    console.log('diaryGet' + '-' + date);
    try {
      const diaryDate = await Diaries.find({
        userID: userID,
        date: date,
      });
      res.json(diaryDate);
    } catch (err) {
      console.error(err); // 해당월에 diary가 잘 들어갔는지 확인
      res.status(400).send({ errorMessage: 'userID못받아옴.' });
    }
  }
});

// 다이어리 작성  여기 정호님께 물어보기************************
router.post('/', authUser, async (req, res) => {
  const userID = res.locals.user;
  const { date, title, content, color } = req.body;
  try {
    const DiarySchema = Joi.object({
      date: Joi.string().required(),
      title: Joi.string().required(),
      content: Joi.string().required(),
      color: Joi.string().required(),
    });
    // console.log(req);
    const { date, title, content, color } = await DiarySchema.validateAsync(
      req.body
    );
    await Diaries.create({ userID, date, title, content, color });
    console.log('저장 완료');
    res.send({ result: '다이어리 작성 성공' });
  } catch (err) {
    console.log(`method: ${req.method}, url: ${req.originalUrl}, err: ${err}`);

    res.status(200).send({ msg: '다이어리 작성 실패' });
  }
});

//다이어리 수정
router.put('/', authUser, async (req, res) => {
  try {
    const diaryID = req.body.id;
    const { title, content, color } = req.body.post;
    await Diaries.findByIdAndUpdate(diaryID, {
      $set: { title, content, color },
    });
    res.send({ result: '다이어리 수정 성공' });
  } catch (err) {
    console.log(`method: ${req.method}, url: ${req.originalUrl}, err: ${err}`);
    res.send(500).send({ msg: '다이어리 수정 실패' });
  }
});

//다이어리 삭제
router.delete('/', authUser, async (req, res) => {
  try {
    const diaryID = req.query.id;

    await Diaries.findByIdAndDelete(diaryID);
    res.send({ result: 'success' });
  } catch (err) {
    console.log(`method: ${req.method}, url: ${req.originalUrl}, err: ${err}`);
    res.send(500).send({ msg: 'fail' });
  }
});

// //다이어리 불러오기
// router.get('/', async (req, res) => {
//   const date = req.query.date;

//   console.log('확인');
//   console.log(date);
//   try {
//     const diaryDate = await Diaries.find({
//       userID: 'testq',
//       date: date,
//     });
//     res.json(diaryDate);
//   } catch (err) {
//     console.error(err); // 해당월에 diary가 잘 들어갔는지 확인
//     res.status(400).send({ errorMessage: 'userID못받아옴.' });
//   }
// });

// // 다이어리 작성
// router.post('/', async (req, res) => {
//   try {
//     const DiarySchema = Joi.object({
//       date: Joi.string().required(),
//       title: Joi.string().required(),
//       content: Joi.string().required(),
//       color: Joi.string().required(),
//     });

//     const { date, title, content, color } = await DiarySchema.validateAsync(
//       req.body
//     );
//     await Diaries.create({ userID: 'testq', date, title, content, color });
//     console.log('저장 완료');
//     res.send({ result: '다이어리 작성 성공' });
//   } catch (err) {
//     console.log(`method: ${req.method}, url: ${req.originalUrl}, err: ${err}`);

//     res.status(200).send({ msg: '다이어리 작성 실패' });
//   }
// });

// //다이어리 수정
// router.put('/', async (req, res) => {
//   try {
//     console.log(req.body);
//     console.log(req.body.id);
//     const diaryID = req.body.id;
//     const { title, content, color } = req.body.post;
//     console.log(diaryID, title, content, color);
//     await Diaries.findByIdAndUpdate(diaryID, {
//       $set: { title, content, color },
//     });
//     console.log('수정후 콘솔');
//     console.log(Diaries.title, Diaries.content);
//     res.send({ result: '다이어리 수정 성공' });
//   } catch (err) {
//     console.log(`method: ${req.method}, url: ${req.originalUrl}, err: ${err}`);
//     res.send(500).send({ msg: '다이어리 수정 실패' });
//   }
// });

// //다이어리 삭제
// router.delete('/', async (req, res) => {
//   try {
//     const { diaryID } = req.body;
//     await Diaries.findByIdAndDelete(diaryID);
//     res.send({ result: 'success' });
//   } catch (err) {
//     console.log(`method: ${req.method}, url: ${req.originalUrl}, err: ${err}`);
//     res.send(500).send({ msg: 'fail' });
//   }
// });

module.exports = router;
