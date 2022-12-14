import { Max } from 'class-validator'

export class CreateOrganizationDto {
  @Max(50)
  name: string
}
