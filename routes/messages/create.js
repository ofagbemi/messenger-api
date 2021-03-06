const router = require('express').Router();

const Message = require('../../models/message');
const authMiddleware = require('../../middleware/auth');

module.exports = router.post('/', authMiddleware, createMessage);


async function createMessage(req, res, next) {
  const { id } = req.user;
  const { thread_id, body } = req.body;

  try {
    const message = await new Message({ author_id: id, thread_id, body }).save();
    return res.json(
      await new Message({ id: message.id })
        .fetch({ withRelated: ['thread', 'author'] })
    );
  } catch (err) {
    return next(err);
  }
}
