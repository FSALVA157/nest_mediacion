import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { Departamento } from './entities/departamento.entity';

@Injectable()
export class DepartamentosService {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>
  ){}

  async create(data: CreateDepartamentoDto): Promise<Departamento> {
    
    try {
      const nuevo = await this.departamentoRepository.create(data);
      return await this.departamentoRepository.save(nuevo);
    } catch (error) {

      this.handleDBErrors(error); 
    }
    
  }

  async findAll() {
    return await this.departamentoRepository.findAndCount(
      {
          order:{
              departamento: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.departamentoRepository.findOneBy({id_departamento: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe");
    return respuesta;

  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateDepartamentoDto) {
    try{
      const respuesta = await this.departamentoRepository.update(id, data);
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
    const respuesta = await this.departamentoRepository.findOneBy({id_departamento: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de departamento que intenta eliminar");
    return await this.departamentoRepository.remove(respuesta);
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

