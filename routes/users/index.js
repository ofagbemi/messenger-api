const router = require('express').Router();

module.exports = router
  .use('/', require('./fetch'))
  .use('/', require('./create'));
