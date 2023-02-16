import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { ErrorsCode } from 'src/utils/common types/enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserDto } from './dto/user.dto';
import { ChangeUserDTO } from './dto/changeUser.dto';
// export class UserEntity {
//   @IsUUID('4')
//   id: string;

//   @IsString()
//   @IsNotEmpty()
//   login: string;

//   @IsString()
//   @IsNotEmpty()
//   password: string;

//   @IsInt()
//   version: number;

//   createdAt: number;
//   updatedAt: number;
// }

// export class CreateUserDTO extends OmitType(UserEntity, [
//   'id',
//   'version',
//   'updatedAt',
//   'createdAt',
// ] as const) {}

// export class ChangeUserDTO {
//   @IsString()
//   @IsNotEmpty()
//   oldPassword: string;
//   @IsString()
//   @IsNotEmpty()
//   newPassword: string;
// }

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(userDto: CreateUserDTO) {
    const time = Date.now();

    const created: UserDto = {
      ...userDto,
      id: uuid(),
      version: 1,
      createdAt: time,
      updatedAt: time,
    };
    const createdUser = this.userRepository.create(created);
    return (await this.userRepository.save(createdUser)).toResponse();
  }

  async findAll() {
    const users = await this.userRepository.find();

    return users.map((user) => user.toResponse());
  }

  async findOne(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (user) return user.toResponse();
    throw new Error(ErrorsCode[404]);
  }

  async change(userId: string, chandeDTO: ChangeUserDTO) {
    const userForUpdate = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!userForUpdate) {
      throw new Error(ErrorsCode[404]);
    }

    if (chandeDTO.oldPassword !== userForUpdate.password) {
      throw new Error(ErrorsCode[403]);
    }
    const version = userForUpdate.version + 1;
    const updatedAt = Date.now();
    const changedEntity = {
      ...userForUpdate,
      version,
      updatedAt,
      password: chandeDTO.newPassword,
    };

    const changedUser = await this.userRepository.save(changedEntity);
    return changedUser;
  }

  async delete(userId: string) {
    const deletedUser = await this.userRepository.delete(userId);

    if (deletedUser.affected === 0) {
      throw new Error(ErrorsCode[404]);
    }
  }
}
