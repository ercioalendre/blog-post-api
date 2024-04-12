import { Role } from '@modules/user/constants';
import { UserPrismaRepository } from '@modules/user/repositories/user.prisma.repository';
import { SoftDeleteOneUserByIdService } from '@modules/user/services/soft-delete-one-user-by-id.service';
import { generateFakeUser } from '@tests/mocks/generateFakeUser';
import { AppCrypto } from '@utilities/app-crypto';

describe('SoftDeleteOneUserByIdService test suite', () => {
  let service: SoftDeleteOneUserByIdService;

  beforeAll(async () => {
    service = global.testingModule.get(
      SoftDeleteOneUserByIdService,
    ) as SoftDeleteOneUserByIdService;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should soft delete one user by id', async () => {
    const userPrismaRepository = global.testingModule.get(
      UserPrismaRepository,
    ) as UserPrismaRepository;

    const appCrypto = global.testingModule.get(AppCrypto) as AppCrypto;

    const userToDelete = generateFakeUser();

    jest
      .spyOn(userPrismaRepository, 'getOneUnique')
      .mockResolvedValue(userToDelete);

    jest
      .spyOn(userPrismaRepository, 'softDeleteOneById')
      .mockResolvedValue(userToDelete);

    jest.spyOn(appCrypto, 'decryptData').mockReturnValue(userToDelete);

    const sessionUser = generateFakeUser({ role: Role.Admin });

    const result = await service.execute(userToDelete.id, sessionUser);

    expect(userPrismaRepository.softDeleteOneById).toHaveBeenCalled();

    expect(result).toEqual(userToDelete);
  });
});
