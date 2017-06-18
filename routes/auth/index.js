const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const router = require('express').Router();

const User = require('../../models/user');
const generateAuthResponse = require('./generateAuthResponse');

const compareAsync = promisify(bcrypt.compare);


module.exports = router.post('/', authUser);

async function authUser(req, res, next) {
  const { username, password } = req.body;

  try {
    const user = await User.where({ username }).fetch();
    if (!user) {
      return next({
        status: 404,
        message: `User '${user}' could not be found`,
      });
    }
    if (await compareAsync(password, user.get('passwordHash'))) {
      return res.json(await generateAuthResponse(user));
    }
    return res.json({
      status: 403,
      message: `Incorrect password for user ${username}`,
    });
  } catch (err) {
    return next(err);
  }
}
