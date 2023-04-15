import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVarianteDto } from './dto/create-variante.dto';
import { UpdateVarianteDto } from './dto/update-variante.dto';
import { Variante } from './entities/variante.entity';

@Injectable()
export class VariantesService {
  constructor(
    @InjectRepository(Variante)
    private readonly varianteRepository: Repository<Variante>
  ){}

  async create(data: CreateVarianteDto): Promise<Variante> {

    try {
      
      const nuevo = await this.varianteRepository.create(data);
      return await this.varianteRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }
  }

  async findAll() {
    return await this.varianteRepository.findAndCount(
      {
          order:{
              variante: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.varianteRepository.findOneBy({id_variante: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateVarianteDto) {

    try{
      const respuesta = await this.varianteRepository.update(id, data);
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
    const respuesta = await this.varianteRepository.findOneBy({id_variante: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de variante que intenta eliminar");
    return await this.varianteRepository.remove(respuesta);
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
