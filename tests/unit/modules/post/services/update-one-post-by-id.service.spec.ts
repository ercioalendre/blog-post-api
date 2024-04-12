import { PostPrismaRepository } from '@modules/post/repositories/post.prisma.repository';
import { UpdateOnePostByIdService } from '@modules/post/services/update-one-post-by-id.service';
import { generateFakePostWithTags } from '@tests/mocks/generateFakePost';
import { generateFakeUser } from '@tests/mocks/generateFakeUser';
import { Role } from '@modules/user/constants';

describe('UpdateOnePostByIdService test suite', () => {
  let service: UpdateOnePostByIdService;

  beforeAll(async () => {
    service = global.testingModule.get(
      UpdateOnePostByIdService,
    ) as UpdateOnePostByIdService;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should update one post by id', async () => {
    const postToUpdate = generateFakePostWithTags();

    const updateOnePostByIdInputDto = {
      title: 'My updated blog post title',
    };

    const updateOnePostByIdOutputDto = {
      ...postToUpdate,
      updatedAt: new Date(),
    };

    const postPrismaRepository = global.testingModule.get(
      PostPrismaRepository,
    ) as PostPrismaRepository;

    jest
      .spyOn(postPrismaRepository, 'getOneUnique')
      .mockResolvedValue(postToUpdate);

    jest
      .spyOn(postPrismaRepository, 'updateOneById')
      .mockResolvedValue(updateOnePostByIdOutputDto);

    const sessionUser = generateFakeUser({ role: Role.Admin });

    const result = await service.execute(
      postToUpdate.id,
      updateOnePostByIdInputDto,
      sessionUser,
    );

    expect(postPrismaRepository.updateOneById).toHaveBeenCalled();

    expect(result).toEqual(updateOnePostByIdOutputDto);
  });
});
