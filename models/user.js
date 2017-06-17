const bookshelf = require('../bookshelf');


module.exports = bookshelf.Model.extend({
  tableName: 'users',
  uuid: true,

  clean() {
    return this.omit('passwordHash');
  },
});
