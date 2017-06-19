const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const { DAY_SECONDS } = require('../../util/constants');

const signAsync = promisify(jwt.sign);

const EXPIRES_IN = DAY_SECONDS;

module.exports = async function generateAuthResponse(user) {
  return {
    id: user.id,
    access_token: await generateAuthToken(user),
    expires_in: EXPIRES_IN,
  };
};

async function generateAuthToken(user) {
  return signAsync({ id: user.get('id') }, process.env.JWT_SECRET, {
    expiresIn: EXPIRES_IN,
  });
}
