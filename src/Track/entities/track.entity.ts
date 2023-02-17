import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tracks')
export class TrackEntity {
  @PrimaryGeneratedColumn()
  @IsUUID('4')
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsUUID('4')
  artistId?: string;

  @Column()
  @IsUUID('4')
  albumId?: string;

  @Column()
  @IsInt()
  @IsNotEmpty()
  duration: number;
}
