import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn()
  @IsUUID('4')
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsInt()
  @IsNotEmpty()
  year: number;

  @Column()
  @IsUUID('4')
  artistId?: string;
}
