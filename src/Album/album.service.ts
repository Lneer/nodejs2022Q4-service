import { v4 as uuid } from 'uuid';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { DBEntity } from '../utils/DB/DBEntyty';
import { OmitType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsUUID,
  IsString,
  IsInt,
  ValidateIf,
} from 'class-validator';
import { TrackService } from '../Track/track.service';
import { ErrorsCode } from 'src/utils/common types/enum';

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
  // @IsUUID('4')
  artistId: string | null;
}

export class CreateAlbumDTO extends OmitType(AlbumEntity, ['id'] as const) {}
export class ChangeAlbumDTO extends CreateAlbumDTO {}

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

  create(albumDto: CreateAlbumDTO) {
    const created: AlbumEntity = {
      ...albumDto,
      id: uuid(),
    };
    this.entities.push(created);
    return created;
  }
  change(id: string, chandeDTO: ChangeAlbumDTO): AlbumEntity {
    const idx = this.entities.findIndex((entity) => entity.id === id);
    if (idx < 0) {
      throw new Error(ErrorsCode[404]);
    }
    const changedAlbum = { ...chandeDTO, id };
    this.entities[idx] = changedAlbum;
    return changedAlbum;
  }

  delete(id: string): AlbumEntity {
    const idx = this.entities.findIndex((entity) => entity.id === id);
    const deletedAlbum = this.entities[idx];
    this.entities.splice(idx, 1);
    const track = this.trackService.findAll();
    track.forEach((album) => {
      if (album.albumId === id) {
        const albumId = null;
        this.trackService.change(album.id, { ...album, albumId });
      }
    });
    return deletedAlbum;
  }
}
