import { Module, forwardRef } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { AlbumModule } from '../Album/album.module';
import { ArtistModule } from '../Artist/artist.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
  imports: [forwardRef(() => AlbumModule), forwardRef(() => ArtistModule)],
})
export class TrackModule {}
