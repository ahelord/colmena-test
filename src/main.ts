import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import './config/dotenv.config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(configService.get<number>('config.port'), '0.0.0.0', () => {
    Logger.log(
      `app listening at ${configService.get<number>('config.port')} with env ${configService.get<number>(
        'config.environment'
      )}`,
      'main.ts'
    );
  });
}

bootstrap();
