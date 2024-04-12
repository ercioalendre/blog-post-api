import { Module } from '@nestjs/common';
import { PrismaService } from '@modules/database/prisma/services';
import { PostPrismaRepository } from '@modules/post/repositories';
import {
  CreateOnePostController,
  GetOnePostByIdController,
  GetManyPostController,
  UpdateOnePostByIdController,
  SoftDeleteOnePostByIdController,
  HardDeleteOnePostByIdController,
} from '@modules/post/controllers';
import {
  CreateOnePostService,
  GetManyPostService,
  GetOnePostByIdService,
  UpdateOnePostByIdService,
  SoftDeleteOnePostByIdService,
  HardDeleteOnePostByIdService,
} from '@modules/post/services';

@Module({
  controllers: [
    CreateOnePostController,
    GetManyPostController,
    GetOnePostByIdController,
    UpdateOnePostByIdController,
    SoftDeleteOnePostByIdController,
    HardDeleteOnePostByIdController,
  ],
  providers: [
    CreateOnePostService,
    GetManyPostService,
    GetOnePostByIdService,
    UpdateOnePostByIdService,
    SoftDeleteOnePostByIdService,
    HardDeleteOnePostByIdService,
    PostPrismaRepository,
    PrismaService,
  ],
  exports: [PostPrismaRepository],
})
export class PostModule {}
