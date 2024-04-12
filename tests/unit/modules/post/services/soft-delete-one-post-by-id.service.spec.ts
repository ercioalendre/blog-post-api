import { PostPrismaRepository } from '@modules/post/repositories/post.prisma.repository';
import { SoftDeleteOnePostByIdService } from '@modules/post/services/soft-delete-one-post-by-id.service';
import { Role } from '@modules/user/constants';
import { generateFakePostWithTags } from '@tests/mocks/generateFakePost';
import { generateFakeUser } from '@tests/mocks/generateFakeUser';
import { AppCrypto } from '@utilities/app-crypto';

describe('SoftDeleteOnePostByIdService test suite', () => {
  let service: SoftDeleteOnePostByIdService;

  beforeAll(async () => {
    service = global.testingModule.get(
      SoftDeleteOnePostByIdService,
    ) as SoftDeleteOnePostByIdService;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should soft delete one post by id', async () => {
    const postPrismaRepository = global.testingModule.get(
      PostPrismaRepository,
    ) as PostPrismaRepository;

    const appCrypto = global.testingModule.get(AppCrypto) as AppCrypto;

    const postToDelete = generateFakePostWithTags();

    jest
      .spyOn(postPrismaRepository, 'getOneUnique')
      .mockResolvedValue(postToDelete);

    jest
      .spyOn(postPrismaRepository, 'softDeleteOneById')
      .mockResolvedValue(postToDelete);

    jest.spyOn(appCrypto, 'decryptData').mockReturnValue(postToDelete);

    const sessionUser = generateFakeUser({ role: Role.Admin });

    const result = await service.execute(postToDelete.id, sessionUser);

    expect(postPrismaRepository.softDeleteOneById).toHaveBeenCalled();

    expect(result).toEqual(postToDelete);
  });
});
