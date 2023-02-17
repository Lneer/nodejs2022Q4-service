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
import { ArtistService } from './artist.service';
import { HttpCode, UsePipes } from '@nestjs/common/decorators';
import { ErrorsCode } from 'src/utils/common types/enum';
import { CreateArtistDTO } from './dto/createArtist.dto';
import { ChangeArtistDTO } from './dto/chandeArtist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}
  @Get()
  async findAll() {
    return this.artistService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const item = this.artistService.findOne(id);
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
    return item;
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
