import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ArtistEntity } from '../entities/artist.entity';

export class ArtistDto extends ArtistEntity {
  @IsUUID('4')
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
