import { Exclude } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';

export class EditBlogPostDTO {
  @Exclude({ toPlainOnly: true })
  get tagsSet(): Set<string> {
    return new Set(this.tags);
  }

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

  //TBI Transform to set
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
  @Exclude({ toPlainOnly: true })
  private tags: string[];
}
