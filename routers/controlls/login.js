const Users = require('../../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const printError = require('./unit/error'); //공통된 에러처리

//로그인 페이지 허용, 로그인한 유저는 튕겨져 나감
GetLoginPage = (req, res, next) => {
  try {
    if (res.locals.user) {
      console.log(res.locals.user);
      res.send({ msg: 'success' });
    }
  } catch (err) {
    printError(req, err);
    next();
  }
};

//로그인 시도
TryLogin = async (req, res, next) => {
  try {
    const { userID, PW } = req.body;
    const user = await Users.findOne({ userID });
    if (user) {
      if (await bcrypt.compare(PW, user.PW)) {
        //로그인 성공시 토큰 생성
        const token = jwt.sign(
          { userID: user.userID },
          process.env.SECRET_KEY,
          { expiresIn: '5d' }
        );
        console.log(`발급된 토큰: ${token}\n 로그인 성공`);
        res.send({ msg: 'success', token: token });
      } else {
        res.send({ msg: '아이디 또는 비밀번호가 틀렸습니다.' });
      }
    } else {
      res.send({ msg: '존재하지 않는 아이디입니다.' });
    }
  } catch (err) {
    printError(req, err);
    next();
  }
};

module.exports = { GetLoginPage, TryLogin };
