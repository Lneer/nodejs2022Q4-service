import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './Artist/artist.module';
import { AlbumModule } from './Album/album.module';
import { TrackModule } from './Track/track.module';
import { UserModule } from './User/user.module';
import { FavoriteModule } from './Favorites/favorite.module';

@Module({
  imports: [ArtistModule, AlbumModule, TrackModule, UserModule, FavoriteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
