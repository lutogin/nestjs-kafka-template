import { Body, Controller, Get, Post } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { KAFKA_URL } from '../../config/app.config';
import { IPost } from './interfaces/post.interface';

@Controller('posts')
export class PostsController {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'posts',
        brokers: [KAFKA_URL]
      },
      consumer: {
        groupId: 'posts-consumer',
      }
    }
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('posts.create');
    this.client.subscribeToResponseOf('posts.getAll');

    await this.client.connect();
  }

  @Post('/')
  createPost(
    @Body() post: IPost
  ) {
    return this.client.send('posts.create', post);
  }

  @Get('/')
  getAllPosts() {
    return this.client.send('posts.getAll', null);
  }
}
