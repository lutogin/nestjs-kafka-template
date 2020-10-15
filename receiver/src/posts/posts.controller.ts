import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IKafkaMessage } from '../interfaces/kafka-msg.interface';
import { IPost } from './interfaces/post.interface';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postService: PostsService,
  ) {}

  @MessagePattern('posts.create')
  async createPost(
    @Payload() message: IKafkaMessage<IPost>
  ) {
    return this.postService.addPost(message.value);
  }

  @MessagePattern('posts.getAll')
  async getAllPosts() {
    return this.postService.getAllPosts();
  }
}
