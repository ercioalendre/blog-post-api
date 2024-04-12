import { Module } from '@nestjs/common';
import { PrismaService } from '@modules/database/prisma/services';
import { UserPrismaRepository } from '@modules/user/repositories';
import { AppCrypto } from '@utilities';
import {
  CreateOneUserController,
  GetOneUserByIdController,
  GetManyUserController,
  UpdateOneUserByIdController,
  SoftDeleteOneUserByIdController,
  HardDeleteOneUserByIdController,
} from '@modules/user/controllers';
import {
  CreateOneUserService,
  GetManyUserService,
  GetOneUserByIdService,
  UpdateOneUserByIdService,
  SoftDeleteOneUserByIdService,
  HardDeleteOneUserByIdService,
} from '@modules/user/services';
import { PostPrismaRepository } from '@modules/post/repositories';

@Module({
  controllers: [
    CreateOneUserController,
    GetManyUserController,
    GetOneUserByIdController,
    UpdateOneUserByIdController,
    SoftDeleteOneUserByIdController,
    HardDeleteOneUserByIdController,
  ],
  providers: [
    CreateOneUserService,
    GetManyUserService,
    GetOneUserByIdService,
    UpdateOneUserByIdService,
    SoftDeleteOneUserByIdService,
    HardDeleteOneUserByIdService,
    UserPrismaRepository,
    PostPrismaRepository,
    PrismaService,
    AppCrypto,
  ],
  exports: [UserPrismaRepository, PostPrismaRepository],
})
export class UserModule {}
