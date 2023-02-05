import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ArtistService,
  ChangeArtistDTO,
  CreateArtistDTO,
} from './artist.service';
import { UsePipes } from '@nestjs/common/decorators';

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
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  @Post()
  @UsePipes()
  async create(@Body() createArtistDto: CreateArtistDTO) {
    return this.artistService.create(createArtistDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.artistService.delete(id);
  }

  @Patch(':id')
  async change(
    @Param('id') id: string,
    @Body() changeArtistDto: ChangeArtistDTO,
  ) {
    return this.artistService.change(id, changeArtistDto);
  }
}
