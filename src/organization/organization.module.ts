import { Module, Provider } from '@nestjs/common'
import { OrganizationService } from './organization.service'
import { OrganizationController } from './organization.controller'
import { AsyncContext } from 'src/async-context/async-context'
import { Organization } from './entity/organization.entity'
import { applyAsyncContext } from 'src/db/database.module'

const OrganizationEntityProvider: Provider = {
  inject: [AsyncContext],
  provide: 'OrganizationEntity',
  useFactory: async (asyncContext: AsyncContext) => {
    return applyAsyncContext(Organization, asyncContext)
  },
}

@Module({
  controllers: [OrganizationController],
  providers: [OrganizationService, OrganizationEntityProvider],
})
export class OrganizationModule {}
