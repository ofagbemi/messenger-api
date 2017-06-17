exports.up = function (knex) {
  return knex.schema.createTable('threads', table => {
    table.uuid('id').primary();
    table.string('name');
  }).createTable('messages', table => {
    table.uuid('id').primary();
    table.uuid('authorId');
    table.uuid('threadId');
    table.foreign('authorId').references('users.id');
    table.foreign('threadId').references('threads.id');
    table.text('body');
  }).createTable('threads_members', table => {
    table.uuid('threadId');
    table.uuid('memberId');
    table.foreign('threadId').references('threads.id');
    table.foreign('memberId').references('users.id');
  });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('threads_members')
    .dropTable('messages')
    .dropTable('threads');
};
