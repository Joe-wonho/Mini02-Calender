const express = require('express');
const { exist } = require('joi');
const router = express.Router();
const authUser = require('../middlewares/auth-middleware');
const Diaries = require('../models/diaries');

router.get('/', authUser, async (req, res) => {
  const userID = res.locals.user;
  const temp_date = req.query.date.split(',')[0].split('/');
  const date = temp_date[2] + '-' + temp_date[0];
  console.log(date); //버튼 클릭시 월을 바꾸면 월이 잘 들어오는지 확인
  try {
    const diaryDate = await Diaries.find({
      userID: userID,
      date: {
        $gte: date + '-01',
        $lte: date + '-31',
      },
    });
    console.log(diaryDate);
    res.json(diaryDate);
  } catch (err) {
    console.error(err); // 해당월에 diary가 잘 들어갔는지 확인
    res.status(400).send({ errorMessage: 'userID못받아옴.' });
  }
});

//수정 userID도 받아서 2번 찾아야함
router.post('/', authUser, async (req, res) => {
  const userID = res.locals.user;
  const { date } = req.body;
  isExist = await Diaries.findOne({ date: date });
  if (!isExist) {
    //해당 날짜에 등록된 게시글이 없을 때
    res.send({ result: 'fail' });
    //등록된 게시글 있으면 화면에 뿌려주기 위해 데이터를 뿌려줌
  } else {
    const diaries = await Diaries.find({ userID: userID });
    res.json({ diaries: diaries });
  }
});

// router.get('/', async (req, res) => {
//   try {
//     const diaries = await Diaries.find();
//     res.json({ diaries: diaries });
//   } catch (err) {
//     console.error(err);
//     res.status(400).send({ errorMessage: 'userID못받아옴.' });
//   }
// });

// //수정 userID도 받아서 2번 찾아야함
// router.post('/', async (req, res) => {
//   const { date } = req.body;
//   isExist = await Diaries.findOne({ date: date });
//   if (!isExist) {
//     //해당 날짜에 등록된 게시글이 없을 때
//     res.send({ result: 'fail' });
//     //등록된 게시글 있으면 화면에 뿌려주기 위해 데이터를 뿌려줌
//   } else {
//     const diaries = await Diaries.find();
//     res.json({ diaries: diaries });
//   }
// });

module.exports = router;
