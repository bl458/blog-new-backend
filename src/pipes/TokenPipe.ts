import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

import validator from 'validator';

@Injectable()
export class TokenPipe implements PipeTransform {
  transform(val: any, { metatype, data }: ArgumentMetadata): string {
    if (val === undefined) {
      throw new BadRequestException(`${data} must be defined`);
    }

    if (metatype !== String) {
      throw new BadRequestException(`${data} has wrong type. Got ${metatype}`);
    }

    if (typeof val !== 'string') {
      throw new BadRequestException(
        `${data} must be a string. Got ${typeof val}`,
      );
    }

    if (!validator.isAlphanumeric(val)) {
      throw new BadRequestException(`${data} must be alphanumeric`);
    }

    if (val.length !== 256) {
      throw new BadRequestException(
        `${data} must be 256 length. Got ${val.length}`,
      );
    }

    return val;
  }
}
