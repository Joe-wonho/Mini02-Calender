const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../models/users');
const authUser = require('../middlewares/auth-middleware');

//로그인 postAPI
router.post('/', async (req, res) => {
  const { userID, PW } = req.body;

  const existUsers = await Users.findOne({ userID });

  //sign을 해야  토큰을 생성할 수 있다. 유의하자!!!!!!!!!!
  //비밀번호 비교 부터 진행 후 토큰을 생성할 지 말지 정하자
  const match = await bcrypt.compare(PW, existUsers.PW);
  if (match) {
    const token = jwt.sign(
      { userID: existUsers.userID },
      process.env.SECRET_KEY,
      { expiresIn: '3d' }
    );
    // console.log("발급된 토큰 이름:", token);
    res.cookie('mytoken', token, {
      maxAge: 86400 * 3000,
      httpOnly: true, //XSS 방어를 위해 사용 아래도
      sameSite: 'None',
    });
    res.send({ msg: 'success' });
  } else {
    res
      .status(400)
      .send({ errorMessage: '아이디 또는 패스워드가 잘못됐습니다.' });
  }
});

//로그인 getAPI
router.get('/', authUser, async (req, res) => {
  res.send({ msg: 'success' });
});

module.exports = router;
