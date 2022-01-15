import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class EditPostDTO {
  @IsNotEmpty()
  readonly id: string;

  @ValidateIf((dto) => dto.title || (!dto.titleSub && !dto.content))
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ValidateIf((dto) => dto.titleSub || (!dto.title && !dto.content))
  @IsNotEmpty()
  @IsString()
  readonly titleSub: string;

  @ValidateIf((dto) => dto.content || (!dto.title && !dto.titleSub))
  @IsNotEmpty()
  @IsString()
  readonly content: string;
}
