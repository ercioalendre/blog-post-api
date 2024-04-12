import { PostPrismaRepository } from '@modules/post/repositories/post.prisma.repository';
import { GetOnePostByIdService } from '@modules/post/services/get-one-post-by-id.service';
import { parsePost } from '@modules/post/utilities';
import { Role } from '@modules/user/constants';
import { generateFakePostWithTags } from '@tests/mocks/generateFakePost';
import { generateFakeUser } from '@tests/mocks/generateFakeUser';
import { AppCrypto } from '@utilities/app-crypto';

describe('GetOnePostByIdService test suite', () => {
  let service: GetOnePostByIdService;

  beforeAll(async () => {
    service = global.testingModule.get(
      GetOnePostByIdService,
    ) as GetOnePostByIdService;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should get one post by id', async () => {
    const postPrismaRepository = global.testingModule.get(
      PostPrismaRepository,
    ) as PostPrismaRepository;

    const postToGet = generateFakePostWithTags();

    const appCrypto = global.testingModule.get(AppCrypto) as AppCrypto;

    jest.spyOn(postPrismaRepository, 'getOne').mockResolvedValue(postToGet);

    jest.spyOn(appCrypto, 'decryptData').mockReturnValue(postToGet);

    const sessionUser = generateFakeUser({ role: Role.Admin });

    const result = await service.execute(postToGet.id, sessionUser);

    expect(postPrismaRepository.getOne).toHaveBeenCalled();

    expect(result).toEqual(parsePost(postToGet));
  });
});
