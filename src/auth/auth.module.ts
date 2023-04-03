import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Ciudadano } from 'src/ciudadanos/entities/ciudadano.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { UsuarioModule } from '../usuario/usuario.module';
import { CiudadanosModule } from '../ciudadanos/ciudadanos.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Ciudadano,
      Usuario
    ]),
    
    UsuarioModule,CiudadanosModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
