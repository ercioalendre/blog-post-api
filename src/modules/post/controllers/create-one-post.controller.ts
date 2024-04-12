import { Controller, Post, Body, Req } from '@nestjs/common';
import { CreateOnePostInputDto } from '@modules/post/dtos/input';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppController } from '@src';
import { Role } from '@modules/user/constants';
import { Roles } from '@decorators';
import { Throttle } from '@nestjs/throttler';
import { CreateOnePostService } from '@modules/post/services';

@Controller('post')
@Roles(Role.Admin, Role.User)
@ApiTags('Post')
export class CreateOnePostController extends AppController {
  constructor(private readonly createOnePostService: CreateOnePostService) {
    super();
  }

  @Post('create-one')
  @Throttle({ default: { ttl: 60000, limit: 10 } })
  @ApiOperation({
    summary: 'Creates one single post.',
  })
  public async handler(
    @Req() request: Request,
    @Body()
    createPostInputDto: CreateOnePostInputDto,
  ) {
    return await this.createOnePostService.execute(
      createPostInputDto,
      request['sessionUser'],
    );
  }
}
