import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudadano } from 'src/ciudadanos/entities/ciudadano.entity';
import databaseConfig from 'src/config/database.config';
import { Repository } from 'typeorm';
import { CreateTramiteDto } from './dto/create-tramite.dto';
import { UpdateTramiteDto } from './dto/update-tramite.dto';
import { Tramite } from './entities/tramite.entity';

@Injectable()
export class TramitesService {

  constructor(
    @InjectRepository(Tramite)
    private readonly tramiteRepository: Repository<Tramite>,
    @InjectRepository(Ciudadano)
    private readonly ciudadanoRepository: Repository<Ciudadano>,
  ){}

  //NUEVO TRAMITE
  async create(data: CreateTramiteDto): Promise<Tramite> {
    let num_tramite_nuevo:number = 0;
    
    //obtener año actual   
    let anio:number= new Date().getFullYear(); 

    //Control de existencia del ciudadano
    const ciudadano_existe = await this.ciudadanoRepository.findOneBy({ id_ciudadano: data.ciudadano_id});
    if(!ciudadano_existe) throw new BadRequestException ("El ciudadano que intenta crear el tramite no existe.")
    //FIN Control de existencia del ciudadano

    //obtener numero de tramite maximo
    const num_tramite_max = await this.tramiteRepository.createQueryBuilder('tramites')
      .select('MAX(tramites.numero_tramite)','num_max')
      .getRawOne();
    
    if(!num_tramite_max) {
      num_tramite_max.num_max = 0;
    }      
    num_tramite_nuevo = num_tramite_max.num_max + 1;

    //cargar datos por defecto
    data.numero_tramite = num_tramite_nuevo;
    
    //guardar tramite
    const nuevo = await this.tramiteRepository.create(data);
    try {
      return await this.tramiteRepository.save(nuevo);
    } catch (error) {
      if(error.code=='ER_DUP_ENTRY'){
        const existe = await this.tramiteRepository.findOneBy({numero_tramite: data.numero_tramite});
        if(existe) throw new BadRequestException ("Error al generar el número de tramite. Intente guardar nuevamente");
      }      
      
      this.handleDBErrors(error); 
    }    
  }
  //FIN NUEVO TRAMITE..................................................................

  //TODOS LOS TRAMITES
  async findAll() {
    return await this.tramiteRepository.findAndCount(
      {
          order:{
              numero_tramite: "DESC"
          }
      }
    );
  }
  //FIN TODOS LOS TRAMITES..............................

  //BUSCAR TRAMITES X CIUDADANO X ESTADO --- 1 NUEVO - 2 CON MEDIADOR - 3 FINALIZADO 
  async findXCiudadano(id_ciudadano: number) {
    const tramites = await this.tramiteRepository.findAndCount(
      {        
        where: {
          ciudadano_id: id_ciudadano
        },
        order:{
          numero_tramite: "DESC"
        }
      }
    );   

    return tramites;
  }
  //FIN BUSCAR TRAMITES NUEVOS..........................................

  //BUSCAR TRAMITES X ESTADO --- 1 NUEVO - 2 CON MEDIADOR - 3 FINALIZADO 
  async findxestado(id_estado: number) {
    const tramites = await this.tramiteRepository.findAndCount(
      {        
        where: {
          estado_tramite_id: id_estado
        },
        order:{
          numero_tramite: "DESC"
        }
      }
    );   

    return tramites;
  }
  //FIN BUSCAR TRAMITES NUEVOS..........................................

  //BUSCAR TRAMITES X CIUDADANO X ESTADO --- 1 NUEVO - 2 CON MEDIADOR - 3 FINALIZADO 
  async findXCiudadanoXEstado(id_estado: number, id_ciudadano: number) {
    const tramites = await this.tramiteRepository.findAndCount(
      {        
        where: {
          estado_tramite_id: id_estado,
          ciudadano_id: id_ciudadano
        },
        order:{
          numero_tramite: "DESC"
        }
      }
    );   

    return tramites;
  }
  //FIN BUSCAR TRAMITES NUEVOS..........................................

  //CONTAR TRAMITES X ESTADO --- 1 NUEVO - 2 CON MEDIADOR - 3 FINALIZADO 
  async contarTramitesXEstado(id_estado: number) {
    const tramites = await this.tramiteRepository.count(
      {        
        where: {
          estado_tramite_id: id_estado
        }
      }
    );   

    return tramites;
  }
  //FIN BUSCAR TRAMITES NUEVOS..........................................

  //BUSCAR TRAMITES ASIGNADOS Usuario - (2 CON MEDIADOR) -  
  async findAsignadosConDatos() {
    const tramites = await this.tramiteRepository.findAndCount(
      {
        relations: ['asignaciones'], 
        where: {
          estado_tramite_id: 2,
          
        }
      }
    );   

    return tramites;
  }
  //FIN BUSCAR TRAMITES NUEVOS..........................................
  

  //BUSCAR  Xnumero tramite
  async findXNumeroTramite(numero_tramitex: number) {

    const respuesta = await this.tramiteRepository.find(
      {
        relations: ['asignaciones'],
        where: {
          numero_tramite: numero_tramitex
        }
      }
    );
    if (!respuesta) throw new NotFoundException("No se encontró el registro de tramite solicitado.");
    return respuesta;
    
    
  }
  //FIN BUSCAR  XDni..................................................................

  //BUSCAR  XID
  // async findOne(id: number) {

  //   const respuesta = await this.tramiteRepository.findOneBy({id_tramite: id});
  //   if (!respuesta) throw new NotFoundException("No se encontró el registro de tramite solicitado.");
  //   return respuesta;
  // }
  // //FIN BUSCAR  XID..................................................................

  async update(num_tramitex: number, data: UpdateTramiteDto) {
    try{
      const respuesta = await this.tramiteRepository.update({numero_tramite: num_tramitex}, data);
      if((respuesta).affected == 0) throw new NotFoundException("No se modificó el tramite.");
      return respuesta;
    }
    catch(error){
      throw new NotFoundException('Error al modificar el tramite: ',error.message);
    }
  }

  async cambiarEstadoTramite(num_tramitex: number, id_estado_tramite:number) {
    try{
      let data: UpdateTramiteDto = new UpdateTramiteDto;
      data.estado_tramite_id=id_estado_tramite;
      const respuesta = await this.tramiteRepository.update({numero_tramite: num_tramitex}, data);
      if((respuesta).affected == 0) throw new NotFoundException("No se modificó el tramite.");
      return respuesta;
    }
    catch(error){
      throw new NotFoundException('Error al modificar el tramite: ',error.message);
    }
  }

  async remove(num_tramitex: number) {
    const respuesta = await this.tramiteRepository.findOneBy({numero_tramite: num_tramitex});
    if(!respuesta) throw new NotFoundException("No existe el registro de tramite que intenta eliminar");
    return await this.tramiteRepository.remove(respuesta);
  }



  //MANEJO DE ERRORES
  private handleDBErrors(error: any): never {
    if(error.code === "ER_DUP_ENTRY"){
      throw new BadRequestException (error.sqlMessage);
    }

    if(error.code === "ER_NO_REFERENCED_ROW_2"){
      throw new BadRequestException (error.sqlMessage);
    } 
    
    if(error.status == 404) throw new NotFoundException(error.response);
  
    throw new InternalServerErrorException (error.message);
    }
    //FIN MANEJO DE ERRORES........................................
}
