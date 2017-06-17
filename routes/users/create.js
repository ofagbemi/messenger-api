const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const router = require('express').Router();

const User = require('../../models/user');

const hashAsync = promisify(bcrypt.hash);

const SALT_ROUNDS = 10;

module.exports = router.post('/', createUser);


async function createUser(req, res, next) {
  const {
    username,
    firstName,
    lastName,
    password,
  } = req.body;

  let passwordHash;
  try {
    passwordHash = await hashAsync(password, SALT_ROUNDS);
  } catch (err) {
    return next(err);
  }

  try {
    const user = await new User({
      username,
      firstName,
      lastName,
      passwordHash,
    }).save();
    return res.json(user.clean());
  } catch (err) {
    return next(err);
  }
}
