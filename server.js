const http = require('./app');

http.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}/api`);
});
