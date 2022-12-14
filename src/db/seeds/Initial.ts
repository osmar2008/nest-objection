import type { Knex } from 'knex'
import { User } from '../../user/entity/user.entity'
import { Organization } from '../../organization/entity/organization.entity'

export async function seed(knex: Knex): Promise<any> {
  // @ts-ignore
  const organization = await Organization.query(knex).insert({ name: 'Organization1' }).returning('*')
  // @ts-ignore
  await User.query(knex).insert([
    {
      organizationId: organization.id,
      username: 'user1',
      email: 'user1@test.com',
    },
    {
      organizationId: organization.id,
      username: 'user2',
      email: 'user2@test.com',
    },
  ])
}
