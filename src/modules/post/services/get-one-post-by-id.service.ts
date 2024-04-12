import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostPrismaRepository } from '@modules/post/repositories';
import { GetOnePostOutputDto } from '@modules/post/dtos/output';
import { StaticErrors } from '@static';
import { UserBaseOutputDto } from '@modules/user/dtos/output/user-base-output.dto';
import { Role } from '@modules/user/constants';
import { parsePost } from '@modules/post/utilities';

@Injectable()
export class GetOnePostByIdService {
  constructor(private readonly postPrismaRepository: PostPrismaRepository) {}

  public async execute(
    id: string,
    sessionUser: UserBaseOutputDto,
  ): Promise<GetOnePostOutputDto> {
    const createdBy =
      sessionUser.role !== Role.Admin ? sessionUser.id : undefined;

    const post = await this.postPrismaRepository.getOne({
      id,
      createdBy,
    });

    if (!post) {
      throw new NotFoundException(
        StaticErrors.THE_POST_YOU_ARE_LOOKING_FOR_RELATED_TO_THE_GIVEN_ID_DOES_NOT_EXIST,
      );
    }

    if (sessionUser.role !== Role.Admin && post.softDeletedAt) {
      throw new BadRequestException(
        StaticErrors.THE_POST_YOU_ARE_LOOKING_FOR_RELATED_TO_THE_GIVEN_ID_IS_SOFT_DELETED,
      );
    }

    return parsePost(post);
  }
}
