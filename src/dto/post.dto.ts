import { IsDefined, IsOptional, IsString, ValidateIf } from 'class-validator';

export class PostDTO {
  @IsOptional()
  @IsString()
  readonly id: string;

  @ValidateIf((dto) => !dto.id)
  @IsDefined()
  @IsString()
  readonly title: string;

  @ValidateIf((dto) => !dto.id)
  @IsDefined()
  @IsString()
  readonly titleSub: string;

  @ValidateIf((dto) => !dto.id)
  @IsDefined()
  @IsString()
  readonly content: string;
}
