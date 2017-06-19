const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const router = require('express').Router();

const User = require('../models/user');
const generateAuthResponse = require('./auth/generateAuthResponse');

const hashAsync = promisify(bcrypt.hash);

const SALT_ROUNDS = 10;

module.exports = router.post('/', registerUser);


async function registerUser(req, res, next) {
  const {
    username,
    first_name,
    last_name,
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
      first_name,
      last_name,
      password_hash: passwordHash,
    }).save();
    return res.json(await generateAuthResponse(user));
  } catch (err) {
    return next(err);
  }
}
