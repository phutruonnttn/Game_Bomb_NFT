import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await setupSwagger(app);
  await app.listen(3000);
}


function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle(` api application`)
    .setVersion(`1.0`)
    .addBearerAuth()
    .addBasicAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);


  SwaggerModule.setup('/docs', app, document, {
    customSiteTitle: `api`,
  });
}
bootstrap();
