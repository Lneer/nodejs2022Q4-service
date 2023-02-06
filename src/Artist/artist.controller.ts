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
import {
  ArtistService,
  ChangeArtistDTO,
  CreateArtistDTO,
} from './artist.service';
import { HttpCode, UsePipes } from '@nestjs/common/decorators';
import { ErrorsCode } from 'src/utils/common types/enum';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}
  @Get()
  async findAll() {
    return this.artistService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const item = this.artistService.findOne({ key: 'id', equal: id });
    if (!item) {
      throw new HttpException('Artist Not Found', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  @Post()
  @UsePipes()
  async create(@Body() createArtistDto: CreateArtistDTO) {
    return this.artistService.create(createArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const item = this.artistService.delete(id);
    if (!item) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  async change(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() changeArtistDto: ChangeArtistDTO,
  ) {
    try {
      return this.artistService.change(id, changeArtistDto);
    } catch (error) {
      if (error.message === ErrorsCode[404]) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
    }
  }
}
