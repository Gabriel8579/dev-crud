import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  require('dotenv').config()
  const app = await NestFactory.create(AppModule);

  app.enableCors({origin: '*'})

  const option = new DocumentBuilder().setTitle('API de Desenvolvedores').setVersion('1.0').setDescription('Documentação da API').build()

  const document = SwaggerModule.createDocument(app, option);
  SwaggerModule.setup('docs', app, document);

  await app.listen(8000);
}
bootstrap();
