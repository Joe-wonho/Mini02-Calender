const Users = require('../../models/users');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const { CheckRegister } = require('./unit/signup');
const printError = require('../controlls/unit/error');

//회원가입 등록
SignUser = async (req, res, next) => {
  try {
    const UserSchema = Joi.object({
      userID: Joi.string().min(4).alphanum().required(),
      PW: Joi.string()
        .min(4)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
      confirmPW: Joi.ref('PW'),
    });

    const { userID, PW, confirmPW } = await UserSchema.validateAsync(req.body);
    const CheckID = await CheckRegister(userID, PW, confirmPW);

    if (await Users.findOne({ userID })) {
      res.send({ msg: '이미 존재하는 아이디입니다' });
    } else if (CheckID) {
      res.send(CheckID);
    } else {
      // bcrypt 를 활용한 비밀번호 암호화 및 DB 생성
      const EncryptPW = bcrypt.hashSync(PW, parseInt(process.env.SALT));
      await Users.create({ userID, PW: EncryptPW });
      res.status(200).send({ msg: 'success' });
    }
  } catch (err) {
    printError(req, err);
    next(err);
  }
};

//ID 중복확인 체크
CheckDuplicatedID = async (req, res, next) => {
  try {
    const { userID } = req.body;
    const existUsers = await Users.findOne({ userID });
    if (existUsers) {
      res.send({ msg: '이미 존재하는 아이디입니다.' });
    } else {
      res.send({ msg: '사용 가능한 아이디입니다' });
    }
  } catch (err) {
    printError(req, err);
    next();
  }
};

module.exports = { SignUser, CheckDuplicatedID };
