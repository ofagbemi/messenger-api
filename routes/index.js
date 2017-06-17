const router = require('express').Router();


module.exports = router
  .use(require('./greetings'))
  .use('/users', require('./users'));
