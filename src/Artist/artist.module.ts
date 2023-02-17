import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

import { ArtistEntity } from './entities/artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  // exports: [ArtistService],
  imports: [TypeOrmModule.forFeature([ArtistEntity])],
})
export class ArtistModule {}
