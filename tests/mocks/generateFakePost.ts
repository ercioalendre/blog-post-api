import { PostBaseOutputDto } from '@modules/post/dtos/output';
import { randomUUID } from 'node:crypto';

interface ExtendedPostBaseOutputDto extends PostBaseOutputDto {
  tags: string[];
  tagRelatedToPostIdInTag: { name: string }[];
}

export function generateFakePost(
  post?: Partial<PostBaseOutputDto>,
): PostBaseOutputDto {
  return {
    id: randomUUID(),
    title: 'Welcome to my blog post!',
    body: 'This is my first blog post.',
    createdAt: new Date(),
    createdBy: randomUUID(),
    ...post,
  };
}

export function generateFakePostWithTags(
  post?: Partial<ExtendedPostBaseOutputDto>,
): ExtendedPostBaseOutputDto {
  return {
    id: randomUUID(),
    title: 'Welcome to my blog post!',
    body: 'This is my first blog post.',
    tags: ['first tag', 'second tag', 'third tag'],
    tagRelatedToPostIdInTag: [
      { name: 'first tag' },
      { name: 'second tag' },
      { name: 'third tag' },
    ],
    createdAt: new Date(),
    createdBy: randomUUID(),
    ...post,
  };
}
