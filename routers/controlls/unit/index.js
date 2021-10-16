// 날짜 형식 가공하기
divideDate = (request) => {
  const temp_date = request.query.date.split(',')[0].split('/');
  // yyyy-mm 형식으로 가공
  return temp_date[2] + '-' + temp_date[0];
};

module.exports = {
  divideDate,
};
