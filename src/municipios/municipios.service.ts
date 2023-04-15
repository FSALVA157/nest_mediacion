import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMunicipioDto } from './dto/create-municipio.dto';
import { UpdateMunicipioDto } from './dto/update-municipio.dto';
import { Repository } from 'typeorm';
import { Municipio } from './entities/municipio.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MunicipiosService {

  constructor(
    @InjectRepository(Municipio)
    private readonly municipiosRepository: Repository<Municipio>
  ){}

  
  async create(data: CreateMunicipioDto): Promise<Municipio> {

    try {      
      const nuevo = await this.municipiosRepository.create(data);
      return await this.municipiosRepository.save(nuevo);

    }catch (error) {

     this.handleDBErrors(error); 
    } 
  }

  async findAll() {
    return await this.municipiosRepository.findAndCount(
      {
          order:{
              municipio: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.municipiosRepository.findOneBy({id_municipio: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateMunicipioDto) {

    try{
      const respuesta = await this.municipiosRepository.update(id, data);
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
    const respuesta = await this.municipiosRepository.findOneBy({id_municipio: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de municipio que intenta eliminar");
    return await this.municipiosRepository.remove(respuesta);
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
