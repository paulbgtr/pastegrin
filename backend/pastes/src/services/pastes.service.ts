import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paste } from 'src/model/paste.entity';
import { UpdatePasteDto } from 'src/dto/update-paste.dto';
import { decodeJwt } from 'src/utils/decodeJwt';

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

  async create(paste: Paste, token?: string): Promise<Paste> {
    if (token) {
      const { user_id: userId } = decodeJwt(token);
      paste.userId = userId;
    }
    const newPaste = await this.pastesRepository.save(paste);

    return newPaste;
  }

  async remove(id: number): Promise<void> {
    const pasteExists = await this.pastesRepository.findOneBy({
      id,
    });

    if (!pasteExists) throw new HttpException('Paste not found', 404);

    await this.pastesRepository.delete(id);
  }

  async update(id: number, paste: UpdatePasteDto): Promise<void> {
    const pasteExists = await this.pastesRepository.findOneBy({
      id,
    });

    if (!pasteExists) throw new HttpException('Paste not found', 404);

    await this.pastesRepository.update(id, paste);
  }

  async verify(id: number, password: string): Promise<boolean> {
    const paste = await this.pastesRepository.findOneBy({ id });

    if (!paste) throw new HttpException('Paste not found', 404);

    if (paste.password !== password)
      throw new HttpException('Invalid password', 400);

    return true;
  }

  async findUserPastes(token: string): Promise<Paste[]> {
    const { user_id: userId } = decodeJwt(token);

    const foundPastes = await this.pastesRepository.find({
      where: {
        userId,
      },
    });

    return foundPastes;
  }
}
