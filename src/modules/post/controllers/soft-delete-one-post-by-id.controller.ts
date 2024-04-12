import { Controller, Param, Delete, Req } from '@nestjs/common';
import { DeleteOnePostOutputDto } from '@modules/post/dtos/output';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppController } from '@src/app.controller';
import { Role } from '@modules/user/constants';
import { Roles } from '@decorators';
import { SoftDeleteOnePostByIdService } from '@modules/post/services';

@Controller('post')
@Roles(Role.Admin, Role.User)
@ApiTags('Post')
export class SoftDeleteOnePostByIdController extends AppController {
  constructor(
    private readonly softDeleteOnePostByIdService: SoftDeleteOnePostByIdService,
  ) {
    super();
  }

  @Delete('soft-delete-one/:id')
  @ApiOperation({
    summary: 'Soft deletes one single post by ID.',
  })
  public async handler(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<DeleteOnePostOutputDto> {
    return await this.softDeleteOnePostByIdService.execute(
      id,
      request['sessionUser'],
    );
  }
}
