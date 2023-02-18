import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ArtistEntity } from 'src/Artist/entities/artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID('4')
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsInt()
  @IsNotEmpty()
  year!: number;

  @Column({ nullable: true })
  @IsUUID('4')
  artistId?: string;

  @ManyToOne(() => ArtistEntity, { onDelete: 'SET NULL' })
  artist: ArtistEntity;
}
