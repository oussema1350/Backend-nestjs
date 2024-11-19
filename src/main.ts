import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  try {
    const logger = new Logger('Bootstrap');
    logger.log('Starting application...');

    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });
    logger.log('Application created successfully');

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
    logger.log('Global pipes configured');

    // Swagger configuration
    const config = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('API for managing backend user authentication')
      .setVersion('1.0')
      .addBearerAuth() // Optional: Add authentication
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document); // Swagger UI available at /api
    logger.log('Swagger documentation set up at /api');

    await app.listen(3000);
    logger.log('Application is listening on port 3000');
  } catch (error) {
    const logger = new Logger('Bootstrap');
    logger.error(`Error during application bootstrap: ${error.message}`, error.stack);
    process.exit(1);
  }
}

bootstrap().catch((error) => {
  const logger = new Logger('Unhandled');
  logger.error(`Unhandled error during bootstrap: ${error.message}`, error.stack);
  process.exit(1);
});