import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { AlbumEntity } from './entities/album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
  // exports: [AlbumService],
})
export class AlbumModule {}
