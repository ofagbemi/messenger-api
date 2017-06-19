const router = require('express').Router();

const User = require('../../models/user');
const authMiddleware = require('../../middleware/auth');

module.exports = router
  .use(authMiddleware)
  .get('/', fetchUsers)
  .get('/:id', fetchUser);


async function fetchUser(req, res, next) {
  const { id } = req.params;
  try {
    const user = await new User({ id }).fetch();
    if (!user) {
      return next({
        message: `Could not find user with id "${id}"`,
        status: 404,
      });
    }
    return res.json(user);
  } catch (err) {
    return next(err);
  }
}

async function fetchUsers(req, res, next) {
  const { ids } = req.query;
  try {
    const users = await new User()
      .query(qb => qb.where('id', 'in', ids))
      .fetchAll();
    return res.json({ results: users });
  } catch (err) {
    return next(err);
  }
}
