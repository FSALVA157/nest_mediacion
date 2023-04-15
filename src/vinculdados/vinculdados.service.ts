import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVinculdadoDto } from './dto/create-vinculdado.dto';
import { UpdateVinculdadoDto } from './dto/update-vinculdado.dto';
import { Vinculdado } from './entities/vinculdado.entity';
import { Tramite } from '../tramites/entities/tramite.entity';

@Injectable()
export class VinculdadosService {
  constructor(
    @InjectRepository(Vinculdado)
    private readonly vinculadosRepository: Repository<Vinculdado>,
    @InjectRepository(Tramite)
    private readonly tramitesRepository: Repository<Tramite>
  ){}

  //NUEVO VINCULADO
  async create(data: Partial<Vinculdado>): Promise<Vinculdado> {
    try {
      const nuevo = this.vinculadosRepository.create(data);
      return await this.vinculadosRepository.save(nuevo);
    }catch (error) {
      if(error.code === "ER_NO_REFERENCED_ROW_2"){
        //Control de existencia del tramite
        const tramite_existe = await this.tramitesRepository.findOneBy({ numero_tramite: data.tramite_numero});
        if(!tramite_existe) throw new BadRequestException ("El numero de tramite ingresado no existe.")
        //FIN Control de existencia del tramite        
      }

      this.handleDBErrors(error); 
    }      
  }
  //FIN NUEVO VINCULADO

  async findAll() {
    return await this.vinculadosRepository.findAndCount(
      {
          order:{
              apellido: "ASC"
          }
      }
    );
  }

  //BUSCAR  XTramite
  async findXTramite(numTramite: number) {
    const respuesta = await this.vinculadosRepository.findAndCount(
      {
        where: {
          tramite_numero: numTramite,
        }     
      }
    );    

    return respuesta;
  }
  //FIN BUSCAR  XTramite..................................................................

  //BUSCAR  XDni
  async findXDni(dnix: number) {

    const respuesta = await this.vinculadosRepository.findOneBy({dni: dnix});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe");
    return respuesta;
  }
  //FIN BUSCAR  XDni..................................................................

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.vinculadosRepository.findOneBy({id_vinculado: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateVinculdadoDto) {
    try{
      const respuesta = await this.vinculadosRepository.update({id_vinculado: id}, data);
      if((respuesta).affected == 0){
        await this.findOne(id);
      }
      return respuesta;
    }
    catch(error){
      this.handleDBErrors(error); 
    }
  }

  async remove(id: number) {
    const respuesta = await this.vinculadosRepository.findOneBy({id_vinculado: id});
    if(!respuesta) throw new NotFoundException("No existe el registro del vinculado que intenta eliminar");
    return await this.vinculadosRepository.remove(respuesta);
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
