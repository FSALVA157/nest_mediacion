import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUsuarioCentroDto } from './dto/create-usuario-centro.dto';
import { UpdateUsuarioCentroDto } from './dto/update-usuario-centro.dto';
import { Repository } from 'typeorm';
import { UsuarioCentro } from './entities/usuario-centro.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsuariosCentrosService {
  constructor(
    @InjectRepository(UsuarioCentro)
    private readonly usuariosCentroRepository: Repository<UsuarioCentro>
  ){}

  //NUEVO USUARIO-CENRO
  async create(data: CreateUsuarioCentroDto): Promise<UsuarioCentro> {
    const existe = await this.usuariosCentroRepository.findOne(
      {
        where:{
          usuario_id: data.usuario_id,
          centro_mediacion_id: data.centro_mediacion_id,
          activo: true
        }
      }
    );
    
    if(existe) throw new BadRequestException ("Este usuario ya se encuentra asignado a este centro de mediación");
    
    try {
      const nuevo = await this.usuariosCentroRepository.create(data);
      return await this.usuariosCentroRepository.save(nuevo);
    } catch (error) {
          
      this.handleDBErrors(error);   
    }       
  }
  //FIN NUEVO USUARIO-CENRO........................................

  //BUSCAR TODOS
  async findAll() {
    return await this.usuariosCentroRepository.findAndCount(
      {
        //relations: ['usuario','centro_mediacion'],
        where:{
          activo: true
        },
        order:{
            id_usuario_centro: "ASC"
        }
      }
    );
  }
  //FIN BUSCAR TODOS.................................................

  //BUSCAR  XID
  async findOne(id: number) {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    const respuesta = await this.usuariosCentroRepository.findOne(
      {
        //relations: ['usuario','centro_mediacion'],
        where: {
          id_usuario_centro: id,
        }      
          
      }
    );
    if (!respuesta) throw new NotFoundException("No se encontró el elemento solicitado");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  //BUSCAR  XID CENTRO DE MEDIACION
  async findXCentroMediacion(id_centro: number) {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    const respuesta = await this.usuariosCentroRepository.findAndCount(
      {
        //relations: ['usuario','centro_mediacion'],
        where: {
          centro_mediacion_id: id_centro
        }                
      }
    );
    return respuesta;
  }
  //FIN BUSCAR  XID CENTRO DE MEDIACION..................................................................

  //BUSCAR  XID CENTRO DE MEDIACION
  async findXCentroMediacionXActivo(id_centro: number, activox: boolean) {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    const respuesta = await this.usuariosCentroRepository.findAndCount(
      {
        //relations: ['usuario','centro_mediacion'],
        where: {
          centro_mediacion_id: id_centro,
          activo: activox
        }      
          
      }
    );
    return respuesta;
  }
  //FIN BUSCAR  XID CENTRO DE MEDIACION..................................................................

  //MODIFICAR UNO
  async update(id: number, data: UpdateUsuarioCentroDto) {
    try{
      const respuesta = await this.usuariosCentroRepository.update({id_usuario_centro: id}, data);
      if((respuesta).affected == 0) {
        await this.findOne(id);
      }
      
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error);
    }
  }
  //FIN MODIFICAR UNO....................................................
  
  
  async remove(id: number) {
    const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de usuario-centro que intenta eliminar");
    return await this.usuariosCentroRepository.remove(respuesta);
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
