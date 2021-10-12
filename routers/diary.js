const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/auth-middleware");
const Diaries = require("../models/diaries");

//다이어리 작성
router.post("/", authUser, async (req, res) => {
  try {
    const { date, title, content, color } = req.body;
    const userID = res.locals.user;
    await Diaries.create({ userID, date, title, content, color });
    res.send({ result: "success" });
  } catch (err) {
    res.send({ result: "fail" });
  }
});

//다이어리 수정
router.put("/", authUser, async (req, res) => {
  try {
    const { diaryID, title, content, color } = req.body;
    await Diaries.findByIdAndUpdate(diaryID, {
      $set: { title, content, color },
    });
    res.send({ result: "success" });
  } catch (err) {
    res.send({ result: "fail" });
  }
});

//다이어리 삭제
router.delete("/", authUser, async (req, res) => {
  try {
    const { diaryID } = req.body;
    await Diaries.findByIdAndDelete(diaryID);
    res.send({ result: "success" });
  } catch (err) {
    res.send({ result: "fail" });
  }
});

module.exports = router;
