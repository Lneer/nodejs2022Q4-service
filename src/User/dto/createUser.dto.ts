import { OmitType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

export class CreateUserDTO extends OmitType(UserDto, [
  'id',
  'version',
  'updatedAt',
  'createdAt',
] as const) {}
