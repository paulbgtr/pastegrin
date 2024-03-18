import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paste } from 'src/model/paste.entity';
import { PastesService } from 'src/services/pastes.service';
import { PastesController } from '../controllers/pastes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Paste])],
  providers: [PastesService],
  controllers: [PastesController],
})
export class PastesModule {}
