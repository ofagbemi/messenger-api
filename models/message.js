const bookshelf = require('../bookshelf');
require('./user');
require('./thread');

module.exports = bookshelf.model('Message', {
  tableName: 'messages',
  uuid: true,
  hasTimestamps: true,

  author() {
    return this.belongsTo('User', 'author_id');
  },

  thread() {
    return this.belongsTo('Thread', 'thread_id');
  },
});
