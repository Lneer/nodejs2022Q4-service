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
import { ErrorsCode } from 'src/utils/common types/enum';
import { AlbumService } from 'src/Album/album.service';

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
  constructor(
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
  ) {
    super();
  }
  create(trackDto: CreateTrackDTO) {
    const album = this.albumService.findOne(trackDto.albumId);
    const albumId = album ? album.id : null;
    const created: TrackEntity = {
      ...trackDto,
      albumId,
      id: uuid(),
    };
    this.entities.push(created);
    return created;
  }
  change(id: string, chandeDTO: ChangeTrackDTO) {
    const idx = this.entities.findIndex((entity) => entity.id === id);
    if (idx < 0) {
      throw new Error(ErrorsCode[404]);
    }
    const changedEntity = { ...this.entities[idx], ...chandeDTO };
    this.entities[idx] = changedEntity;
    return changedEntity;
  }
}
