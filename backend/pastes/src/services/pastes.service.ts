import { Injectable } from '@nestjs/common';
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

  findOne(id: number): Promise<Paste | null> {
    return this.pastesRepository.findOneBy({ id });
  }

  async create(paste: Paste): Promise<Paste> {
    return this.pastesRepository.save(paste);
  }

  async remove(id: number): Promise<void> {
    await this.pastesRepository.delete(id);
  }
}
