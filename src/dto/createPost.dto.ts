import { IsDefined, IsString } from 'class-validator';

export class CreatePostDTO {
  @IsDefined()
  @IsString()
  readonly title: string;

  @IsDefined()
  @IsString()
  readonly titleSub: string;

  @IsDefined()
  @IsString()
  readonly content: string;
}
