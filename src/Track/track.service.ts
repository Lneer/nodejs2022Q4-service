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

export class TrackEntity {
  @IsUUID('4')
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((value) => value !== null)
  // @IsUUID('4')
  artistId: string | null;

  @ValidateIf((value) => value !== null)
  // @IsUUID('4')
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
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
  ) {
    super();
  }
  create(trackDto: CreateTrackDTO) {
    // const album = this.albumService.findOne({
    //   key: 'id',
    //   equal: trackDto.albumId,
    // });
    // const artist = this.artistService.findOne({
    //   key: 'id',
    //   equal: trackDto.artistId,
    // });
    // const albumId = album ? album.id : null;
    // const artistId = artist ? artist.id : null;
    const created: TrackEntity = {
      ...trackDto,
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
