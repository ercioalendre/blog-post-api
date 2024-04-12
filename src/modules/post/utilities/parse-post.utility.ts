import {
  CreateOnePostModelOutputDto,
  CreateOnePostOutputDto,
} from '@modules/post/dtos/output';
import { TagBaseOutputDto } from '@modules/tag/dtos/output';

export function parsePost(createdPost: CreateOnePostModelOutputDto) {
  const mappedCreatedPost = new Map();

  for (const [key, value] of Object.entries(createdPost)) {
    if (key === 'tagRelatedToPostIdInTag') {
      mappedCreatedPost.set(
        'tags',
        value.map((tag: Pick<TagBaseOutputDto, 'name'>) => tag.name),
      );
    } else {
      mappedCreatedPost.set(key, value);
    }
  }

  return Object.fromEntries(mappedCreatedPost) as CreateOnePostOutputDto;
}
