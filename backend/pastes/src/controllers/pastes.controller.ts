import { Controller, Get, Post, Body } from '@nestjs/common';
import { PastesService } from 'src/services/pastes.service';
import { Paste } from 'src/model/paste.entity';
import { CreatePasteDto } from 'src/dto/create-paste.dto';

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

  @Post()
  create(@Body() createPasteDto: CreatePasteDto): Promise<Paste> {
    return this.pastesService.create(createPasteDto);
  }
}
