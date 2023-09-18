import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateVinculadoDto } from './dto/create-vinculado.dto';
import { UpdateVinculadoDto } from './dto/update-vinculado.dto';
import { Vinculado } from './entities/vinculado.entity';
//import { UpdateVinculdadoDto } from 'src/vinculdados/dto/update-vinculdado.dto';

@Injectable()
export class VinculadosService {
    
  constructor(
    @InjectRepository(Vinculado)
    private readonly vinculadosRepository: Repository<Vinculado>  
  ){}

  //NUEVO VINCULADO
  async createVinculados(data: CreateVinculadoDto[]): Promise<Vinculado[]> {
    try {
      const nuevo = this.vinculadosRepository.create(data);
      return await this.vinculadosRepository.save(nuevo);
    }catch (error) {

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

  async update(id: number, data: UpdateVinculadoDto) {
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

  async removeByTramite(numTramite: number) {
    
    return await this.vinculadosRepository.delete({tramite_numero: numTramite})
  }


  //MANEJO DE ERRORES 
  private handleDBErrors(error: any): never {
    if(error.code === "ER_DUP_ENTRY"){
      throw new BadRequestException (error.sqlMessage);
    }    

    if(error.code === "ER_NO_REFERENCED_ROW_2"){
      throw new BadRequestException (error.sqlMessage);
    } 

    if(error.code === "ER_NO_DEFAULT_FOR_FIELD"){
      throw new BadRequestException ("Debe ingresar el tramite_numero");
    } 

    if(error.status == 404) throw new NotFoundException(error.response);
  
    throw new InternalServerErrorException (error.message);
    }
    //FIN MANEJO DE ERRORES........................................
}
