import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
        if(existe) throw new BadRequestException ("El email que se intentó crear ya existe. Intente guardar nuevamente");
      
        existe = null;
        existe = await this.centrosMediacionRepository.findOneBy({centro_mediacion: data.centro_mediacion});
        if(existe) throw new BadRequestException ("El centro de mediación que intentó crear ya existe.");
      } 

      throw new NotFoundException('Error al crear el nuevo usuario: ',error.message);  
    }       
  }

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
    if (!respuesta) throw new NotFoundException("No se encontró el registro de centro de mediación solicitadolicitado.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateCentroMediacionDto) {
    try{
      const respuesta = await this.centrosMediacionRepository.update({id_centro_mediacion: id}, data);
      if((respuesta).affected == 0) throw new NotFoundException("No se modificó el registro del centro de mediación.");
      return respuesta;
    }
    catch(error){
      throw new NotFoundException('Error al modificar el centro de mediación: ',error.message);
    }
  }

  async remove(id: number) {
    const respuesta = await this.centrosMediacionRepository.findOneBy({id_centro_mediacion: id});
    if(!respuesta) throw new NotFoundException("No existe el centro de mediación que intenta eliminar");
    return await this.centrosMediacionRepository.remove(respuesta);
  }
}
