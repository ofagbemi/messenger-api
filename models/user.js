const bookshelf = require('../bookshelf');
require('./thread');
require('./message');


module.exports = bookshelf.model('User', {
  tableName: 'users',
  uuid: true,
  hasTimestamps: true,

  threads() {
    return this.belongsToMany('Thread');
  },

  messages() {
    return this.hasMany('Message');
  },

  hidden: [
    'password_hash',
    '_pivot_thread_id',
    '_pivot_member_id',
  ],
});
