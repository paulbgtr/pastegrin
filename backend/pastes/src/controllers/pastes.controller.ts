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

@Controller()
export class PastesController {
  constructor(private readonly pastesService: PastesService) {}

  @Get('get')
  findAll(): Promise<Paste[]> {
    return this.pastesService.findAll();
  }

  @Get('get/:id')
  findOne(@Param('id') id: number): Promise<Paste | null> {
    return this.pastesService.findOne(id);
  }

  @Post('create')
  create(@Body() createPasteDto: PasteDto): Promise<Paste> {
    return this.pastesService.create(createPasteDto);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: number): Promise<void> {
    return this.pastesService.remove(id);
  }

  @Put('update/:id')
  update(
    @Param('id') id: number,
    @Body() updatePasteDto: PasteDto,
  ): Promise<void> {
    return this.pastesService.update(id, updatePasteDto);
  }
}
