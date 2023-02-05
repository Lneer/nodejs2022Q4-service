import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AlbumService, ChangeAlbumDTO, CreateAlbumDTO } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}
  @Get()
  async findAll() {
    return this.albumService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.albumService.findOne(id);
  }

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDTO) {
    return this.albumService.create(createAlbumDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.albumService.delete(id);
  }

  @Patch(':id')
  async change(
    @Param('id') id: string,
    @Body() changeAlbumDto: ChangeAlbumDTO,
  ) {
    return this.albumService.change(id, changeAlbumDto);
  }
}
