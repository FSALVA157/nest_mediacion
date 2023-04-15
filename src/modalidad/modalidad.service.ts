import { BadRequestException, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateModalidadDto } from './dto/create-modalidad.dto';
import { UpdateModalidadDto } from './dto/update-modalidad.dto';
import { Modalidad } from './entities/modalidad.entity';

@Injectable()
export class ModalidadService {
  constructor(
    @InjectRepository(Modalidad)
    private readonly modalidadRepository: Repository<Modalidad>
  ){}

  async create(data: CreateModalidadDto): Promise<Modalidad> {

    try{
      const nuevo = await this.modalidadRepository.create(data);      
      return await this.modalidadRepository.save(nuevo);

    }catch (error) {
      
      this.handleDBErrors(error); 
    }
  }

  async findAll() {
    return await this.modalidadRepository.findAndCount(
      {
          order:{
              modalidad: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.modalidadRepository.findOneBy({id_modalidad: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateModalidadDto) {

    try{
      const respuesta = await this.modalidadRepository.update(id, data);
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
    const respuesta = await this.modalidadRepository.findOneBy({id_modalidad: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de modalidad que intenta eliminar");
    return await this.modalidadRepository.remove(respuesta);
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
