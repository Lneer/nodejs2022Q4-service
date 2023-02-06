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
import { TrackService, ChangeTrackDTO, CreateTrackDTO } from './track.service';
import { HttpCode, UsePipes } from '@nestjs/common/decorators';
import { ErrorsCode } from 'src/utils/common types/enum';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}
  @Get()
  async findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const item = this.trackService.findOne(id);
    if (!item) {
      throw new HttpException('Track not Found', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  @Post()
  @UsePipes()
  async create(@Body() createTrackDto: CreateTrackDTO) {
    return this.trackService.create(createTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const item = this.trackService.delete(id);
    if (!item) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  @Put(':id')
  async change(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() changeTrackDto: ChangeTrackDTO,
  ) {
    try {
      return this.trackService.change(id, changeTrackDto);
    } catch (error) {
      if (error.message === ErrorsCode[404]) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      } else throw new HttpException('Somthing wrong', HttpStatus.FORBIDDEN);
    }
  }
}
