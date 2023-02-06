import { Module, forwardRef } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { AlbumModule } from '../Album/album.module';
import { TrackModule } from '../Track/track.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
  imports: [forwardRef(() => AlbumModule), forwardRef(() => TrackModule)],
})
export class ArtistModule {}
