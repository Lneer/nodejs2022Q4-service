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
import { UserService, ChangeUserDTO, CreateUserDTO } from './user.service';
import { HttpCode, UsePipes } from '@nestjs/common/decorators';
import { ErrorsCode } from 'src/utils/common types/enum';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const item = this.userService.findOne({ key: 'id', equal: id });
    if (!item) {
      throw new HttpException('User not Found', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  @Post()
  @UsePipes()
  async create(@Body() createUserDto: CreateUserDTO) {
    return this.userService.create(createUserDto);
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
      return this.userService.change(id, changeUserDto);
    } catch (error) {
      if (error.message === ErrorsCode[404]) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      if (error.message === ErrorsCode[403]) {
        throw new HttpException('incorrect password', HttpStatus.FORBIDDEN);
      }
    }
  }
}
