import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    // Create user table
    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary(); 
        table.string('email').notNullable().unique(); 
        table.string('name').notNullable(); 
        table.string('password').notNullable(); 
        table.timestamps(true, true); 
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('users')
}

