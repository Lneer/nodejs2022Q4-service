import { Injectable } from '@nestjs/common';
import { ErrorsCode } from 'src/utils/common types/enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from './entities/album.entity';
import { CreateAlbumDTO } from './dto/createAlbum.dto';
import { ChangeAlbumDTO } from './dto/changeAlbum.dto';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  async create(albumDto: CreateAlbumDTO) {
    return this.albumRepository.save(albumDto);
  }

  async findAll() {
    const albums = await this.albumRepository.find();

    return albums;
  }

  async findOne(albumId: string) {
    const album = await this.albumRepository.findOne({
      where: { id: albumId },
    });

    if (album) return album;

    throw new Error(ErrorsCode[404]);
  }

  async change(albumId: string, chandeDTO: ChangeAlbumDTO) {
    const albumForUpdate = await this.albumRepository.findOne({
      where: { id: albumId },
    });

    if (!albumForUpdate) {
      throw new Error(ErrorsCode[404]);
    }

    const changedEntity = { ...chandeDTO, albumId };
    return await this.albumRepository.save(changedEntity);
  }

  async delete(albumId: string) {
    const deletedAlbum = await this.albumRepository.delete(albumId);
    if (deletedAlbum.affected === 0) {
      throw new Error(ErrorsCode[404]);
    }
    return deletedAlbum;
  }
}
