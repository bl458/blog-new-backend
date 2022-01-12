import { IsOptional, IsString } from 'class-validator';

export class PostDTO {
  @IsOptional()
  @IsString()
  readonly id: string;

  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly titleSub: string;

  @IsOptional()
  @IsString()
  readonly content: string;
}
