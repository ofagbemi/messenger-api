const router = require('express').Router();

module.exports = router
  .use('/', require('./create'))
  .use('/', require('./fetch'));
