import { PostModelBaseOutputDto } from '@modules/post/dtos/output';
import { TagBaseOutputDto } from '@modules/tag/dtos/output';

export abstract class CreateOnePostModelOutputDto extends PostModelBaseOutputDto {
  tagRelatedToPostIdInTag: Pick<TagBaseOutputDto, 'name'>[];
}
