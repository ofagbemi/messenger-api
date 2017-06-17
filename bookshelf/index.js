const knex = require('knex')({
  client: 'pg',
  connection: process.env.MESSENGER_DB_URL,
  pool: { min: 0, max: 8 },
});

const bookshelf = require('bookshelf')(knex);
bookshelf.plugin(require('bookshelf-uuid'));
bookshelf.plugin('visibility');
bookshelf.plugin('registry');

module.exports = bookshelf;
