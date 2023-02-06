import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { DBEntity } from '../utils/DB/DBEntyty';
import { OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID, IsString, IsInt } from 'class-validator';
import { ErrorsCode } from 'src/utils/common types/enum';

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

export class CreateUserDTO extends OmitType(UserEntity, [
  'id',
  'version',
  'updatedAt',
  'createdAt',
] as const) {}

export class ChangeUserDTO {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

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
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.entities.push(created);
    return created;
  }

  change(id: string, chandeDTO: ChangeUserDTO): UserEntity {
    const idx = this.entities.findIndex((entity) => entity.id === id);
    if (idx < 0) {
      throw new Error(ErrorsCode[404]);
    }
    if (chandeDTO.oldPassword !== this.entities[idx].password) {
      throw new Error(ErrorsCode[403]);
    }
    const version = this.entities[idx].version++;
    const updatedAt = Date.now();
    const changedEntity = {
      ...this.entities[idx],
      version,
      updatedAt,
      password: chandeDTO.newPassword,
    };
    this.entities[idx] = changedEntity;
    return changedEntity;
  }
}
