import { Injectable } from '@nestjs/common';
import { PostPrismaRepository } from '@modules/post/repositories';
import {
  GetManyPostOutputDto,
  PostBaseOutputDto,
} from '@modules/post/dtos/output';
import { SearchParams } from '@src/types';
import { UserBaseOutputDto } from '@modules/user/dtos/output/user-base-output.dto';
import { Role } from '@modules/user/constants';

@Injectable()
export class GetManyPostService {
  constructor(private readonly postPrismaRepository: PostPrismaRepository) {}

  public async execute(
    sessionUser: UserBaseOutputDto,
    searchParams?: SearchParams | null,
  ): Promise<GetManyPostOutputDto> {
    const createdBy =
      sessionUser.role !== Role.Admin ? sessionUser.id : undefined;

    const postList = await this.postPrismaRepository.getMany(
      searchParams,
      createdBy,
    );

    const parsedPostList: PostBaseOutputDto[] = [];

    for (const post of postList.data) {
      if (sessionUser.role !== Role.Admin && post.softDeletedAt) {
        continue;
      }

      parsedPostList.push(post);
    }

    return {
      ...postList,
      data: parsedPostList,
    };
  }
}
