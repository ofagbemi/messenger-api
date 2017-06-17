const router = require('express').Router();


module.exports = router
  .use(require('./greetings'))
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))
  .use('/threads', require('./threads'))
  .use('/messages', require('./messages'));
