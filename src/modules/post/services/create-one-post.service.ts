import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PostPrismaRepository } from '@modules/post/repositories';
import {
  CreateOnePostInputDto,
  CreateOnePostModelInputDto,
} from '@modules/post/dtos/input';
import { CreateOnePostOutputDto } from '@modules/post/dtos/output';
import { UserBaseOutputDto } from '@modules/user/dtos/output/user-base-output.dto';
import { parsePost } from '@modules/post/utilities';

@Injectable()
export class CreateOnePostService {
  constructor(private readonly postPrismaRepository: PostPrismaRepository) {}

  public async execute(
    createOnePostInputDto: CreateOnePostInputDto,
    sessionUser: UserBaseOutputDto,
  ): Promise<CreateOnePostOutputDto> {
    const createdAt = new Date();

    const createdBy = sessionUser?.id;

    const parsedTagList = this.parseTagList(
      createOnePostInputDto.tags,
      createdAt,
      createdBy,
    );

    const newPostModel: CreateOnePostModelInputDto = {
      id: randomUUID(),
      title: createOnePostInputDto.title,
      body: createOnePostInputDto.body,
      parsedTagList,
      createdAt,
      createdBy,
    };

    const createdPost = await this.postPrismaRepository.createOne(newPostModel);

    return parsePost(createdPost);
  }

  private parseTagList(
    tagNameList: string[],
    createdAt: Date,
    createdBy: string,
  ) {
    const parsedTags = [];

    for (const tagName of tagNameList) {
      parsedTags.push({
        id: randomUUID(),
        name: tagName,
        createdAt,
        createdBy,
      });
    }

    return parsedTags;
  }
}
