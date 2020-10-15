import { NestFactory } from '@nestjs/core';
import { KAFKA_URL } from '../config/app.config';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'post',
        brokers: [KAFKA_URL],
      },
      consumer: {
        groupId: 'posts-consumer',
      }
    }
  });

  app.listen(() => console.log('Posts service is listening...'))
}

bootstrap();
