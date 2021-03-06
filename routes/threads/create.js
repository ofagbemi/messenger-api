const { uniq } = require('ramda');
const router = require('express').Router();

const Thread = require('../../models/thread');
const authMiddleware = require('../../middleware/auth');

module.exports = router.post('/', authMiddleware, createThread);


async function createThread(req, res, next) {
  const { id } = req.user;
  const { member_ids: memberIds = [] } = req.body;
  try {
    const thread = await new Thread().save();
    await thread.members().attach(uniq([id].concat(memberIds)));
    return res.json(
      await new Thread({ id: thread.id }).fetch({ withRelated: 'members' })
    );
  } catch (err) {
    return next(err);
  }
}
