import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

import validator from 'validator';

@Injectable()
export class EmailPipe implements PipeTransform {
  transform(val: any, { metatype, data }: ArgumentMetadata) {
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
  }
}
