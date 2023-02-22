import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

import { TrackEntity } from './entities/track.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  // exports: [TrackService],
  imports: [TypeOrmModule.forFeature([TrackEntity])],
})
export class TrackModule {}
