import { Injectable } from '@nestjs/common';
import { IPost } from './interfaces/post.interface';

@Injectable()
export class PostsService {
  private readonly posts: IPost[];

  constructor() {
    this.posts = [];
  }

  async addPost(post: IPost) {
    this.posts.push(post);
    return this.posts[this.posts.length - 1];
  }

  async getAllPosts() {
    return this.posts;
  }
}
