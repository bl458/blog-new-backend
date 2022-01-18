import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class IntegerPipe implements PipeTransform {
  private min: number;
  private max: number;

  constructor(minMax: any) {
    const { min, max } = minMax;
    this.min = min != null ? min : Number.MIN_SAFE_INTEGER;
    this.max = max != null ? max : Number.MAX_SAFE_INTEGER;
  }

  transform(val: any, { metatype, data }: ArgumentMetadata): number {
    if (val == null) {
      throw new BadRequestException(`${data} must be defined & not null`);
    }

    if (metatype !== Number) {
      throw new BadRequestException(`${data} has wrong type. Got ${metatype}`);
    }

    if (typeof val !== 'number') {
      throw new BadRequestException(
        `${data} must be a number. Got ${typeof val}`,
      );
    }

    if (val < this.min || val > this.max) {
      throw new BadRequestException(
        `${data} is not between ${this.min} and ${this.max}`,
      );
    }

    return val;
  }
}
