import { DatabaseModule } from '@modules/database';
import { UserPrismaRepository } from '@modules/user/repositories';
import {
  CreateOneUserService,
  SoftDeleteOneUserByIdService,
  HardDeleteOneUserByIdService,
  GetManyUserService,
  GetOneUserByIdService,
  UpdateOneUserByIdService,
} from '@modules/user/services';
import {
  CreateOnePostService,
  GetManyPostService,
  GetOnePostByIdService,
  HardDeleteOnePostByIdService,
  SoftDeleteOnePostByIdService,
  UpdateOnePostByIdService,
} from '@modules/post/services';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppCrypto } from '@utilities';
import { PostPrismaRepository } from '@modules/post/repositories/post.prisma.repository';

beforeAll(async () => {
  const testingModule: TestingModule = await Test.createTestingModule({
    imports: [DatabaseModule, ConfigModule.forRoot()],
    providers: [
      CreateOneUserService,
      SoftDeleteOneUserByIdService,
      HardDeleteOneUserByIdService,
      GetOneUserByIdService,
      GetManyUserService,
      UpdateOneUserByIdService,
      CreateOnePostService,
      SoftDeleteOnePostByIdService,
      HardDeleteOnePostByIdService,
      GetOnePostByIdService,
      GetManyPostService,
      UpdateOnePostByIdService,
      UserPrismaRepository,
      PostPrismaRepository,
      AppCrypto,
    ],
  }).compile();

  global.testingModule = testingModule;
});
