import { Controller, Body, Patch, Param, Req } from '@nestjs/common';
import { UpdateOnePostInputDto } from '@modules/post/dtos/input';
import { UpdateOnePostOutputDto } from '@modules/post/dtos/output';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppController } from '@src';
import { Request } from 'express';
import { Role } from '@modules/user/constants';
import { Roles } from '@decorators';
import { Throttle } from '@nestjs/throttler';
import { UpdateOnePostByIdService } from '@modules/post/services';

@Controller('post')
@Roles(Role.Admin, Role.User)
@ApiTags('Post')
export class UpdateOnePostByIdController extends AppController {
  constructor(
    private readonly updateOnePostByIdService: UpdateOnePostByIdService,
  ) {
    super();
  }

  @Patch('update-one/:id')
  @Throttle({ default: { ttl: 60000, limit: 10 } })
  @ApiOperation({
    summary: 'Updates one single post by ID.',
  })
  public async handler(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() body: UpdateOnePostInputDto,
  ): Promise<UpdateOnePostOutputDto> {
    return this.updateOnePostByIdService.execute(
      id,
      body,
      request['sessionUser'],
    );
  }
}
