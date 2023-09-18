import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUsuariosTramiteDto } from './dto/create-usuarios-tramite.dto';
import { UpdateUsuariosTramiteDto } from './dto/update-usuarios-tramite.dto';
import { Usuario } from '../usuario/entities/usuario.entity';
import { UsuariosTramite } from './entities/usuarios-tramite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosTramiteService {
  constructor(
    @InjectRepository(UsuariosTramite)
    private readonly usuariosTramiteRepository: Repository<UsuariosTramite>
  ){}

  //NUEVO
  async create(data: CreateUsuariosTramiteDto): Promise<UsuariosTramite> {
    //comprobar existencia de este usuario asignado
    const existe = await this.usuariosTramiteRepository.findOne(
      {
        where:{
          tramite_numero: data.tramite_numero,
          usuario_id: data.usuario_id,
          activo: true
        }
      }
    );
    if(existe) throw new BadRequestException ("Este usuario ya está asignado a este tramite.");
    
    //actualizar a activo=falso a los registros con funcion mediador  cuando se asigna un mediador (solo puede haber 1)
    if( data.funcion_tramite_id === 2 ){
      try{
        const respuesta = await this.usuariosTramiteRepository.createQueryBuilder('usuario_tramite')
        .update('usuario_tramite')
        .set({activo: false})
        .where('tramite_numero = :tramite_numero',{tramite_numero: data.tramite_numero})
        .andWhere('funcion_tramite_id = :funcion_tramite_id', {funcion_tramite_id: 2})
        .execute();
      }
      catch (error){
        this.handleDBErrors(error);
      }
    }
    
    //crear el nuevo usuario para el tramite
    try {
      const nuevo = this.usuariosTramiteRepository.create(data);
      return await this.usuariosTramiteRepository.save(nuevo);
    } catch (error) {
          
      this.handleDBErrors(error);
    }       
  }  
  //FIN NUEVO......................................................

  //DESHABILITAR USUARIO
  async deshabilitarUsuario(id_usuario_tramitex: number) {
    const usuarioTramite = await this.findOne(id_usuario_tramitex);
    if( usuarioTramite.funcion_tramite_id == 2 ){
        throw new BadRequestException("No puede deshabilitar un usuario con función de mediador")
    }
    try{
      const respuesta = await this.usuariosTramiteRepository.createQueryBuilder('usuario_tramite')
      .update('usuario_tramite')
      .set({activo: false})
      .where('id_usuario_tramite = :id_usuario_tramite',{id_usuario_tramite: id_usuario_tramitex})
      .execute();
      
      if((respuesta).affected == 0) {
        await this.findOne(id_usuario_tramitex);
      }

      return respuesta;
    }
    catch(error){
      this.handleDBErrors(error);
    }
  }
  //FIN DESHABILITAR USUARIO................

  //BUSCAR  XID
  async findTramitesXUsuario(id_usuario: number) {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    const respuesta = await this.usuariosTramiteRepository.findAndCount(
      {
        where: {          
          usuario_id: id_usuario,
          activo: true
        }   
      }
    );
    
    if (!respuesta) throw new NotFoundException("No se encontró el tramites para este usuario.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  //BUSCAR TRAMITES X CIUDADANO
  async findTramitesXCiudadano(id_ciudadano:number){
    const tramites = await this.usuariosTramiteRepository.createQueryBuilder('usuario_tramite')
    .leftJoinAndSelect('usuario_tramite.tramite', 'tramite')    
    .leftJoinAndSelect('tramite.ciudadano', 'ciudadano')  
    .leftJoinAndSelect('tramite.objeto', 'objeto')  
    .leftJoinAndSelect('usuario_tramite.usuario', 'usuario')
    .leftJoinAndSelect('usuario_tramite.funcion_tramite', 'funcion_tramite')
    .where('tramite.ciudadano_id = :id', { id: id_ciudadano })
    .getManyAndCount();

    return tramites;
  }

  //FIN BUSCAR TRAMITES X CIUDADANO


  //BUSCAR  TRAMITES ASIGNADOS ACTIVOS
  async findTramitesActivos() {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    const respuesta = await this.usuariosTramiteRepository.findAndCount(
      {
        //relations: ['usuario','centro_mediacion'],
        where: {
          activo: true,
        }                
      }
    );
    if (!respuesta) throw new NotFoundException("No se encontró el tramites para este usuario.");
    return respuesta;
  }
  //FIN BUSCAR  TRAMITES ASIGNADOS ACTIVOS..................................................................

  //BUSCAR  XNUMTRAMITE
  async findByNumTramiteActivo(num_tramite: number) {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    const respuesta = await this.usuariosTramiteRepository.findAndCount(
      {
        //relations: ['tramite'],
        where: {          
          tramite_numero: num_tramite,
          activo: true
        }      
          
      }
    );
    
    if (!respuesta) throw new NotFoundException("No se encontró el registro con este numero de tramite.");
    return respuesta;
  }
  //FIN BUSCAR  XNUMTRAMITE..................................................................

  //BUSCAR MEDIADOR  XNUMTRAMITE
  async findMediadorByNumTramiteActivo(num_tramite: number) {    
    const respuesta = await this.usuariosTramiteRepository.findOne(
      {
        //relations: ['tramite'],
        where: {          
          tramite_numero: num_tramite,
          funcion_tramite_id: 2,
          activo: true
        }      
          
      }
    );
    
    if (!respuesta) throw new NotFoundException("No se encontró el registro con este numero de tramite.");
    return respuesta;
  }
  //FIN BUSCAR MEDIADOR XNUMTRAMITE..................................................................
  
  async findAll() {
    return await this.usuariosTramiteRepository.findAndCount(
      {
        //relations: ['usuario','centro_mediacion'],
        where:{
          activo: true
        },
        order:{
            id_usuario_tramite: "ASC"
        }
      }
    );
  }

  
  //BUSCAR  XID
  async findOne(id: number) {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    const respuesta = await this.usuariosTramiteRepository.findOne(
      {
        //relations: ['usuario','centro_mediacion'],
        where: {
          id_usuario_tramite: id,
        }      
          
      }
    );
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................  

  //MODIFICAR
  async update(id: number, data: UpdateUsuariosTramiteDto) {
    try{
      const respuesta = await this.usuariosTramiteRepository.update({id_usuario_tramite: id}, data);
      if((respuesta).affected == 0) {
        await this.findOne(id);
      }

      return respuesta;
    }
    catch(error){
      this.handleDBErrors(error);
    }
  }
  //FIN MODIFICAR................

  async remove(id: number) {
    const respuesta = await this.usuariosTramiteRepository.findOneBy({id_usuario_tramite: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de usuario-tramite que intenta eliminar");
    return await this.usuariosTramiteRepository.remove(respuesta);
  }



  //MANEJO DE ERRORES
  private handleDBErrors(error: any): never {
    if(error.code === "ER_DUP_ENTRY"){
      throw new BadRequestException (error.sqlMessage);
    }
    
    if(error.status == 404) throw new NotFoundException(error.response);
  
    throw new InternalServerErrorException (error.message);
    }
    //FIN MANEJO DE ERRORES........................................
}
