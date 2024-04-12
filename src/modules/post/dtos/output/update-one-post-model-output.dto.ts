import { PostModelBaseOutputDto } from '@modules/post/dtos/output';

export abstract class UpdateOnePostModelOutputDto extends PostModelBaseOutputDto {
  public readonly token?: string | null;

  public readonly updatedAt: Date;

  public readonly updatedBy?: string | null;
}
