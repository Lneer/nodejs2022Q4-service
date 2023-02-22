import * as dotenv from 'dotenv';
import { AlbumEntity } from 'src/Album/entities/album.entity';
import { ArtistEntity } from 'src/Artist/entities/artist.entity';
import { FavoriteEntity } from 'src/Favorites/entities/favorite.entity';
import { TrackEntity } from 'src/Track/entities/track.entity';
import { UserEntity } from 'src/User/entities/user.entity';
import { DataSourceOptions } from 'typeorm';

dotenv.config();

export default {
  type: 'postgres',
  host: 'postgres',
  port: parseInt(process.env.POSTGRES_PORT, 10) as number,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DATABASE as string,
  synchronize: true,
  entities: [
    ArtistEntity,
    AlbumEntity,
    UserEntity,
    TrackEntity,
    FavoriteEntity,
  ],
} as DataSourceOptions;
