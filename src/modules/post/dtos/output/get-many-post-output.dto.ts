import { PostBaseOutputDto } from '@modules/post/dtos/output';

export class GetManyPostOutputDto {
  public readonly data: PostBaseOutputDto[];
  public readonly currentPage: number;
  public readonly perPage: number;
  public readonly lastPage: number;
  public readonly totalRecords: number;
}
