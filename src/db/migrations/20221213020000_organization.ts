import type { Knex } from 'knex'

const tableName = 'organization'

export async function up(knex: Knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
  return knex.schema.createTable(tableName, (t) => {
    t.uuid('id').unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'))
    t.string('name').notNullable().unique()
    t.timestamp('updated_at')
    t.uuid('lastUpdatedBy')
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName)
}
