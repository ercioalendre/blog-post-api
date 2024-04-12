import { PostPrismaRepository } from '@modules/post/repositories/post.prisma.repository';
import { GetManyPostService } from '@modules/post/services/get-many-post.service';
import { Role } from '@modules/user/constants';
import { generateFakePost } from '@tests/mocks/generateFakePost';
import { generateFakeUser } from '@tests/mocks/generateFakeUser';
import { AppCrypto } from '@utilities/app-crypto';

describe('GetManyPostService test suite', () => {
  let service: GetManyPostService;

  beforeAll(async () => {
    service = global.testingModule.get(
      GetManyPostService,
    ) as GetManyPostService;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should get many post', async () => {
    const postPrismaRepository = global.testingModule.get(
      PostPrismaRepository,
    ) as PostPrismaRepository;

    const firstPostToGet = generateFakePost();

    const secondPostToGet = generateFakePost();

    const postToGetList = [firstPostToGet, secondPostToGet];

    const getManyResponse = {
      data: postToGetList,
      currentPage: 1,
      perPage: 1,
      lastPage: Math.ceil(2 / 1) || 1,
      totalRecords: 2,
    };

    const appCrypto = global.testingModule.get(AppCrypto) as AppCrypto;

    jest
      .spyOn(postPrismaRepository, 'getMany')
      .mockResolvedValue(getManyResponse);

    jest.spyOn(appCrypto, 'decryptData').mockReturnValueOnce(firstPostToGet);

    jest.spyOn(appCrypto, 'decryptData').mockReturnValueOnce(secondPostToGet);

    const sessionUser = generateFakeUser({ role: Role.Admin });

    const result = await service.execute(sessionUser);

    expect(postPrismaRepository.getMany).toHaveBeenCalled();

    expect(result).toEqual(getManyResponse);
  });
});
