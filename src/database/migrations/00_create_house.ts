import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('house', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.decimal('longitude').notNullable();
        table.decimal('latitude').notNullable();
        table.string('uf',2).notNullable();
        table.string('city').notNullable();
        table.string('neighborhood').notNullable();
        table.string('street').notNullable();
        table.integer('number').notNullable();
        table.integer('telephone').nullable();
        table.string('email').nullable();
    });
};

export async function down(knex : Knex){
    return knex.schema.dropTable('house');
} 