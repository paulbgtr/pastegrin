import {
  Headers,
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
import { CreatePasteDto } from 'src/dto/create-paste.dto';
import { VerifyPasteDto } from 'src/dto/verify-paste-dto';
import { UpdatePasteDto } from 'src/dto/update-paste.dto';

@Controller()
export class PastesController {
  constructor(private readonly pastesService: PastesService) {}

  @Get('get')
  findAll(): Promise<Paste[]> {
    return this.pastesService.findAll();
  }

  @Get('get/:id')
  findOne(@Headers() headers, @Param('id') id: number): Promise<Paste | null> {
    const token = headers.authorization?.split(' ')[1];

    return this.pastesService.findOne(id, token);
  }

  @Get('get/user')
  findUserPastes(@Headers() headers): Promise<Paste[]> {
    const token = headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Token not found');

    return this.pastesService.findUserPastes(token);
  }

  @Post('create')
  create(@Body() createPasteDto: CreatePasteDto): Promise<Paste> {
    return this.pastesService.create(createPasteDto);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: number): Promise<void> {
    return this.pastesService.remove(id);
  }

  @Put('update/:id')
  update(
    @Param('id') id: number,
    @Body() updatePasteDto: UpdatePasteDto,
  ): Promise<void> {
    return this.pastesService.update(id, updatePasteDto);
  }

  @Post('verify/:id')
  verify(
    @Param('id') id: number,
    @Body() verifyPasteDto: VerifyPasteDto,
  ): Promise<boolean> {
    return this.pastesService.verify(id, verifyPasteDto.password);
  }
}
