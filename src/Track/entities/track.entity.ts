import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { AlbumEntity } from 'src/Album/entities/album.entity';
import { ArtistEntity } from 'src/Artist/entities/artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tracks')
export class TrackEntity {
  @PrimaryGeneratedColumn()
  @IsUUID('4')
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ nullable: true })
  @IsUUID('4')
  artistId?: string;

  @Column({ nullable: true })
  @IsUUID('4')
  albumId?: string;

  @Column()
  @IsInt()
  @IsNotEmpty()
  duration: number;

  @ManyToOne(() => ArtistEntity, { onDelete: 'SET NULL' })
  artist: ArtistEntity;

  @ManyToOne(() => AlbumEntity, { onDelete: 'SET NULL' })
  album: AlbumEntity;
}
