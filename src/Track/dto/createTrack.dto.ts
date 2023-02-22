import { OmitType } from '@nestjs/mapped-types';
import { TrackEntity } from '../entities/track.entity';

export class CreateTrackDTO extends OmitType(TrackEntity, ['id'] as const) {}
