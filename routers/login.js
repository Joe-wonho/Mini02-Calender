const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../models/users');
const authUser = require('../middlewares/auth-middleware');

//로그인 postAPI
router.post('/', async (req, res) => {
  try {
    const { userID, PW } = req.body;
    console.log(req.body);

    const user = await Users.findOne({ userID });
    //sign을 해야  토큰을 생성할 수 있다. 유의하자!!!!!!!!!!
    //비밀번호 비교 부터 진행 후 토큰을 생성할 지 말지 정하자
    if (user) {
      if (await bcrypt.compare(PW, user.PW)) {
        const token = jwt.sign(
          { userID: user.userID },
          process.env.SECRET_KEY,
          { expiresIn: '5d' }
        );
        console.log('발급된 토큰 이름:', token);
        res.cookie('mytoken', token, {
          maxAge: 86400 * 3000,
          httpOnly: true, //XSS 공격 방지
          sameSite: 'None',
          secure: true,
        });
        console.log('로그인 성공');
        res.status(200).send({ msg: 'success' });
      } else {
        console.log('아이디 또는 비밀번호가 틀림');
        res.status(200).send({ msg: '아이디 또는 비밀번호가 틀렸습니다.' });
      }
    } else {
      console.log('존재하지않는 아이디');
      res.status(200).send({ msg: '존재하지 않는 아이디입니다.' });
    }
  } catch (err) {
    console.log(
      `method: ${req.method}, url: ${req.originalUrl}, error: ${err}`
    );
    res.status(400).send({ msg: 'fail' });
  }
});

//로그인 getAPI
router.get('/', authUser, async (req, res) => {
  if (res.locals.user) {
    res.send({ msg: 'success' });
  }
});

module.exports = router;
