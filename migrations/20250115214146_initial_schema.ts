import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    // Create user table
    await knex.schema.createTable('users', (table) => {
        table.string('id', 36).primary(); 
        table.string('email').notNullable().unique();
        table.string('name').notNullable().unique();
        table.timestamps(true, true); 
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('users')
}

