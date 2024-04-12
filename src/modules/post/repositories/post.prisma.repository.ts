import { Injectable } from '@nestjs/common';
import { PrismaService } from '@modules/database/prisma/services';
import {
  CreateOnePostModelInputDto,
  UpdateOnePostModelInputDto,
} from '@modules/post/dtos/input';
import {
  DeleteOnePostOutputDto,
  CreateOnePostModelOutputDto,
  GetManyPostOutputDto,
  UpdateOnePostModelOutputDto,
  GetOnePostModelOutputDto,
} from '@modules/post/dtos/output';
import { Prisma } from '@prisma/client';
import { SearchParams } from '@src/types';
import { PostSortableFieldList } from '@modules/post/constants';

@Injectable()
export class PostPrismaRepository {
  private readonly selectMainData = {
    id: true,
    title: true,
    body: true,
  };

  private readonly selectDataStats = {
    createdAt: true,
    createdBy: true,
    updatedAt: true,
    updatedBy: true,
    softDeletedAt: true,
    softDeletedBy: true,
  };

  private readonly selectRelatedTagList = {
    tagRelatedToPostIdInTag: {
      select: {
        name: true,
      },
    },
  };

  constructor(private readonly prismaService: PrismaService) {}

  public async createOne(
    createPostModelDto: CreateOnePostModelInputDto,
  ): Promise<CreateOnePostModelOutputDto> {
    const { parsedTagList, tags, ...newPostData } = createPostModelDto;

    return await this.prismaService.post.create({
      data: {
        ...newPostData,
        tagRelatedToPostIdInTag: {
          createMany: {
            data: parsedTagList,
          },
        },
      },
      select: {
        ...this.selectMainData,
        ...this.selectRelatedTagList,
        ...this.selectDataStats,
      },
    });
  }

  public async getMany(
    searchParams: SearchParams | null = {},
    createdBy?: string | null,
  ): Promise<GetManyPostOutputDto> {
    const {
      page = 1,
      perPage = 10,
      filterBy = undefined,
      filterValue = undefined,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = searchParams;

    const skip = (page - 1) * perPage;

    const orderBy = {};

    const isSortableField = PostSortableFieldList.find(
      (sortableField) => sortableField === sortBy,
    );

    const parsedSortBy = isSortableField || 'createdAt';

    orderBy[parsedSortBy] = sortOrder;

    const filters = {
      [filterBy]: filterValue,
      createdBy,
    };

    const postFoundCount = await this.prismaService.post.count({
      where: filters,
    });

    const postFoundList = await this.prismaService.post.findMany({
      where: filters,
      orderBy,
      skip,
      take: Number(perPage),
      select: {
        ...this.selectMainData,
        ...this.selectDataStats,
      },
    });

    return {
      data: postFoundList,
      currentPage: page,
      perPage,
      lastPage: Math.ceil(postFoundCount / perPage) || 1,
      totalRecords: postFoundCount,
    };
  }

  public async getOne(
    getOnePostInputDto: Prisma.PostWhereInput,
  ): Promise<GetOnePostModelOutputDto> {
    return this.prismaService.post.findFirst({
      where: getOnePostInputDto,
      select: {
        ...this.selectMainData,
        ...this.selectRelatedTagList,
        ...this.selectDataStats,
      },
    });
  }

  public async getOneUnique(
    getOnePostInputDto: Prisma.PostWhereUniqueInput,
  ): Promise<GetOnePostModelOutputDto> {
    return this.prismaService.post.findUnique({
      where: getOnePostInputDto,
      select: {
        ...this.selectMainData,
        ...this.selectRelatedTagList,
        ...this.selectDataStats,
      },
    });
  }

  public async updateOneById(
    id: string,
    updatePostModelDto: UpdateOnePostModelInputDto,
  ): Promise<UpdateOnePostModelOutputDto> {
    return await this.prismaService.post.update({
      where: {
        id,
      },
      data: updatePostModelDto,
      select: {
        ...this.selectMainData,
        ...this.selectDataStats,
      },
    });
  }

  public async softDeleteOneById(
    id: string,
    softDeletedBy: string,
  ): Promise<DeleteOnePostOutputDto> {
    return await this.prismaService.post.update({
      where: {
        id,
      },
      data: {
        softDeletedAt: new Date(),
        softDeletedBy,
      },
      select: {
        ...this.selectMainData,
        ...this.selectDataStats,
      },
    });
  }

  public async hardDeleteOneById(id: string): Promise<DeleteOnePostOutputDto> {
    return await this.prismaService.post.delete({
      where: {
        id,
      },
      select: {
        ...this.selectMainData,
        ...this.selectDataStats,
      },
    });
  }
}
