import { OmitType } from '@nestjs/mapped-types/';
import { AlbumEntity } from '../entities/album.entity';

// import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAlbumDTO extends OmitType(AlbumEntity, ['id'] as const) {}
