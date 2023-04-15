import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateObjetoDto } from './dto/create-objeto.dto';
import { UpdateObjetoDto } from './dto/update-objeto.dto';
import { Objeto } from './entities/objeto.entity';

@Injectable()
export class ObjetosService {
  constructor(
    @InjectRepository(Objeto)
    private readonly objetoRepository: Repository<Objeto>
  ){}

  async create(data: CreateObjetoDto): Promise<Objeto> {

    try {
      
      const nuevo = await this.objetoRepository.create(data);
      return await this.objetoRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);   
    }      
  }

  async findAll() {
    return await this.objetoRepository.findAndCount(
      {
          order:{
              objeto: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.objetoRepository.findOneBy({id_objeto: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateObjetoDto) {

    try{
      const respuesta = await this.objetoRepository.update(id, data);
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
    const respuesta = await this.objetoRepository.findOneBy({id_objeto: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de objeto que intenta eliminar");
    return await this.objetoRepository.remove(respuesta);
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
