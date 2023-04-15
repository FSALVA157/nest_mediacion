import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCentroMediacionDto } from './dto/create-centro-mediacion.dto';
import { UpdateCentroMediacionDto } from './dto/update-centro-mediacion.dto';
import { Repository } from 'typeorm';
import { CentroMediacion } from './entities/centro-mediacion.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CentrosMediacionService {
  constructor(
    @InjectRepository(CentroMediacion)
    private readonly centrosMediacionRepository: Repository<CentroMediacion>
  ){}

  async create(data: CreateCentroMediacionDto): Promise<CentroMediacion> {
    const nuevo = await this.centrosMediacionRepository.create(data);
    try {
      return await this.centrosMediacionRepository.save(nuevo);
    } catch (error) {
      if(error.code=='ER_DUP_ENTRY'){
        let existe = await this.centrosMediacionRepository.findOneBy({email: data.email});
        if(existe) throw new BadRequestException ("El email que se intentó crear ya existe.");
      
        existe = null;
        existe = await this.centrosMediacionRepository.findOneBy({centro_mediacion: data.centro_mediacion});
        if(existe) throw new BadRequestException ("El centro de mediación que intentó crear ya existe.");
      } 

      throw new InternalServerErrorException('Error al crear el centro de mediación: ',error.message);  
    }         
  }

  //BUSCAR  XDEPARTAMENTO
  async findByDepartamento(id_departamento: number) {

    const respuesta = await this.centrosMediacionRepository.findAndCount(
      {
        where: {departamento_id: id_departamento},
        order: {centro_mediacion: "ASC"}
      }
    );
    if (!respuesta) throw new NotFoundException("El registro solicitado no existe.");

    return respuesta;
  }
  //FIN BUSCAR  XDEPARTAMENTO..................................................................

  async findAll() {
    return await this.centrosMediacionRepository.findAndCount(
      {
          order:{
              centro_mediacion: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.centrosMediacionRepository.findOneBy({id_centro_mediacion: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");

    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateCentroMediacionDto) {    
    try{
      const respuesta = await this.centrosMediacionRepository.update({id_centro_mediacion: id}, data);
      if((await respuesta).affected == 0){
        await this.findOne(id); //si no lo encuentra salta como error en catch

      } 
      return respuesta;
    }
    catch(error){
      if(error.code=='ER_DUP_ENTRY'){
        let existe = await this.centrosMediacionRepository.findOneBy({email: data.email});
        if(existe) throw new BadRequestException ("El email existe.");
      
        existe = null;
        existe = await this.centrosMediacionRepository.findOneBy({centro_mediacion: data.centro_mediacion});
        if(existe) throw new BadRequestException ("El centro de mediación ya existe.");
      }   

      if(error.status == 404) throw new NotFoundException(error.message);
      
      throw new InternalServerErrorException('Error al modificar: ' + error.message);
    }    
  }

  async remove(id: number) {
    const respuesta = await this.centrosMediacionRepository.findOneBy({id_centro_mediacion: id});
    if(!respuesta) throw new NotFoundException("No existe el centro de mediación que intenta eliminar");
    return await this.centrosMediacionRepository.remove(respuesta);
  }
}
