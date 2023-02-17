import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UserEntity } from '../entities/user.entity';

export class UserDto extends UserEntity {
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
  @IsInt()
  createdAt: number;
  @IsInt()
  updatedAt: number;
}
