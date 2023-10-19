import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NodeEnv } from './constants/node-env.enum';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const nodeEnv = configService.get<string>('NODE_ENV');

  if (!nodeEnv || nodeEnv === NodeEnv.DEV) {
    setupSwagger(app);
  }

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const appPort = parseInt(configService.get('APP_PORT') ?? '');

  await app.listen(appPort);
}
bootstrap();
