import { Controller, Get, Param, Req } from '@nestjs/common';
import { GetOnePostOutputDto } from '@modules/post/dtos/output';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppController } from '@src';
import { Role } from '@modules/user/constants';
import { Roles } from '@decorators';
import { GetOnePostByIdService } from '@modules/post/services';

@Controller('post')
@Roles(Role.Admin, Role.User)
@ApiTags('Post')
export class GetOnePostByIdController extends AppController {
  constructor(private readonly getOnePostByIdService: GetOnePostByIdService) {
    super();
  }

  @Get('get-one/:id')
  @ApiOperation({
    summary: 'Gets one single post by ID.',
  })
  public async handler(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<GetOnePostOutputDto | null> {
    return await this.getOnePostByIdService.execute(id, request['sessionUser']);
  }
}
