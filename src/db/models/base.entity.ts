import { Injectable } from '@nestjs/common'
import { Model, ModelOptions, QueryContext } from 'objection'
import { AsyncContext } from 'src/async-context/async-context'

@Injectable()
export class BaseEntity extends Model {
  readonly id: string
  getAsyncContext: () => AsyncContext
  updatedAt: Date
  lastUpdatedBy: string
  async $beforeUpdate(opt: ModelOptions, queryContext: QueryContext): Promise<void> {
    await super.$beforeUpdate(opt, queryContext)
    this.lastUpdatedBy = this.getAsyncContext()?.get('userId')
    this.updatedAt = new Date()
  }
}
