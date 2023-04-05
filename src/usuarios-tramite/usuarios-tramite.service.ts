import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async create(data: CreateUsuariosTramiteDto): Promise<UsuariosTramite> {
    const existe = await this.usuariosTramiteRepository.findOne(
      {
        where:{
          //usuario_id: data.usuario_id,
          tramite_numero: data.tramite_numero,
          funcion_tramite_id: data.funcion_tramite_id,
          activo: true
        }
      }
    );
    if(existe) throw new BadRequestException ("Este tramite tiene un usuario asignado con esta funcion.");
    
    const nuevo = await this.usuariosTramiteRepository.create(data);
    try {
      return await this.usuariosTramiteRepository.save(nuevo);
    } catch (error) {
          
      throw new NotFoundException('Error al asignar el usuario a un trmite: ',error.message);  
    }       
  }

  

  //BUSCAR  XID
  async findTramitesXUsuario(id_usuario: number) {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    const respuesta = await this.usuariosTramiteRepository.findAndCount(
      {
        //relations: ['tramite'],
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
  async findTramitesXCiudadano(id_ciudadano){

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

  //BUSCAR  XID
  async findByNumTramiteActivo(num_tramite: number) {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    const respuesta = await this.usuariosTramiteRepository.findOne(
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
  //FIN BUSCAR  XID..................................................................
  
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
    if (!respuesta) throw new NotFoundException("No se encontró el registro de usuario-tramite.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateUsuariosTramiteDto) {
    try{
      const respuesta = await this.usuariosTramiteRepository.update({id_usuario_tramite: id}, data);
      if((respuesta).affected == 0) throw new NotFoundException("No se modificó el registro de usuario-tramite.");
      return respuesta;
    }
    catch(error){
      throw new NotFoundException('Error al modificar el usuario-tramite: ',error.message);
    }
  }

  async remove(id: number) {
    const respuesta = await this.usuariosTramiteRepository.findOneBy({id_usuario_tramite: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de usuario-tramite que intenta eliminar");
    return await this.usuariosTramiteRepository.remove(respuesta);
  }
}
