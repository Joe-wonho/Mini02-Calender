const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const bcrypt = require('bcrypt');
const Joi = require('joi');

//회원가입 등록
router.post('/', async (req, res) => {
  try {
    const postUserSchema = Joi.object({
      userID: Joi.string().min(4).alphanum().required(),
      PW: Joi.string()
        .min(4)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
      confirmPW: Joi.ref('PW'),
    });
    const { userID, PW, confirmPW } = await postUserSchema.validateAsync(
      req.body
    );

    if (!/[a-zA-Z]+/.test(userID) || userID.length < 4) {
      res.status(400).send({
        errorMessage:
          'ID는 4글자이상, 알파벳 대소문자(a~z, A~Z)를 포함해야합니다.',
      });
      return;
    }
    if (PW.includes(userID) || PW.length < 4) {
      res.status(400).send({
        errorMessage: '비밀번호는 4자이상이며 ID를 포함하면 안됩니다.',
      });
      return;
    }

    if (PW !== confirmPW) {
      res.status(400).send({
        errorMessage: '패스워드가 동일하지 않습니다.',
      });
      return;
    }
    const EncryptionPW = bcrypt.hashSync(PW, 10);
    await Users.create({ userID: userID, PW: EncryptionPW });
    res.status(200).send({ msg: 'success' });
  } catch (err) {
    console.log(
      `method: ${req.method}, url: ${req.originalUrl}, error: ${err}`
    );
    res
      .status(500)
      .send({ msg: '(조이검증)요청한 데이터 형식이 올바르지 않습니다.' });
  }
});

//ID 중복확인 체크
router.post('/checkup', async (req, res) => {
  try {
    const { userID } = req.body;
    //find 시에는 빈 리스트가 넘어가는데 이건 true가 되버리므로 findOne을 사용해야 한다.
    const existUsers = await Users.findOne({ userID });
    if (existUsers) {
      res.status(200).send({ msg: '이미 존재하는 아이디입니다.' });
    } else {
      res.send({ msg: '사용할 수 있는 아이디입니다.' });
    }
  } catch (err) {
    console.log(
      `method: ${req.method}, url: ${req.originalUrl}, error: ${err}`
    );
    res.status(400).send({ msg: '중복확인 버튼 에러입니다.' });
  }
});

module.exports = router;
