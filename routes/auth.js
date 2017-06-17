const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const router = require('express').Router();

const { DAY_SECONDS } = require('../util/constants');
const User = require('../models/user');

const compareAsync = promisify(bcrypt.compare);
const signAsync = promisify(jwt.sign);


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
      return res.json({
        token: await generateAuthToken(user),
      });
    }
    return res.json({
      status: 403,
      message: `Incorrect password for user ${username}`,
    });
  } catch (err) {
    return next(err);
  }
}

async function generateAuthToken(user) {
  return await signAsync({ id: user.get('id') }, process.env.JWT_SECRET, {
    expiresIn: DAY_SECONDS,
  });
}
