import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { LoginCiudadanoDto } from './dto/login-ciudadano.dto';
import { Ciudadano } from 'src/ciudadanos/entities/ciudadano.entity';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';


@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(Ciudadano)
    private readonly ciudadanoRepository: Repository<Ciudadano>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
    
  ){}

 
  async loginCiudadano(loginCiudadanoDto: LoginCiudadanoDto){
    console.log("user", loginCiudadanoDto.dni);
    console.log("clave", loginCiudadanoDto.clave);
    const { dni, clave } = loginCiudadanoDto;    

    const ciudadano = await this.ciudadanoRepository.createQueryBuilder('ciudadano')
    .where('ciudadano.dni = :dni', { dni: dni })
    .select(['ciudadano.dni', 'ciudadano.clave'])
    .getOne();

    if(!ciudadano)
      throw new UnauthorizedException ("Los datos de login no son válidos (dni)");

    if( !bcrypt.compareSync(clave, ciudadano.clave) )
      throw new UnauthorizedException ("Los datos de login no son válidos (clave)");

    return ciudadano;
    //TODO: RETORNAR jWT
  }

  async loginUsuario(loginUsuarioDto: LoginUsuarioDto){
    console.log("user", loginUsuarioDto.dni);
    console.log("clave", loginUsuarioDto.clave);
    const { dni, clave } = loginUsuarioDto;    

    const usuario = await this.usuarioRepository.createQueryBuilder('usuario')
    .where('usuario.dni = :dni', { dni: dni })
    .select(['usuario.dni', 'usuario.clave'])
    .getOne();

    if(!usuario)
      throw new UnauthorizedException ("Los datos de login no son válidos (dni)");

    if( !bcrypt.compareSync(clave, usuario.clave) )
      throw new UnauthorizedException ("Los datos de login no son válidos (clave)");

    return usuario;
    //TODO: RETORNAR jWT
  }

}
