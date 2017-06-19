const router = require('express').Router();

const Message = require('../../models/message');
const authMiddleware = require('../../middleware/auth');

module.exports = router
  .use(authMiddleware)
  .get('/', fetchMessages);


async function fetchMessages(req, res, next) {
  const { thread_id } = req.query;

  try {
    const messages = await new Message()
      .query(qb => qb.where({ thread_id }))
      .fetchAll();
    return res.json({ results: messages });
  } catch (err) {
    return next(err);
  }
}
