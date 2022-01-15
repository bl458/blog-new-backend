import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class EditPostDTO {
  @IsNotEmpty()
  readonly id: string;

  @ValidateIf(
    (dto) => dto['titleSub'] === undefined && dto['content'] === undefined,
  )
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ValidateIf(
    (dto) => dto['title'] === undefined && dto['content'] === undefined,
  )
  @IsNotEmpty()
  @IsString()
  readonly titleSub: string;

  @ValidateIf(
    (dto) => dto['title'] === undefined && dto['titleSub'] === undefined,
  )
  @IsNotEmpty()
  @IsString()
  readonly content: string;
}
