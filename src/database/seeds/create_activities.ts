import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('activity').insert([
        {name: "Assistência Espiritual"},
        {name: "Evangilização Ifantil"},
        {name: "Pré-mocidade"},
        {name: "Mocidade"},
    ]);
}