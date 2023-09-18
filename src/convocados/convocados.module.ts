import { Module } from '@nestjs/common';
import { ConvocadosService } from './convocados.service';
import { ConvocadosController } from './convocados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Convocado } from './entities/convocado.entity';
import { Tramite } from 'src/tramites/entities/tramite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Convocado,
      Tramite
    ])
  ],
  controllers: [ConvocadosController],
  providers: [ConvocadosService]
})
export class ConvocadosModule {}
