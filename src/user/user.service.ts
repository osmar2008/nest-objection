import { Injectable, Inject } from '@nestjs/common'
import { ModelClass } from 'objection'
import { User } from './entity/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { AsyncContext } from 'src/async-context/async-context'

@Injectable()
export class UserService {
  constructor(@Inject('UserEntity') private readonly User: ModelClass<User>, 
  private readonly asyncContext: AsyncContext) {}
  create(createUserDto: CreateUserDto) {
    this.asyncContext.get('userId')
    return this.User.query().insert(createUserDto )
  }

  findAll() {
    return this.User.query()
  }

  findOne(id: string) {
    return this.User.query().findById(id)
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.User.query().updateAndFetchById(id, updateUserDto)
  }

  remove(id: string) {
    return this.User.query().deleteById(id)
  }
}
