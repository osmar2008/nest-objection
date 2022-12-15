import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { AsyncContext } from 'src/async-context/async-context'
import { ClsServiceManager } from 'nestjs-cls'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly asyncContext: AsyncContext) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    console.log('userId AsyncContext: ', this.asyncContext.get('userId'))

    const cls = ClsServiceManager.getClsService()

    console.log('userId CLS: ', cls.get('userId'))
    return this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id)
  }
}
