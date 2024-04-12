import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppController } from '@src';
import { Role } from '@modules/user/constants';
import { Roles } from '@decorators';
import { GetManyPostInputDto } from '@modules/post/dtos/input';
import { GetManyPostService } from '@modules/post/services';
import { Response, Request } from 'express';
import { PostBaseOutputDto } from '@modules/post/dtos/output';

@Controller('post')
@Roles(Role.Admin, Role.User)
@ApiTags('Post')
export class GetManyPostController extends AppController {
  constructor(private readonly getManyPostService: GetManyPostService) {
    super();
  }

  @Get('get-many')
  @ApiOperation({
    summary: 'Gets many posts.',
  })
  public async handler(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Query() searchParams?: GetManyPostInputDto | null,
  ): Promise<PostBaseOutputDto[]> {
    const postListWithPaginationMetadata =
      await this.getManyPostService.execute(
        request['sessionUser'],
        searchParams,
      );

    const { data, ...metadata } = postListWithPaginationMetadata;

    response.header('currentPage', String(metadata.currentPage));

    response.header('lastPage', String(metadata.lastPage));

    response.header('perPage', String(metadata.perPage));

    response.header('totalRecords', String(metadata.totalRecords));

    return data;
  }
}
