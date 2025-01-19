import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    // Create user table
    await knex.schema.createTable('users', (table) => {
        table.uuid('id').primary();
        table.string('email').notNullable().unique();
        table.string('name').notNullable().unique();
        table.timestamps(true, true);
    });

    // Create expense table
    await knex.schema.createTable('expenses', (table) => {
        table.uuid('id').primary();
        table.uuid('user_id').notNullable();
        table.string("description").notNullable();
        table.decimal('amount', 10, 2).notNullable();
        table.string('category').notNullable();
        table.timestamp('date').notNullable();
        table.timestamps(true, true);

        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    })

    // Create budget table
    await knex.schema.createTable('budgets', (table) => {
        table.uuid('id').primary();
        table.uuid('user_id').notNullable();
        table.decimal('amount', 10, 2).notNullable();
        table.string('category').notNullable();
        table.timestamp('start_date').notNullable();
        table.timestamp('end_date').notNullable();
        table.timestamps(true, true);

        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    });

    await knex.schema.createTable('savings', (table) => {
        table.uuid('id').primary();
        table.uuid('user_id').notNullable();
        table.decimal('amount', 10, 2).notNullable();
        table.string('description').notNullable();
        table.timestamp('end_date').notNullable();
        table.timestamps(true, true);

        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('savings');
    await knex.schema.dropTableIfExists('budgets');
    await knex.schema.dropTableIfExists('expenses');

    await knex.schema.dropTableIfExists('users');
}

