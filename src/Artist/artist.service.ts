import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorsCode } from '../utils/common types/enum';
import { ArtistEntity } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDTO } from './dto/createArtist.dto';
import { ChangeArtistDTO } from './dto/chandeArtist.dto';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async create(artistDto: CreateArtistDTO) {
    return await this.artistRepository.save(artistDto);
  }

  async findAll() {
    const artists = await this.artistRepository.find();
    return artists;
  }

  async findOne(artistId: string) {
    const artist = await this.artistRepository.findOne({
      where: { id: artistId },
    });
    if (!artist) throw new NotFoundException(ErrorsCode[404]);

    return artist;
  }

  async change(artistId: string, chandeDTO: ChangeArtistDTO) {
    const artistForUpdate = await this.artistRepository.findOne({
      where: { id: artistId },
    });

    if (!artistForUpdate) {
      throw new NotFoundException(ErrorsCode[404]);
    }

    const changedEntity = {
      ...artistForUpdate,
      ...chandeDTO,
    };
    const createdEntity = this.artistRepository.create(changedEntity);
    const changedArtist = await this.artistRepository.save(createdEntity);
    return changedArtist;
  }

  async delete(artistId: string) {
    const user = await this.artistRepository.findOne({
      where: { id: artistId },
    });
    if (!user) throw new NotFoundException(ErrorsCode[404]);
    await this.artistRepository.delete(artistId);
  }
}
