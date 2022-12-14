import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './db/database.module'
import { AsyncContextMiddleware, AsyncContextModule } from './async-context'
import { AppService } from './app.service'
import { AppController } from './app.controller'
import { OrganizationModule } from './organization/organization.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AsyncContextModule,
    OrganizationModule,
    UserModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AsyncContextMiddleware).forRoutes('*')
  }
}
