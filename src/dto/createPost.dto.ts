import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDTO {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly titleSub: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;
}
