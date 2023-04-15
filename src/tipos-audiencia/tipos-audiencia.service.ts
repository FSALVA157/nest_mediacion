import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipoAudienciaDto } from './dto/create-tipo-audiencia.dto';
import { UpdateTipoAudienciaDto } from './dto/update-tipo-audiencia.dto';
import { TipoAudiencia } from './entities/tipos-audiencia.entity';

@Injectable()
export class TiposAudienciaService {
  constructor(
    @InjectRepository(TipoAudiencia)
    private readonly tipoAudienciaRepository: Repository<TipoAudiencia>
  ){}

  async create(data: CreateTipoAudienciaDto): Promise<TipoAudiencia> {

    try {
      
      const nuevo = await this.tipoAudienciaRepository.create(data);
      return await this.tipoAudienciaRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);   
    }      
  }

  async findAll() {
    return await this.tipoAudienciaRepository.findAndCount(
      {
          order:{
              tipo_audiencia: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.tipoAudienciaRepository.findOneBy({id_tipo_audiencia: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateTipoAudienciaDto) {

    try{
      const respuesta = await this.tipoAudienciaRepository.update(id, data);
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
    const respuesta = await this.tipoAudienciaRepository.findOneBy({id_tipo_audiencia: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de tipo-audiencia que intenta eliminar");
    return await this.tipoAudienciaRepository.remove(respuesta);
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
