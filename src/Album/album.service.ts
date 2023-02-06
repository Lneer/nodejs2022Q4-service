import { v4 as uuid } from 'uuid';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { DBEntity } from '../utils/DB/DBEntyty';
import { OmitType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsUUID,
  IsString,
  IsInt,
  ValidateIf,
} from 'class-validator';
import { TrackService } from '../Track/track.service';

export class AlbumEntity {
  @IsUUID('4')
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @ValidateIf((value) => value !== null)
  @IsUUID('4')
  artistId: string | null;
}

export class CreateAlbumDTO extends OmitType(AlbumEntity, ['id'] as const) {}
export class ChangeAlbumDTO extends PartialType(
  OmitType(AlbumEntity, ['id'] as const),
) {}

@Injectable()
export class AlbumService extends DBEntity<
  AlbumEntity,
  ChangeAlbumDTO,
  CreateAlbumDTO
> {
  constructor(
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {
    super();
  }

  create(artistDto: CreateAlbumDTO) {
    const created: AlbumEntity = {
      ...artistDto,
      id: uuid(),
    };
    this.entities.push(created);
    return created;
  }
  change(id: string, chandeDTO: ChangeAlbumDTO): AlbumEntity {
    return this.entities[0];
  }
}
