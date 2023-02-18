import { OmitType } from '@nestjs/mapped-types';
import { UserEntity } from '../entities/user.entity';

export class CreateUserDTO extends OmitType(UserEntity, [
  'id',
  'version',
  'updatedAt',
  'createdAt',
] as const) {}
