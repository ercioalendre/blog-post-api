import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export abstract class PostBaseInputDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Post title.',
    example: 'Welcome to my blog post!',
  })
  public title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Post body.',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  })
  public body: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  @ApiProperty({
    description: 'Post tags.',
    example: ['first tag', 'second tag', 'third tag'],
  })
  public tags: string[];
}
