import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}
  @Get()
  async findAll() {
    return this.favoriteService.findAll();
  }
  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.addTrack(id);
  }

  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.addAlbum(id);
  }

  @Post('artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAritst(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.removeAritst(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.removeAlbum(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.removeTrack(id);
  }

  //   @Post(':type/:id')
  //   async create(
  //     @Param('type') type: string,
  //     @Param('id', new ParseUUIDPipe()) id: string,
  //   ) {
  //     const item = this.favoriteService.createFavorite(
  //       `${type}s` as keyof FavoriteEntity,
  //       id,
  //     );
  //     if (!item) {
  //       throw new HttpException(
  //         " track doesn't exit",
  //         HttpStatus.UNPROCESSABLE_ENTITY,
  //       );
  //     }
  //     return item;
  //   }

  //   @Delete(':type/:id')
  //   @HttpCode(204)
  //   async delete(
  //     @Param('type') type: string,
  //     @Param('id', new ParseUUIDPipe()) id: string,
  //   ) {
  //     const item = this.favoriteService.deleteFavorite(
  //       `${type}s` as keyof FavoriteEntity,
  //       id,
  //     );
  //     if (!item) {
  //       throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  //     }
  //     return item;
  //   }
}
