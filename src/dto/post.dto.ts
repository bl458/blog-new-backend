import { IsOptional, IsString } from 'class-validator';

export class PostDTO {
  @IsOptional()
  @IsString()
  readonly id: string;
  readonly title: string;
  readonly titleSub: string;
  readonly content: string;
}
