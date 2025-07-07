import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/configuration';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Backend');

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(envs.port);

  logger.log(`Backend running in port ${envs.port}`);
}
bootstrap();
