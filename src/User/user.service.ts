import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { DBEntity } from '../utils/DB/DBEntyty';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID, IsString, IsInt } from 'class-validator';

export class UserEntity {
  @IsUUID('4')
  id: string;

  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsInt()
  version: number;

  createdAt: number;
  updatedAt: number;
}

export class CreateUserDTO extends OmitType(UserEntity, ['id'] as const) {}
export class ChangeUserDTO extends PartialType(
  OmitType(UserEntity, ['id'] as const),
) {}

@Injectable()
export class UserService extends DBEntity<
  UserEntity,
  ChangeUserDTO,
  CreateUserDTO
> {
  create(userDto: CreateUserDTO) {
    const created: UserEntity = {
      ...userDto,
      id: uuid(),
    };
    this.entities.push(created);
    return created;
  }
}
