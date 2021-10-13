const express = require('express');
const router = express.Router();
const authUser = require('../middlewares/auth-middleware');
const Diaries = require('../models/diaries');
const Joi = require('joi');

//다이어리 불러오기

// 다이어리 작성
router.post('/', authUser, async (req, res) => {
  const userID = res.locals.user;
  console.log(userID);
  try {
    const DiarySchema = Joi.object({
      date: Joi.string().required(),
      title: Joi.ref('date'),
      content: Joi.ref('date'),
      color: Joi.ref('date'),
    });
    const { date, title, content, color } = await DiarySchema.validateAsync(
      req.body
    );
    await Diaries.create({ userID, date, title, content, color });
    res.send({ result: 'success' });
  } catch (err) {
    console.log(`method: ${req.method}, url: ${req.originalUrl}, err: ${err}`);

    res.status(200).send({ msg: 'fail11' });
  }
});

//다이어리 수정
router.put('/', authUser, async (req, res) => {
  try {
    const { diaryID, title, content, color } = req.body;
    await Diaries.findByIdAndUpdate(diaryID, {
      $set: { title, content, color },
    });
    res.send({ result: 'success' });
  } catch (err) {
    console.log(`method: ${req.method}, url: ${req.originalUrl}, err: ${err}`);
    res.send(500).send({ msg: 'fail' });
  }
});

//다이어리 삭제
router.delete('/', authUser, async (req, res) => {
  try {
    const { diaryID } = req.body;
    await Diaries.findByIdAndDelete(diaryID);
    res.send({ result: 'success' });
  } catch (err) {
    console.log(`method: ${req.method}, url: ${req.originalUrl}, err: ${err}`);
    res.send(500).send({ msg: 'fail' });
  }
});

// //다이어리 작성
// router.post('/', async (req, res) => {
//   try {
//     const { date, title, content, color } = await req.body;
//     console.log(req.body);
//     const userID = 'testq';
//     await Diaries.create({ userID, date, title, content, color });
//     res.send({ result: 'success' });
//   } catch (err) {
//     console.log(`method: ${req.method}, url: ${req.originalUrl}, err: ${err}`);

//     res.status(200).send({ msg: 'fail11' });
//   }
// });

// //다이어리 수정
// router.put('/', async (req, res) => {
//   try {
//     const { diaryID, title, content, color } = req.body;
//     await Diaries.findByIdAndUpdate(diaryID, {
//       $set: { title, content, color },
//     });
//     res.send({ result: 'success' });
//   } catch (err) {
//     console.log(`method: ${req.method}, url: ${req.originalUrl}, err: ${err}`);
//     res.send(500).send({ msg: 'fail' });
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
