import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFuncionTramiteDto } from './dto/create-funcion-tramite.dto';
import { UpdateFuncionTramiteDto } from './dto/update-funcion-tramite.dto';
import { FuncionTramite } from './entities/funcion-tramite.entity';

@Injectable()
export class FuncionTramiteService {
  constructor(
    @InjectRepository(FuncionTramite)
    private readonly funcionTramiteRepository: Repository<FuncionTramite>
  ){}

  async create(data: CreateFuncionTramiteDto): Promise<FuncionTramite> {

    try {
      const nuevo = await this.funcionTramiteRepository.create(data);
      return await this.funcionTramiteRepository.save(nuevo);
    } catch (error) {

      this.handleDBErrors(error); 
    }  
  }

  async findAll() {
    return await this.funcionTramiteRepository.findAndCount(
      {
          order:{
              funcion_tramite: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.funcionTramiteRepository.findOneBy({id_funcion_tramite: id});
    if (!respuesta) throw new NotFoundException("El registro solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateFuncionTramiteDto) {

    try{
      const respuesta = await this.funcionTramiteRepository.update(id, data);
      if((await respuesta).affected == 0){
        await this.findOne(id);
      } 
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }    
  }

  async remove(id: number) {
    const respuesta = await this.funcionTramiteRepository.findOneBy({id_funcion_tramite: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de funcion-tramite que intenta eliminar");
    return await this.funcionTramiteRepository.remove(respuesta);
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
