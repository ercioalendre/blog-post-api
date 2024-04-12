import { PartialType } from '@nestjs/swagger';
import { Type } from '@nestjs/common';
import { PostBaseInputDto } from '@modules/post/dtos/input';

export class UpdateOnePostInputDto extends PartialType(
  PostBaseInputDto as Type<PostBaseInputDto>,
) {}
