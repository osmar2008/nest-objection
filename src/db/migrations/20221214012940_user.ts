import type { Knex } from 'knex'

const tableName = 'user'

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.uuid('id').unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'))
    t.uuid('organizationId').references('id').inTable('organization')
    t.string('username').notNullable()
    t.string('email').notNullable().unique()
    t.timestamp('updated_at')
    t.uuid('lastUpdatedBy')
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName)
}
