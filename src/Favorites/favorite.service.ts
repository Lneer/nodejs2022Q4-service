import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteEntity } from './entities/favorite.entity';
import { AlbumEntity } from 'src/Album/entities/album.entity';
import { ArtistEntity } from 'src/Artist/entities/artist.entity';
import { TrackEntity } from 'src/Track/entities/track.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private favouriteRepository: Repository<FavoriteEntity>,

    @InjectRepository(ArtistEntity)
    private artistsRepository: Repository<ArtistEntity>,

    @InjectRepository(AlbumEntity)
    private albumsRepository: Repository<AlbumEntity>,

    @InjectRepository(TrackEntity)
    private tracksRepository: Repository<TrackEntity>,
  ) {}

  async findAll() {
    const [favourites] = await this.favouriteRepository.find({
      relations: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });

    if (favourites) {
      return favourites;
    }

    await this.favouriteRepository.save(new FavoriteEntity());

    const [emptyFavourites] = await this.favouriteRepository.find({
      relations: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });

    return emptyFavourites;
  }
  async addTrack(id: string) {
    const track = await this.tracksRepository.findOneBy({ id });

    if (!track) {
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    let [favourite] = await this.favouriteRepository.find({
      relations: {
        tracks: true,
      },
    });

    if (!favourite) {
      favourite = await this.favouriteRepository.save(new FavoriteEntity());
    }

    favourite.tracks.push(track);

    await this.favouriteRepository.save(favourite);
  }

  async addAlbum(id: string) {
    const album = await this.albumsRepository.findOneBy({ id });

    if (!album) {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    let [favourite] = await this.favouriteRepository.find({
      relations: {
        albums: true,
      },
    });

    if (!favourite) {
      favourite = await this.favouriteRepository.save(new FavoriteEntity());
    }

    favourite.albums.push(album);

    await this.favouriteRepository.save(favourite);
  }

  async addArtist(id: string) {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) {
      throw new HttpException(
        'Entity not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    let [favourite] = await this.favouriteRepository.find({
      relations: {
        artists: true,
      },
    });

    if (!favourite) {
      favourite = await this.favouriteRepository.save(new FavoriteEntity());
    }

    favourite.artists.push(artist);

    await this.favouriteRepository.save(favourite);
  }
  async removeAritst(id: string) {
    const entity = await this.artistsRepository.findOneBy({ id });

    if (!entity) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const [favourite] = await this.favouriteRepository.find({
      relations: {
        artists: true,
      },
    });

    if (!favourite) {
      throw new HttpException(
        'Entity does not exits in favourtes',
        HttpStatus.NOT_FOUND,
      );
    }

    favourite.artists = favourite.artists.filter((artist) => artist.id !== id);

    await this.favouriteRepository.save(favourite);
  }

  async removeAlbum(id: string) {
    const entity = await this.albumsRepository.findOneBy({ id });

    if (!entity) {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const [favourite] = await this.favouriteRepository.find({
      relations: {
        albums: true,
      },
    });

    if (!favourite) {
      throw new HttpException(
        'Entity does not exits in favourtes',
        HttpStatus.NOT_FOUND,
      );
    }

    favourite.albums = favourite.albums.filter((album) => album.id !== id);

    await this.favouriteRepository.save(favourite);
  }

  async removeTrack(id: string) {
    const entity = await this.tracksRepository.findOneBy({ id });

    if (!entity) {
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const [favourite] = await this.favouriteRepository.find({
      relations: {
        tracks: true,
      },
    });

    if (!favourite) {
      throw new HttpException(
        'Track does not exits in favourtes',
        HttpStatus.NOT_FOUND,
      );
    }

    favourite.tracks = favourite.tracks.filter((track) => track.id !== id);

    await this.favouriteRepository.save(favourite);
  }
  //   createFavorite(type: keyof FavoriteEntity, id: string) {
  //     let item: any;

  //     if (type === 'albums') {
  //       item = this.albumsRepository.findOne({ where: { id } });
  //     }
  //     if (type === 'artists') {
  //       item = this.artistsRepository.findOne({ where: { id } });
  //     }
  //     if (type === 'tracks') {
  //       item = this.tracksRepository.findOne({ where: { id } });
  //     }

  //     if (!item) return null;
  //   }

  //   deleteFavorite(type: keyof FavoriteEntity, id: string) {}
}
