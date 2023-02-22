import { Injectable, NotFoundException } from '@nestjs/common';
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
    const createdAlbum = this.albumRepository.create(albumDto);
    return this.albumRepository.save(createdAlbum);
  }

  async findAll() {
    const albums = await this.albumRepository.find();
    return albums;
  }

  async findOne(albumId: string) {
    const album = await this.albumRepository.findOne({
      where: { id: albumId },
    });

    if (!album) throw new NotFoundException(ErrorsCode[404]);
    return album;
  }

  async change(albumId: string, chandeDTO: ChangeAlbumDTO) {
    const albumForUpdate = await this.albumRepository.findOne({
      where: { id: albumId },
    });

    if (!albumForUpdate) {
      throw new NotFoundException(ErrorsCode[404]);
    }

    const changedEntity = { ...albumForUpdate, ...chandeDTO };
    return await this.albumRepository.save(changedEntity);
  }

  async delete(albumId: string) {
    const albumFordelete = await this.albumRepository.findOne({
      where: { id: albumId },
    });

    if (!albumFordelete) {
      throw new NotFoundException(ErrorsCode[404]);
    }

    await this.albumRepository.delete(albumId);
  }
}
