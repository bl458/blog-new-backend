import { Exclude } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogPostDTO {
  @Exclude({ toPlainOnly: true })
  get tagsSet(): Set<string> {
    return new Set(this.tags);
  }

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly titleSub: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;

  //TBI Transform to set
  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  @Exclude({ toPlainOnly: true })
  private tags: string[];
}
