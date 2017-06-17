const bookshelf = require('../bookshelf');
require('./user');
require('./message');


module.exports = bookshelf.model('Thread', {
  tableName: 'threads',
  uuid: true,

  members() {
    return this.belongsToMany('User', 'threads_members', 'threadId', 'memberId');
  },

  messages() {
    return this.hasMany('Message');
  },
});
