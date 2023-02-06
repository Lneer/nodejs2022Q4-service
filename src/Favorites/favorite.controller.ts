import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoriteEntity, FavoriteService } from './favorite.service';
import { HttpCode } from '@nestjs/common/decorators';

@Controller('favs')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}
  @Get()
  async findAll() {
    return this.favoriteService.findAll();
  }

  @Post(':type/:id')
  async create(
    @Param('type') type: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const item = this.favoriteService.createFavorite(
      `${type}s` as keyof FavoriteEntity,
      id,
    );
    if (!item) {
      throw new HttpException(
        " track doesn't exit",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return item;
  }

  @Delete(':type/:id')
  @HttpCode(204)
  async delete(
    @Param('type') type: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const item = this.favoriteService.deleteFavorite(
      `${type}s` as keyof FavoriteEntity,
      id,
    );
    if (!item) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return item;
  }
}
