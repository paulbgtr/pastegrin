import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { PastesService } from 'src/services/pastes.service';
import { Paste } from 'src/model/paste.entity';
import { PasteDto } from 'src/dto/paste.dto';

@Controller('pastes')
export class PastesController {
  constructor(private readonly pastesService: PastesService) {}

  @Get()
  findAll(): Promise<Paste[]> {
    return this.pastesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Paste | null> {
    return this.pastesService.findOne(id);
  }

  @Post()
  create(@Body() createPasteDto: PasteDto): Promise<Paste> {
    return this.pastesService.create(createPasteDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.pastesService.remove(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updatePasteDto: PasteDto,
  ): Promise<void> {
    return this.pastesService.update(id, updatePasteDto);
  }
}
