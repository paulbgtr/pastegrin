import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paste } from 'src/model/paste.entity';
import { PastesModule } from './pastes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'pastes',
      entities: [Paste],
      synchronize: true,
    }),
    PastesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
