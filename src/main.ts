import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config'

async function bootstrap() {
  const logger = new Logger('bootstrap')
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server')

  await app.listen(serverConfig.port);
  logger.log("Application Start-",serverConfig.port)
}
bootstrap();
