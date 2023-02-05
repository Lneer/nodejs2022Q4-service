import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'uuid';

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (validate(value)) {
      return value;
    }
    throw new BadRequestException('Value must be UUId v4 format.');
  }
}
