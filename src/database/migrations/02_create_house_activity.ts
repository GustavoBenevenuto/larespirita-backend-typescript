import Knex from 'knex';

export async function up (knex: Knex){
    return knex.schema.createTable('house_activity', (table) => {
        table.increments('id').primary();
        table.string('weekday').notNullable();
        table.string('hours').notNullable();
        table.integer('id_house').notNullable().references('id').inTable('house');
        table.integer('id_activity').notNullable().references('id').inTable('activity');
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('house_activity');
};