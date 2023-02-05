import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TrackService, ChangeTrackDTO, CreateTrackDTO } from './track.service';
import { UsePipes } from '@nestjs/common/decorators';

@Controller('artist')
export class TrackController {
  constructor(private trackService: TrackService) {}
  @Get()
  async findAll() {
    return this.trackService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.trackService.findOne(id);
  }

  @Post()
  @UsePipes()
  async create(@Body() createTrackDto: CreateTrackDTO) {
    return this.trackService.create(createTrackDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.trackService.delete(id);
  }

  @Patch(':id')
  async change(
    @Param('id') id: string,
    @Body() changeTrackDto: ChangeTrackDTO,
  ) {
    return this.trackService.change(id, changeTrackDto);
  }
}
