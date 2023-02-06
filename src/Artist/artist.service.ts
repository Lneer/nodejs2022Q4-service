import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { DBEntity } from '../utils/DB/DBEntyty';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID, IsString, IsBoolean } from 'class-validator';

export class ArtistEntity {
  @IsUUID('4')
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}

export class CreateArtistDTO extends OmitType(ArtistEntity, ['id'] as const) {}
export class ChangeArtistDTO extends PartialType(
  OmitType(ArtistEntity, ['id'] as const),
) {}

@Injectable()
export class ArtistService extends DBEntity<
  ArtistEntity,
  ChangeArtistDTO,
  CreateArtistDTO
> {
  create(artistDto: CreateArtistDTO) {
    const created: ArtistEntity = {
      ...artistDto,
      id: uuid(),
    };
    this.entities.push(created);
    return created;
  }
  change(id: string, chandeDTO: ChangeArtistDTO): ArtistEntity {
    return this.entities[0];
  }
}
