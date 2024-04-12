import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostPrismaRepository } from '@modules/post/repositories';
import { StaticErrors } from '@static';
import { DeleteOnePostOutputDto } from '@modules/post/dtos/output';

@Injectable()
export class HardDeleteOnePostByIdService {
  constructor(private readonly postPrismaRepository: PostPrismaRepository) {}

  public async execute(id: string): Promise<DeleteOnePostOutputDto> {
    const postExists = await this.postPrismaRepository.getOneUnique({ id });

    if (!postExists) {
      throw new NotFoundException(
        StaticErrors.THE_POST_YOU_ARE_TRYING_TO_DELETE_RELATED_TO_THE_GIVEN_ID_DOES_NOT_EXIST,
      );
    }

    if (!postExists.softDeletedAt) {
      throw new BadRequestException(
        StaticErrors.THE_POST_YOU_ARE_TRYING_TO_HARD_DELETE_IS_NOT_SOFT_DELETED,
      );
    }

    return await this.postPrismaRepository.hardDeleteOneById(id);
  }
}
