import { Module, Provider } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { applyAsyncContext, DatabaseModule } from 'src/db/database.module'
import { AsyncContext } from 'src/async-context/async-context'
import { User } from './entity/user.entity'

const UserEntityProvider: Provider = {
  inject: [AsyncContext],
  provide: 'UserEntity',
  useFactory: async (asyncContext: AsyncContext) => {
    return applyAsyncContext(User, asyncContext)
  },
}


@Module({
  controllers: [UserController],
  providers: [UserService, UserEntityProvider],
})
export class UserModule {}
