import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { FavoriteEntity } from './entities/favorite.entity';
import { ArtistEntity } from 'src/Artist/entities/artist.entity';
import { AlbumEntity } from 'src/Album/entities/album.entity';
import { TrackEntity } from 'src/Track/entities/track.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService],
  imports: [
    TypeOrmModule.forFeature([
      FavoriteEntity,
      ArtistEntity,
      AlbumEntity,
      TrackEntity,
    ]),
  ],
})
export class FavoriteModule {}
