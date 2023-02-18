import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ErrorsCode } from 'src/utils/common types/enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDTO } from './dto/createUser.dto';
import { ChangeUserDTO } from './dto/changeUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(userDto: CreateUserDTO) {
    const timeStamp = Date.now();

    const created = {
      ...userDto,
      version: 1,
      createdAt: timeStamp,
      updatedAt: timeStamp,
    };
    const createdEntity = this.userRepository.create(created);
    return (await this.userRepository.save(createdEntity)).toResponse();
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponse());
  }

  async findOne(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(ErrorsCode[404]);
    return user.toResponse();
  }

  async change(userId: string, chandeDTO: ChangeUserDTO) {
    const userForUpdate = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!userForUpdate) {
      throw new NotFoundException(ErrorsCode[404]);
    }

    if (chandeDTO.oldPassword !== userForUpdate.password) {
      throw new ForbiddenException(ErrorsCode[403]);
    }
    const version = userForUpdate.version + 1;
    const updatedAt = Date.now();
    const createdAt = Number(userForUpdate.createdAt);
    const changed = {
      ...userForUpdate,
      version,
      createdAt,
      updatedAt,
      password: chandeDTO.newPassword,
    };
    const createdEntity = this.userRepository.create(changed);
    const changedUser = await this.userRepository.save(createdEntity);
    return changedUser.toResponse();
  }

  async delete(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(ErrorsCode[404]);
    await this.userRepository.delete(userId);
  }
}
