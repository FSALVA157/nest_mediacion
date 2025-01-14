import { Module } from '@nestjs/common';
import { AudienciasService } from './audiencias.service';
import { AudienciasController } from './audiencias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audiencia } from './entities/audiencia.entity';
import { Tramite } from '../tramites/entities/tramite.entity';
import { UsuariosTramite } from '../usuarios-tramite/entities/usuarios-tramite.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Audiencia,
      Tramite,
      UsuariosTramite
    ])
  ],
  controllers: [AudienciasController],
  providers: [AudienciasService]
})
export class AudienciasModule {}
