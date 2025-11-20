import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
dotenv.config();


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors( new ClassSerializerInterceptor(app.get(Reflector)))
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

console.log('DB_PASSWORD:', process.env.DB_PASSWORD);