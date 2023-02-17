import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { ErrorsCode } from '../utils/common types/enum';
import { ArtistEntity } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDTO } from './dto/createArtist.dto';
import { ArtistDto } from './dto/artist.dto';
import { ChangeArtistDTO } from './dto/chandeArtist.dto';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async create(artistDto: CreateArtistDTO) {
    const created: ArtistDto = {
      ...artistDto,
      id: uuid(),
    };

    const createdArtist = this.artistRepository.create(created);
    return await this.artistRepository.save(createdArtist);
  }
  async findAll() {
    const artists = await this.artistRepository.find();
    return artists;
  }

  async findOne(artistId: string) {
    const user = await this.artistRepository.findOne({
      where: { id: artistId },
    });
    if (user) return user;
    throw new Error(ErrorsCode[404]);
  }

  async change(artistId: string, chandeDTO: ChangeArtistDTO) {
    const artistForUpdate = await this.artistRepository.findOne({
      where: { id: artistId },
    });

    if (!artistForUpdate) {
      throw new Error(ErrorsCode[404]);
    }

    const changedEntity = {
      ...artistForUpdate,
      ...chandeDTO,
    };

    const changedArtist = await this.artistRepository.save(changedEntity);
    return changedArtist;
  }

  async delete(artistId: string) {
    const deletedArtist = await this.artistRepository.delete(artistId);

    if (deletedArtist.affected === 0) {
      throw new Error(ErrorsCode[404]);
    }

    return deletedArtist;
  }
}
