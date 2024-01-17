import { Module } from '@nestjs/common';
import { ResultadosAudienciaService } from './resultados-audiencia.service';
import { ResultadosAudienciaController } from './resultados-audiencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultadoAudiencia } from './entities/resultados-audiencia.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ResultadoAudiencia
    ])
  ],
  controllers: [ResultadosAudienciaController],
  providers: [ResultadosAudienciaService]
})
export class ResultadosAudienciaModule {}
