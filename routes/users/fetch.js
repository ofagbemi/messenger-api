const router = require('express').Router();

const User = require('../../models/user');

module.exports = router.get('/:id', fetchUser);


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
    return res.json(user.clean());
  } catch (err) {
    return next(err);
  }
}
