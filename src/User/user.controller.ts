import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Put,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { HttpCode, UsePipes } from '@nestjs/common/decorators';
import { ErrorsCode } from 'src/utils/common types/enum';
import { CreateUserDTO } from './dto/createUser.dto';
import { ChangeUserDTO } from './dto/changeUser.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const item = this.userService.findOne(id);
    if (!item) {
      throw new HttpException('User not Found', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  @Post()
  @UsePipes()
  async create(@Body() createUserDto: CreateUserDTO) {
    const createdUser = this.userService.create(createUserDto);
    return createdUser;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const item = this.userService.delete(id);
    if (!item) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  @Put(':id')
  async change(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() changeUserDto: ChangeUserDTO,
  ) {
    try {
      const changedUser = this.userService.change(id, changeUserDto);
      return changedUser;
    } catch (error) {
      if (error.message === ErrorsCode[404]) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      } else if (error.message === ErrorsCode[403]) {
        throw new HttpException('incorrect password', HttpStatus.FORBIDDEN);
      } else return error.message;
    }
  }
}
