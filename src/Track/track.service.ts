import { v4 as uuid } from 'uuid';
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { DBEntity } from '../utils/DB/DBEntyty';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsUUID,
  IsString,
  ValidateIf,
  IsInt,
} from 'class-validator';
import { ErrorsCode } from '../utils/common types/enum';
import { AlbumService } from '../Album/album.service';
import { ArtistService } from '../Artist/artist.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackEntity } from './entities/track.entity';
import { CreateTrackDTO } from './dto/createTrack.dto';
import { ChangeTrackDTO } from './dto/chandeTrack.dto';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}
  async create(trackDto: CreateTrackDTO) {
    const created: TrackEntity = {
      ...trackDto,
      id: uuid(),
    };
    const createdTrack = this.trackRepository.create(created);
    return await this.trackRepository.save(createdTrack);
  }

  async findAll() {
    const tracks = await this.trackRepository.find();

    return tracks;
  }

  async findOne(trackId: string) {
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
    });

    if (track) return track;
    throw new Error(ErrorsCode[404]);
  }

  async change(trackId: string, chandeDTO: ChangeTrackDTO) {
    const trackForUpdate = await this.trackRepository.findOne({
      where: { id: trackId },
    });

    if (!trackForUpdate) {
      throw new Error(ErrorsCode[404]);
    }

    const changedEntity = { ...trackForUpdate, ...chandeDTO };
    const changedTrack = await this.trackRepository.save(changedEntity);
    return changedTrack;
  }

  async delete(trackId: string) {
    const deletedTrack = await this.trackRepository.delete(trackId);

    if (deletedTrack.affected === 0) {
      throw new Error(ErrorsCode[404]);
    }
  }
}
