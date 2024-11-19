import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table.uuid('id').primary();
        table.text('name').notNullable();
        table.text('email').notNullable().unique();
        table.text('password').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    });

    await knex.schema.alterTable('books', (table) => {
        table.uuid('user_id').index();
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users');

    await knex.schema.alterTable('books', (table) => {
        table.dropForeign('user_id');
        table.dropColumn('user_id');
    });
}
