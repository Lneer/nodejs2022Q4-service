import { v4 as uuid } from 'uuid';
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { DBEntity } from '../utils/DB/DBEntyty';
import { OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID, IsString, IsBoolean } from 'class-validator';
import { ErrorsCode } from '../utils/common types/enum';
import { TrackService } from 'src/Track/track.service';
import { AlbumService } from 'src/Album/album.service';

export class ArtistEntity {
  @IsUUID('4')
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}

export class CreateArtistDTO extends OmitType(ArtistEntity, ['id'] as const) {}
export class ChangeArtistDTO extends CreateArtistDTO {}

@Injectable()
export class ArtistService extends DBEntity<
  ArtistEntity,
  ChangeArtistDTO,
  CreateArtistDTO
> {
  constructor(
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {
    super();
  }
  create(artistDto: CreateArtistDTO) {
    const created: ArtistEntity = {
      ...artistDto,
      id: uuid(),
    };
    this.entities.push(created);
    return created;
  }
  change(id: string, chandeDTO: ChangeArtistDTO): ArtistEntity {
    const idx = this.entities.findIndex((entity) => entity.id === id);
    if (idx < 0) {
      throw new Error(ErrorsCode[404]);
    }
    const changedArtist = { ...chandeDTO, id };
    this.entities[idx] = changedArtist;
    return changedArtist;
  }
  delete(id: string): ArtistEntity {
    const idx = this.entities.findIndex((entity) => entity.id === id);
    const deletedArtist = this.entities[idx];
    this.entities.splice(idx, 1);
    const album = this.albumService.findAll();
    album.forEach((artist) => {
      if (artist.artistId === id) {
        this.albumService.change(artist.id, { ...artist, artistId: null });
      }
    });
    const tracks = this.trackService.findAll();
    tracks.forEach((track) => {
      if (track.artistId === id) {
        // const artistId = null;
        this.trackService.change(track.id, { ...track, artistId: null });
      }
    });
    return deletedArtist;
  }
}
