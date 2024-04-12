import { PostModelBaseOutputDto } from '@modules/post/dtos/output';
import { TagBaseOutputDto } from '@modules/tag/dtos/output';

export class GetOnePostModelOutputDto extends PostModelBaseOutputDto {
  public tagRelatedToPostIdInTag: Pick<TagBaseOutputDto, 'name'>[];
}
