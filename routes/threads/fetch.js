const router = require('express').Router();

const bookshelf = require('../../bookshelf');
const Thread = require('../../models/thread');
const authMiddleware = require('../../middleware/auth');

module.exports = router
  .use(authMiddleware)
  .get('/', fetchThreads)
  .get('/:id', fetchThread);


async function fetchThreads(req, res, next) {
  const { id } = req.user;
  try {
    const knex = bookshelf.knex;
    const subquery = knex('threads_members')
      .select('thread_id')
      .where('member_id', '=', id);
    const threads = await new Thread()
      .query(qb => qb.where('id', 'in', subquery))
      .fetchAll({ withRelated: [{ members: qb => qb.column('id') }] });
    return res.json({ results: threads });
  } catch (err) {
    return next(err);
  }
}

async function fetchThread(req, res, next) {
  const { id } = req.params;
  try {
    const thread = await new Thread({ id }).fetch({ withRelated: ['members'] });
    if (!thread) {
      return next({
        message: `Could not find thread with id "${id}"`,
        status: 404,
      });
    }
    return res.json(thread);
  } catch (err) {
    return next(err);
  }
}
