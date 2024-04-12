import { PostPrismaRepository } from '@modules/post/repositories/post.prisma.repository';
import { HardDeleteOnePostByIdService } from '@modules/post/services/hard-delete-one-post-by-id.service';
import { generateFakePostWithTags } from '@tests/mocks/generateFakePost';
import { AppCrypto } from '@utilities/app-crypto';
import { randomUUID } from 'crypto';

describe('HardDeleteOnePostByIdService test suite', () => {
  let service: HardDeleteOnePostByIdService;

  beforeAll(async () => {
    service = global.testingModule.get(
      HardDeleteOnePostByIdService,
    ) as HardDeleteOnePostByIdService;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should hard delete one post by id', async () => {
    const postPrismaRepository = global.testingModule.get(
      PostPrismaRepository,
    ) as PostPrismaRepository;

    const appCrypto = global.testingModule.get(AppCrypto) as AppCrypto;

    const postToDelete = generateFakePostWithTags({
      softDeletedAt: new Date(),
      softDeletedBy: randomUUID(),
    });

    jest
      .spyOn(postPrismaRepository, 'getOneUnique')
      .mockResolvedValue(postToDelete);

    jest.spyOn(postPrismaRepository, 'getOne').mockResolvedValueOnce(null);

    jest.spyOn(postPrismaRepository, 'getOne').mockResolvedValueOnce(null);

    jest
      .spyOn(postPrismaRepository, 'hardDeleteOneById')
      .mockResolvedValue(postToDelete);

    jest.spyOn(appCrypto, 'decryptData').mockReturnValue(postToDelete);

    const result = await service.execute(postToDelete.id);

    expect(postPrismaRepository.hardDeleteOneById).toHaveBeenCalled();

    expect(result).toEqual(postToDelete);
  });
});
