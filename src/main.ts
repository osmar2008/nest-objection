import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import { ApplicationModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule)
  await app.listen(3101)
}

bootstrap()
