"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    try {
        const logger = new common_1.Logger('Bootstrap');
        logger.log('Starting application...');
        const app = await core_1.NestFactory.create(app_module_1.AppModule, {
            logger: ['error', 'warn', 'log', 'debug', 'verbose'],
        });
        logger.log('Application created successfully');
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }));
        logger.log('Global pipes configured');
        const config = new swagger_1.DocumentBuilder()
            .setTitle('API Documentation')
            .setDescription('API for managing backend user authentication')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api', app, document);
        logger.log('Swagger documentation set up at /api');
        await app.listen(3000, "0.0.0.0");
        logger.log('Application is listening on port 3000');
    }
    catch (error) {
        const logger = new common_1.Logger('Bootstrap');
        logger.error(`Error during application bootstrap: ${error.message}`, error.stack);
        process.exit(1);
    }
}
bootstrap().catch((error) => {
    const logger = new common_1.Logger('Unhandled');
    logger.error(`Unhandled error during bootstrap: ${error.message}`, error.stack);
    process.exit(1);
});
//# sourceMappingURL=main.js.map