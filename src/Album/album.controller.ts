import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Put,
  Post,
} from '@nestjs/common';
import { AlbumService, ChangeAlbumDTO, CreateAlbumDTO } from './album.service';
import { ErrorsCode } from 'src/utils/common types/enum';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}
  @Get()
  async findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const item = this.albumService.findOne(id);
    if (!item) {
      throw new HttpException('Album not Found', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDTO) {
    return this.albumService.create(createAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const item = this.albumService.delete(id);
    if (!item) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  @Put(':id')
  async change(
    @Param('id') id: string,
    @Body() changeAlbumDto: ChangeAlbumDTO,
  ) {
    try {
      return this.albumService.change(id, changeAlbumDto);
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
