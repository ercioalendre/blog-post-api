import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { randomUUID } from 'node:crypto';

export abstract class TagBaseInputDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Tag name.',
    example: 'tag',
  })
  public name: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID of the Post to relate the tag.',
    example: randomUUID(),
  })
  public postId: string;
}
