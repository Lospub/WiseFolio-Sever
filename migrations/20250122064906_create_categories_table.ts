import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('categories', (table) => {
        table.uuid('id').primary();
        table.string('name').notNullable().unique(); 
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('categories');
};