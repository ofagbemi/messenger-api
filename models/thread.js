const bookshelf = require('../bookshelf');
require('./user');
require('./message');


module.exports = bookshelf.model('Thread', {
  tableName: 'threads',
  uuid: true,
  hasTimestamps: true,

  members() {
    return this.belongsToMany('User', 'threads_members', 'thread_id', 'member_id');
  },

  messages() {
    return this.hasMany('Message');
  },
});
