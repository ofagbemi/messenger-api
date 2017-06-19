exports.up = function (knex) {
  return knex.schema.createTable('threads', table => {
    table.uuid('id').primary();
    table.string('name');
    table.timestamp('created_at');
    table.timestamp('updated_at');
  }).createTable('messages', table => {
    table.uuid('id').primary();
    table.uuid('author_id');
    table.uuid('thread_id');
    table.foreign('author_id').references('users.id');
    table.foreign('thread_id').references('threads.id');
    table.text('body');
    table.timestamp('created_at');
    table.timestamp('updated_at');
  }).createTable('threads_members', table => {
    table.uuid('thread_id');
    table.uuid('member_id');
    table.foreign('thread_id').references('threads.id');
    table.foreign('member_id').references('users.id');
    table.timestamp('created_at');
    table.timestamp('updated_at');
  });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('threads_members')
    .dropTable('messages')
    .dropTable('threads');
};
