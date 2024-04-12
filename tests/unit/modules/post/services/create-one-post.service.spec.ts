import { PostPrismaRepository } from '@modules/post/repositories/post.prisma.repository';
import { CreateOnePostService } from '@modules/post/services/create-one-post.service';
import { generateFakePostWithTags } from '@tests/mocks/generateFakePost';
import { Role } from '@modules/user/constants';
import { generateFakeUser } from '@tests/mocks/generateFakeUser';
import { parsePost } from '@modules/post/utilities';

describe('CreateOnePostService test suite', () => {
  let service: CreateOnePostService;

  beforeAll(async () => {
    service = global.testingModule.get(
      CreateOnePostService,
    ) as CreateOnePostService;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should create one post', async () => {
    const {
      id,
      title,
      body,
      tags,
      tagRelatedToPostIdInTag,
      createdAt,
      createdBy,
    } = generateFakePostWithTags();

    const createOnePostModelInputDto = {
      id,
      tagRelatedToPostIdInTag,
      title,
      body,
      createdAt,
      createdBy,
    };

    const createOnePostInputDto = {
      title,
      body,
      tags,
    };

    const postPrismaRepository = global.testingModule.get(
      PostPrismaRepository,
    ) as PostPrismaRepository;

    jest.spyOn(postPrismaRepository, 'getOne').mockResolvedValue(null);

    jest
      .spyOn(postPrismaRepository, 'createOne')
      .mockResolvedValue(createOnePostModelInputDto);

    const sessionUser = generateFakeUser({ role: Role.Admin });

    const result = await service.execute(createOnePostInputDto, sessionUser);

    expect(postPrismaRepository.createOne).toHaveBeenCalled();

    expect(result).toEqual(parsePost(createOnePostModelInputDto));
  });
});
