import { TagBaseInputDto } from '@modules/tag/dtos/input';

export abstract class CreateOneTagModelInputDto extends TagBaseInputDto {
  public id: string;
  public createdAt: Date;
  public createdBy: string;
}
