import { PostModelBaseInputDto } from '@modules/post/dtos/input';
import { CreateOneTagModelInputDto } from '@modules/tag/dtos/input';

export abstract class CreateOnePostModelInputDto extends PostModelBaseInputDto {
  public parsedTagList: Omit<CreateOneTagModelInputDto, 'postId'>[];
  public createdBy: string;
}
