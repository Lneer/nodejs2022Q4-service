import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
  async findOne(@Param('id') id: string) {
    return this.artistService.findOne(id);
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
