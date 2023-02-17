import { OmitType } from '@nestjs/mapped-types';
import { TrackEntity } from '../entities/track.entity';

export class ChangeTrackDTO extends OmitType(TrackEntity, ['id'] as const) {}
