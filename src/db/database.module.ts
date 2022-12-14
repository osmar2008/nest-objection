import { Global, Module, Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Knex from 'knex'
import { knexSnakeCaseMappers, Model, ModelClass } from 'objection'
import { BaseEntity } from './models/base.entity'
import { AsyncContext } from 'src/async-context/async-context'

export function applyAsyncContext(BaseModel: ModelClass<BaseEntity>, asyncContext: AsyncContext) {
  return class ContextBase extends BaseModel {
    getAsyncContext = () => asyncContext
  }
}

const connectionProvider = {
  inject: [ConfigService],
  provide: 'KnexConnection',
  useFactory: async (configService: ConfigService) => {
    const knex = Knex({
      client: 'pg',
      connection: configService.get('DATABASE_URL'),
      debug: configService.get('KNEX_DEBUG') === 'true',
      ...knexSnakeCaseMappers(),
    })

    Model.knex(knex)
    return knex
  },
}

@Global()
@Module({
  providers: [connectionProvider],
  exports: [connectionProvider],
})
export class DatabaseModule {}
