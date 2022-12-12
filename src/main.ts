import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3000;
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.use(morgan('dev'));
  await app.listen(PORT);
  console.log(`http://localhost:${PORT} 👍`);
}
bootstrap();
