import { Module, forwardRef } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TrackModule } from '../Track/track.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [forwardRef(() => TrackModule)],
  exports: [AlbumService],
})
export class AlbumModule {}
