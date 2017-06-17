const bookshelf = require('../bookshelf');
require('./user');
require('./thread');

module.exports = bookshelf.model('Message', {
  tableName: 'messages',
  uuid: true,

  author() {
    return this.belongsTo('User', 'authorId');
  },

  thread() {
    return this.belongsTo('Thread', 'threadId');
  },
});
