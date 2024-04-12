import { Type } from '@nestjs/common';
import { PostModelBaseInputDto } from '@modules/post/dtos/input';
import { PartialType } from '@nestjs/mapped-types';

export abstract class UpdateOnePostModelInputDto extends PartialType(
  PostModelBaseInputDto as Type<PostModelBaseInputDto>,
) {
  public unhashedPassword?: string | null;

  public token?: string | null;

  public updatedAt: Date;

  public updatedBy?: string | null;
}
