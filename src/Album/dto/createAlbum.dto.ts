import { OmitType } from '@nestjs/mapped-types/';
import { AlbumEntity } from '../entities/album.entity';

export class CreateAlbumDTO extends OmitType(AlbumEntity, ['id'] as const) {}
