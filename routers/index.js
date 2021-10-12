const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/auth-middleware");
const Diaries = require("../models/diaries");

router.get("/", authUser, async (req, res) => {
  const userID = res.locals.user;
  try {
    const diaries = await Diaries.find({ userID: userID });
    res.json({ diaries: diaries });
  } catch (err) {
    console.error(err);
    res.status(400).send({ errorMessage: "userID못받아옴." });
  }
});
//수정 userID도 받아서 2번 찾아야함
router.post("/", authUser, async (req, res) => {
  const userID = res.locals.user;
  const { date } = req.body;
  isExist = await Diaries.findOne({ date: date });
  if (!isExist) {
    //해당 날짜에 등록된 게시글이 없을 때
    res.send({ result: "fail" });
    //등록된 게시글 있으면 화면에 뿌려주기 위해 데이터를 뿌려줌
  } else {
    const diaries = await Diaries.find({ userID: userID });
    res.json({ diaries: diaries });
  }
});

module.exports = router;
