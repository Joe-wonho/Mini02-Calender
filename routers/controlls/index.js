const { divideDate } = require('./unit/index');
const Diaries = require('../../models/diaries');

// 메인페이지에 보여지는 yyyy-mm 요청에 대한 DB 검출
getMonthDiary = async (req, res, next) => {
  try {
    const date = divideDate(req);
    // 로그인한 유저가 쓴 다이어리만 가져오게 필터링
    const diaryDate = await Diaries.find(
      {
        date: {
          $gte: date + '-01',
          $lte: date + '-31',
        },
        userID: res.locals.user,
      },
      //저 컬럼만 가져오겠다는 표시를 위해 사용 공식문서 확인해보기
      { date: 1, title: 1, color: 1 }
    );
    res.json(diaryDate);
  } catch (err) {
    printError(req, err);
    next();
  }
};

module.exports = {
  getMonthDiary,
};
