import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SERVER_PORT } from './config/constants';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = parseInt(configService.get<string>(SERVER_PORT),10 || 3000);
  //const port = 3000;
  // app.useGlobalFilters(new AllExceptionFilter());
  // app.useGlobalInterceptors(new TimeOutInterceptor());
  // app.useGlobalPipes(new ValidationPipe({
  //   transform: true,
  //   whitelist: true,
  //   forbidNonWhitelisted: true,
  // }));
  app.enableCors();

  await app.listen(port);  
  const logger = new Logger();
  logger.log(`corriendo en el servidor ${await app.getUrl()}`)
}
bootstrap();
