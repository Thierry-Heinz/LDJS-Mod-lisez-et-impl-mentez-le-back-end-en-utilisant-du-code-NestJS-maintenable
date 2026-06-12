import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { UpdateRentalsDto } from './rentals/dto/update-rentals.dto';
import { CreateRentalsDto } from './rentals/dto/create-rentals.dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('Chatôp Swagger')
    .setDescription('Chatôp API description')
    .setVersion('1.0')
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config, {
    extraModels: [UpdateRentalsDto, CreateRentalsDto],
  });
  SwaggerModule.setup('api/swagger', app, documentFactory);

  app.enableCors({
    origin: 'http://localhost:5173',
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
