import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Konfigurim i detajuar i CORS
  app.enableCors({
    origin: 'http://localhost:4200', // Lejo vetëm këtë domain
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // OPTIONS është i rëndësishëm për preflight
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  await app.listen(3000);
  console.log(`Serveri po xhiron në http://localhost:3000`);
}
bootstrap();
