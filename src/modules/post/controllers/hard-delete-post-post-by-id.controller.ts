import { Controller, Param, Delete } from '@nestjs/common';
import { DeleteOnePostOutputDto } from '@modules/post/dtos/output';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppController } from '@src/app.controller';
import { Role } from '@modules/user/constants';
import { Roles } from '@decorators';
import { HardDeleteOnePostByIdService } from '@modules/post/services';

@Controller('post')
@Roles(Role.Admin, Role.User)
@ApiTags('Post')
export class HardDeleteOnePostByIdController extends AppController {
  constructor(
    private readonly hardDeleteOnePostByIdService: HardDeleteOnePostByIdService,
  ) {
    super();
  }

  @Delete('hard-delete-one/:id')
  @ApiOperation({
    summary: 'Hard deletes one single post by ID.',
  })
  public async handler(
    @Param('id') id: string,
  ): Promise<DeleteOnePostOutputDto> {
    return await this.hardDeleteOnePostByIdService.execute(id);
  }
}
