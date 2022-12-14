import { Inject, Injectable } from '@nestjs/common'
import { ModelClass } from 'objection'
import { Organization } from './entity/organization.entity'
import { CreateOrganizationDto } from './dto/create-organization.dto'
import { UpdateOrganizationDto } from './dto/update-organization.dto'

@Injectable()
export class OrganizationService {
  constructor(@Inject('OrganizationEntity') private Organization: ModelClass<Organization>) {}

  create(createOrganizationDto: CreateOrganizationDto) {
    return this.Organization.query().insert(createOrganizationDto)
  }

  findAll() {
    return this.Organization.query()
  }

  findOne(id: string) {
    return this.Organization.query().findById(id)
  }

  update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    return this.Organization.query().updateAndFetchById(id, updateOrganizationDto)
  }

  remove(id: string) {
    return this.Organization.query().deleteById(id)
  }
}
