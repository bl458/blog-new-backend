import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogPostDTO {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly titleSub: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  readonly tags: string[];
}
