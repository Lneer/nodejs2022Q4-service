import { v4 as uuid } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorsCode } from '../utils/common types/enum';
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
    const createdTrack = this.trackRepository.create(trackDto);
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

    if (!track) throw new NotFoundException(ErrorsCode[404]);
    return track;
  }

  async change(trackId: string, chandeDTO: ChangeTrackDTO) {
    const trackForUpdate = await this.trackRepository.findOne({
      where: { id: trackId },
    });

    if (!trackForUpdate) {
      throw new NotFoundException(ErrorsCode[404]);
    }

    const changedEntity = { ...trackForUpdate, ...chandeDTO };
    const changedTrack = await this.trackRepository.save(changedEntity);
    return changedTrack;
  }

  async delete(trackId: string) {
    const trackForUpdate = await this.trackRepository.findOne({
      where: { id: trackId },
    });

    if (!trackForUpdate) {
      throw new NotFoundException(ErrorsCode[404]);
    }

    return await this.trackRepository.delete(trackId);
  }
}
