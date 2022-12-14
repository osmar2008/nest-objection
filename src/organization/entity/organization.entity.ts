import { BaseEntity } from '../../db/models/base.entity'

// @ts-ignore
export class Organization extends BaseEntity {
  static tableName = 'organization'

  name: string
}
