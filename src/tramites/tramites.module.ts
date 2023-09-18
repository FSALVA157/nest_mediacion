import { Module } from '@nestjs/common';
import { TramitesService } from './tramites.service';
import { TramitesController } from './tramites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tramite } from './entities/tramite.entity';
import { Ciudadano } from 'src/ciudadanos/entities/ciudadano.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UsuarioModule } from '../usuario/usuario.module';
import { UsuariosCentrosModule } from '../usuarios-centros/usuarios-centros.module';
import { UsuarioCentro } from '../usuarios-centros/entities/usuario-centro.entity';
import { UsuariosCentrosService } from '../usuarios-centros/usuarios-centros.service';
import { UsuarioService } from '../usuario/usuario.service';
import { ConvocadosService } from '../convocados/convocados.service';
import { Convocado } from '../convocados/entities/convocado.entity';
import { VinculadosModule } from 'src/vinculados/vinculados.module';
import { VinculadosService } from 'src/vinculados/vinculados.service';
import { Vinculado } from 'src/vinculados/entities/vinculado.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Ciudadano,
      Convocado,
      Tramite,
      Usuario,
      UsuarioCentro,
      Vinculado
    ]),
  ],
  exports: [TramitesService],
  controllers: [TramitesController],
  providers: [TramitesService, ConvocadosService, UsuariosCentrosService, UsuarioService, VinculadosService ]
})
export class TramitesModule {}
