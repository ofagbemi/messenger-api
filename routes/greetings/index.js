const router = require('express').Router();

module.exports = router
  .get('/', (req, res) => {
    const message = 'hello world!';
    return res.json({ message });
  });
