import { Model } from 'objection'
import { applyAsyncContext } from 'src/db/database.module'
import { BaseEntity } from '../../db/models/base.entity'
import { Organization } from '../../organization/entity/organization.entity'


class Something {
  test: string
  
  constructor(){}
  
  static factory() {
    this.test 
  }
  
}
const Base = applyAsyncContext(BaseEntity, asyncContext)
export class User extends BaseEntity {
  static tableName = 'user'

  organizationId: string

  username: string
  email: string

  static relationMappings() {
    return {
      organization: {
        modelClass: Organization,
        relation: Model.BelongsToOneRelation,
        join: {
          from: 'user.organizationId',
          to: 'organization.id',
        },
      },
    }
  }
}
