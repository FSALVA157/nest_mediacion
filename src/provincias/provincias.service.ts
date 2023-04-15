import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProvinciaDto } from './dto/create-provincia.dto';
import { UpdateProvinciaDto } from './dto/update-provincia.dto';
import { Repository } from 'typeorm';
import { Provincia } from './entities/provincia.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProvinciasService {
  constructor(
    @InjectRepository(Provincia)
    private readonly provinciasRepository: Repository<Provincia>
  ){}

  async create(data: CreateProvinciaDto): Promise<Provincia> {

    try {
      
      const nuevo = await this.provinciasRepository.create(data);
      return await this.provinciasRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);   
    }
  }

  async findAll() {
    return await this.provinciasRepository.findAndCount(
      {
          order:{
              provincia: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.provinciasRepository.findOneBy({id_provincia: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateProvinciaDto) {

    try{
      const respuesta = await this.provinciasRepository.update(id, data);
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
    const respuesta = await this.provinciasRepository.findOneBy({id_provincia: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de provincia que intenta eliminar");
    return await this.provinciasRepository.remove(respuesta);
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
