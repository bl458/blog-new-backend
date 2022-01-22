import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';

export class EditPostDTO {
  @IsNotEmpty()
  readonly id: string;

  @ValidateIf(
    (dto) =>
      dto.title !== undefined ||
      (dto.titleSub === undefined &&
        dto.content === undefined &&
        dto.tags === undefined),
  )
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ValidateIf(
    (dto) =>
      dto.titleSub !== undefined ||
      (dto.title === undefined &&
        dto.content === undefined &&
        dto.tags === undefined),
  )
  @IsNotEmpty()
  @IsString()
  readonly titleSub: string;

  @ValidateIf(
    (dto) =>
      dto.content !== undefined ||
      (dto.title === undefined &&
        dto.titleSub === undefined &&
        dto.tags === undefined),
  )
  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @ValidateIf(
    (dto) =>
      dto.tags !== undefined ||
      (dto.title === undefined &&
        dto.titleSub === undefined &&
        dto.content === undefined),
  )
  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  readonly tags: string[];
}
