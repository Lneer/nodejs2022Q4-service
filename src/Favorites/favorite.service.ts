import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { TrackEntity, TrackService } from '../Track/track.service';
import { AlbumEntity, AlbumService } from '../Album/album.service';
import { ArtistEntity, ArtistService } from '../Artist/artist.service';

export class FavoriteEntity {
  tracks: TrackEntity[];
  artists: ArtistEntity[];
  albums: AlbumEntity[];
}

// export class CreateArtistDTO extends OmitType(ArtistEntity, ['id'] as const) {}
// export class ChangeArtistDTO extends CreateArtistDTO {}

@Injectable()
export class FavoriteService {
  constructor(
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
  ) {}
  favoriteDB: FavoriteEntity = { tracks: [], artists: [], albums: [] };

  findAll() {
    return this.favoriteDB;
  }

  createFavorite(type: keyof FavoriteEntity, id: string) {
    let item: any;
    console.log(type);

    if (type === 'albums') {
      item = this.albumService.findOne({ key: 'id', equal: id });
    }
    if (type === 'artists') {
      console.log('inside');
      item = this.artistService.findOne({ key: 'id', equal: id });
    }
    if (type === 'tracks') {
      item = this.trackService.findOne({ key: 'id', equal: id });
    }

    if (!item) return null;

    this.favoriteDB[type].push(item);
    return item;
  }

  deleteFavorite(type: keyof FavoriteEntity, id: string) {
    let item: any;
    if (type === 'albums') {
      item = this.albumService.findOne({ key: 'id', equal: id });
    }
    if (type === 'artists') {
      item = this.artistService.findOne({ key: 'id', equal: id });
    }
    if (type === 'tracks') {
      item = this.trackService.findOne({ key: 'id', equal: id });
    }

    if (!item) return null;

    const idx = this.favoriteDB[type].findIndex((el) => el.id === id);
    if (idx < 0) return null;
    const deletedIItem = this.favoriteDB[type][idx];
    this.favoriteDB[type].splice(idx, 1);
    return deletedIItem;
  }
}
