import { OmitType } from '@nestjs/mapped-types';
import { ArtistDto } from './artist.dto';

export class ChangeArtistDTO extends OmitType(ArtistDto, ['id'] as const) {}
