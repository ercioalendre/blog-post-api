import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostPrismaRepository } from '@modules/post/repositories';
import { StaticErrors } from '@static';
import { DeleteOnePostOutputDto } from '@modules/post/dtos/output';
import { UserBaseOutputDto } from '@modules/user/dtos/output/user-base-output.dto';

@Injectable()
export class SoftDeleteOnePostByIdService {
  constructor(private readonly postPrismaRepository: PostPrismaRepository) {}

  public async execute(
    id: string,
    sessionUser: UserBaseOutputDto,
  ): Promise<DeleteOnePostOutputDto> {
    const postExists = await this.postPrismaRepository.getOneUnique({ id });

    if (!postExists) {
      throw new NotFoundException(
        StaticErrors.THE_POST_YOU_ARE_TRYING_TO_DELETE_RELATED_TO_THE_GIVEN_ID_DOES_NOT_EXIST,
      );
    }

    if (postExists.softDeletedAt) {
      throw new BadRequestException(
        StaticErrors.THE_POST_YOU_ARE_TRYING_TO_SOFT_DELETE_IS_ALREADY_SOFT_DELETED,
      );
    }

    return await this.postPrismaRepository.softDeleteOneById(
      id,
      sessionUser.id,
    );
  }
}
