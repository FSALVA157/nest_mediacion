import { Module } from '@nestjs/common';
import { VinculdadosService } from './vinculdados.service';
import { VinculdadosController } from './vinculdados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vinculdado } from './entities/vinculdado.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Vinculdado
    ])
  ],
  controllers: [VinculdadosController],
  providers: [VinculdadosService]
})
export class VinculdadosModule {}
