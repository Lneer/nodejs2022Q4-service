import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService, ChangeUserDTO, CreateUserDTO } from './user.service';
import { UsePipes } from '@nestjs/common/decorators';

@Controller('artist')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async findAll() {
    return this.userService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  @UsePipes()
  async create(@Body() createUserDto: CreateUserDTO) {
    return this.userService.create(createUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @Patch(':id')
  async change(@Param('id') id: string, @Body() changeUserDto: ChangeUserDTO) {
    return this.userService.change(id, changeUserDto);
  }
}
