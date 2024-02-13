import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as csurf from 'csurf'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  await app.listen(5555)

  app.use(csurf())
}
bootstrap()
