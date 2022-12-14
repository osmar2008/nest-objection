import type { Knex } from 'knex'

const tableName = ''

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.uuid('id').unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'))
    t.timestamp('updated_at')
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName)
}
