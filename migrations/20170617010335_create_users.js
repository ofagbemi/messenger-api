exports.up = function (knex) {
  return knex.schema.createTable('users', table => {
    table.uuid('id').primary();
    table.string('username');
    table.string('first_name');
    table.string('last_name');
    table.string('password_hash');
    table.timestamp('created_at');
    table.timestamp('updated_at');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
