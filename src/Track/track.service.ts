import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { DBEntity } from '../utils/DB/DBEntyty';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsUUID,
  IsString,
  ValidateIf,
  IsInt,
} from 'class-validator';

export class TrackEntity {
  @IsUUID('4')
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((value) => value !== null)
  @IsUUID('4')
  artistId: string | null;

  @ValidateIf((value) => value !== null)
  @IsUUID('4')
  albumId: string | null;

  @IsInt()
  @IsNotEmpty()
  duration: number;
}

export class CreateTrackDTO extends OmitType(TrackEntity, ['id'] as const) {}
export class ChangeTrackDTO extends PartialType(
  OmitType(TrackEntity, ['id'] as const),
) {}

@Injectable()
export class TrackService extends DBEntity<
  TrackEntity,
  ChangeTrackDTO,
  CreateTrackDTO
> {
  create(trackDto: CreateTrackDTO) {
    const created: TrackEntity = {
      ...trackDto,
      id: uuid(),
    };
    this.entities.push(created);
    return created;
  }
}
