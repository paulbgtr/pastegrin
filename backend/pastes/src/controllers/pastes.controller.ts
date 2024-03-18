import { Controller, Get, Post } from '@nestjs/common';
import { PastesService } from 'src/services/pastes.service';
import { Paste } from 'src/model/paste.entity';

@Controller('pastes')
export class PastesController {
  constructor(private readonly pastesService: PastesService) {}

  @Get()
  findAll(): Promise<Paste[]> {
    return this.pastesService.findAll();
  }

  @Get(':id')
  findOne(id: number): Promise<Paste | null> {
    return this.pastesService.findOne(id);
  }
}
