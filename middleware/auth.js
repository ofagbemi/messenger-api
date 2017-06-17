module.exports = require('express-jwt')({
  secret: process.env.JWT_SECRET,
});
