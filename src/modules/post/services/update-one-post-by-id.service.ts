import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostPrismaRepository } from '@modules/post/repositories';
import { StaticErrors } from '@static';
import { UpdateOnePostInputDto } from '@modules/post/dtos/input';
import { UpdateOnePostOutputDto } from '@modules/post/dtos/output';
import { UserBaseOutputDto } from '@modules/user/dtos/output/user-base-output.dto';
import { Role } from '@modules/user/constants';

@Injectable()
export class UpdateOnePostByIdService {
  constructor(private readonly postPrismaRepository: PostPrismaRepository) {}

  public async execute(
    id: string,
    updateOnePostInputDto: UpdateOnePostInputDto,
    sessionUser: UserBaseOutputDto,
  ): Promise<UpdateOnePostOutputDto> {
    const postExists = await this.postPrismaRepository.getOneUnique({
      id,
    });

    if (!postExists) {
      throw new NotFoundException(
        StaticErrors.THE_POST_YOU_ARE_TRYING_TO_UPDATE_RELATED_TO_THE_GIVEN_ID_DOES_NOT_EXIST,
      );
    }

    if (sessionUser.role !== Role.Admin && postExists.softDeletedAt) {
      throw new BadRequestException(
        StaticErrors.THE_POST_YOU_ARE_TRYING_TO_UPDATE_IS_SOFT_DELETED,
      );
    }

    const { tags, ...updatePostData } = updateOnePostInputDto;

    const updatedPostModel = {
      originalPost: updatePostData,
      updatedAt: new Date(),
      updatedBy: sessionUser.id,
    };

    return await this.postPrismaRepository.updateOneById(id, updatedPostModel);
  }
}
