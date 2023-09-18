import { Module } from '@nestjs/common';
import { VinculadosService } from './vinculados.service';
import { VinculadosController } from './vinculados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vinculado } from './entities/vinculado.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Vinculado
    ])
  ],
  controllers: [VinculadosController],
  providers: [VinculadosService]
})
export class VinculadosModule {}
