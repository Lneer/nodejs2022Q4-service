import { OmitType } from '@nestjs/mapped-types';
import { ArtistEntity } from '../entities/artist.entity';

export class CreateArtistDTO extends OmitType(ArtistEntity, ['id'] as const) {}
