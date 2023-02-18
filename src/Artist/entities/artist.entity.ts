import { AlbumEntity } from 'src/Album/entities/album.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artists')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => AlbumEntity, (album) => album.artistId)
  albums: AlbumEntity;
}
