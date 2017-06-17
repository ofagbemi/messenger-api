const bookshelf = require('../bookshelf');
require('./thread');
require('./message');


module.exports = bookshelf.model('User', {
  tableName: 'users',
  uuid: true,

  threads() {
    return this.belongsToMany('Thread');
  },

  messages() {
    return this.hasMany('Message');
  },

  hidden: [
    'passwordHash',
    '_pivot_threadId',
    '_pivot_memberId',
  ],
});
