const jwt = require('jsonwebtoken');
const Users = require('../models/users');

module.exports = async (req, res, next) => {
  //클라이언트에서 token을 주는 것이기에 req로 받아와야 한다..
  // const token = req.cookies.mytoken; //쿠키파서 쓴경우 사용가능

  try {
    const token = req.headers.authorization.split(' ')[1];
    // 로그인한 유저면 토큰 복호화후 ID를 가져오고 해당 ID가 존재하면 저장
    if (token) {
      //메모 아래와 같이 한다면 객체를 생성하게 되어서 loginID.~로 또 해야하기 때문에 {}를 사용해서 바로 payload 에 담긴 id값을 가져오는게 좋다
      const { userID } = jwt.verify(token, process.env.SECRET_KEY);
      const userFind = await Users.findOne({ userID: userID });
      res.locals.user = userFind.userID;
      next();
    } else {
      //토큰이 없는 경우 튕겨나가게 하기 위해
      console.log(
        `method: ${req.method}, url: ${req.originalUrl}, 인증받지 않는 사용자`
      );
      return res
        .status(401)
        .send({ msg: '권한이 없습니다. 로그인 후 이용해주세요.' });
    }
  } catch (err) {
    return res
      .status(400)
      .send({ msg: '로그인 오류입니다. 관리자를 호출하세요.' });
    return;
  }
};
