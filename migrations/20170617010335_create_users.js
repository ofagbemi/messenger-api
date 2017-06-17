exports.up = function (knex) {
  return knex.schema.createTable('users', table => {
    table.uuid('id').primary();
    table.string('username');
    table.string('firstName');
    table.string('lastName');
    table.string('passwordHash');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
