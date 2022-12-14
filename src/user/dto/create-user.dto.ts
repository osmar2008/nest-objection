import { IsEmail, Max } from 'class-validator'

export class CreateUserDto {
  @Max(30)
  username: string

  @IsEmail()
  email: string
}
