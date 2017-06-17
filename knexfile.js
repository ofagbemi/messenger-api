require('dotenv').load();

module.exports = {
  development: {
    client: 'postgresql',
    connection: process.env.MESSENGER_DB_URL,
  },

  staging: {
    client: 'postgresql',
    connection: process.env.MESSENGER_DB_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: process.env.MESSENGER_DB_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
