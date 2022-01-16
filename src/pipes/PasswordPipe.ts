import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

//TBI make stricter pw requirement
@Injectable()
export class PasswordPipe implements PipeTransform {
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

    if (val.length < 8) {
      throw new BadRequestException(`${data} must be a valid password.`);
    }

    return val;
  }
}
