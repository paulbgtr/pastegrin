import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paste } from 'src/model/paste.entity';

@Injectable()
export class PastesService {
  constructor(
    @InjectRepository(Paste)
    private pastesRepository: Repository<Paste>,
  ) {}

  findAll(): Promise<Paste[]> {
    return this.pastesRepository.find();
  }

  async findOne(id: number): Promise<Paste | null> {
    const foundPaste = await this.pastesRepository.findOneBy({ id });

    if (!foundPaste) throw new HttpException('Paste not found', 404);

    return foundPaste;
  }

  async create(paste: Paste): Promise<Paste> {
    return this.pastesRepository.save(paste);
  }

  async remove(id: number): Promise<void> {
    const pasteExists = await this.pastesRepository.findOneBy({
      id,
    });

    if (!pasteExists) throw new HttpException('Paste not found', 404);

    await this.pastesRepository.delete(id);
  }

  async update(id: number, paste: Paste): Promise<void> {
    const pasteExists = await this.pastesRepository.findOneBy({
      id,
    });

    if (!pasteExists) throw new HttpException('Paste not found', 404);

    await this.pastesRepository.update(id, paste);
  }
}
