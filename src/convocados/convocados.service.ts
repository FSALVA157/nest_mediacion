import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tramite } from 'src/tramites/entities/tramite.entity';
import { Repository } from 'typeorm';
import { UpdateConvocadoDto } from './dto/update-convocado.dto';
import { Convocado } from './entities/convocado.entity';
import { CreateConvocadoSaltaDto } from './dto/create-convocado-salta.dto';
import { CreateConvocadoNoSaltaDto } from './dto/create-convocado-nosalta.dto';

@Injectable()
export class ConvocadosService {

  constructor(
    @InjectRepository(Convocado)
    private readonly convocadosRepository: Repository<Convocado>,
    @InjectRepository(Tramite)
    private readonly tramitesRepository: Repository<Tramite>
  ){}
  
   //NUEVO CONVOCADO SALTA
   async createConvocados(data: Convocado[]): Promise<Convocado[]> {
    try {
      const nuevo = this.convocadosRepository.create(data);      
      return await this.convocadosRepository.save(nuevo);
    }catch (error) {
      
      this.handleDBErrors(error); 
    }      
  }
  //FIN NUEVO CONVOCADO SALTA

  //NUEVO CONVOCADO SALTA
  async createSalta(data: CreateConvocadoSaltaDto[]): Promise<CreateConvocadoSaltaDto[]> {
    try {
      const nuevo = this.convocadosRepository.create(data);
      
      return await this.convocadosRepository.save(nuevo);
    }catch (error) {
      
      this.handleDBErrors(error); 
    }      
  }
  //FIN NUEVO CONVOCADO SALTA

  //NUEVO CONVOCADO NO SALTA
  async createNoSalta(data: CreateConvocadoNoSaltaDto[]): Promise<CreateConvocadoNoSaltaDto[]> {
    try {
      const nuevo = this.convocadosRepository.create(data);
      return await this.convocadosRepository.save(nuevo);
    }catch (error) {
      if(error.code === "ER_NO_REFERENCED_ROW_2"){
        //Control de existencia del tramite
        // const tramite_existe = await this.tramitesRepository.findOneBy({ numero_tramite: data.tramite_numero});
        // if(!tramite_existe) throw new BadRequestException ("El numero de tramite ingresado no existe.")
        //FIN Control de existencia del tramite        
      }

      this.handleDBErrors(error); 
    }      
  }
  //FIN NUEVO CONVOCADO NO SALTA

  async findAll() {
    return await this.convocadosRepository.findAndCount(
      {
        order:{
            apellido: "ASC"
        }
      }
    );
  }

  //BUSCAR  XTramite
  async findXTramite(numTramite: number) {
    const respuesta = await this.convocadosRepository.findAndCount(
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

    const respuesta = await this.convocadosRepository.findOneBy({dni: dnix});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe");
    return respuesta;
  }
  //FIN BUSCAR  XDni..................................................................

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.convocadosRepository.findOneBy({id_convocado: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateConvocadoDto) {
    try{
      const respuesta = await this.convocadosRepository.update({id_convocado: id}, data);
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
    const respuesta = await this.convocadosRepository.findOneBy({id_convocado: id});
    if(!respuesta) throw new NotFoundException("No existe el registro del convocado que intenta eliminar");
    return await this.convocadosRepository.remove(respuesta);
  }

  async removeByTramite(numTramite: number) {
    
    return await this.convocadosRepository.delete({tramite_numero: numTramite})
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
