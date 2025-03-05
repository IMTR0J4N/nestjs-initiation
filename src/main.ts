import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import { AllExceptionsFilter } from './all-exceptions-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false, cors: true, bufferLogs: true });

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.useLogger(app.get(LoggerService));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
