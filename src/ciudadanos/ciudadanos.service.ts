import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCiudadanoDto } from './dto/create-ciudadano.dto';
import { UpdateCiudadanoDto } from './dto/update-ciudadano.dto';
import { Ciudadano } from './entities/ciudadano.entity';
import * as bcrypt from 'bcrypt';
import { UpdateCiudadanoPassDto } from './dto/update-ciudadano-pass.dto';

@Injectable()
export class CiudadanosService {
  constructor(
    @InjectRepository(Ciudadano)
    private readonly ciudadanoRepository: Repository<Ciudadano>
  ){}

  //CREAR CIUDADANO
  async create(data: CreateCiudadanoDto): Promise<Ciudadano> {      

    try {
      const {clave, ...ciudadanoData} = data;
      const nuevo: Ciudadano = await this.ciudadanoRepository.create({
        ...ciudadanoData,
        clave: bcrypt.hashSync(clave,10)
      });
      return await this.ciudadanoRepository.save(nuevo);

    } catch (error) {      

      if(error.code=='ER_DUP_ENTRY'){
        let existe = await this.ciudadanoRepository.findOneBy({email: data.email});
        if(existe) throw new BadRequestException ("El email ya existe.");
      
        existe = null;
        existe = await this.ciudadanoRepository.findOneBy({dni: data.dni});
        if(existe) throw new BadRequestException ("El dni ya existe.");
      }   

      throw new InternalServerErrorException('Error al crear el ciudadano: ' + error.message);
    }
  }
  //FIN CREAR CIUDADANO......................................................

  //BUSCAR TODOS LOS CIUDADANOS
  async findAll() {

    return await this.ciudadanoRepository.findAndCount(
      {
        order:{
            apellido: "ASC"
        }
      }
    );
  }
  //FIN BUSCAR TODOS LOS CIUDADANOS....................................

  //BUSCAR  XDni
  async findXDni(dnix: number) {
    
    const respuesta = await this.ciudadanoRepository.findOneBy({dni: dnix});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XDni..................................................................

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.ciudadanoRepository.findOneBy({id_ciudadano: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.", "verificque el id del ciudadano");

    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  //MODIFICAR CIUDADANO
  async update(idx: number, data: UpdateCiudadanoDto) {

    try{
      const respuesta = await this.ciudadanoRepository.update(idx, data);
      if(( await respuesta).affected == 0){
        await this.findOne(idx);
      } 
      
      return respuesta;
    }
    catch(error){
      
      if(error.code=='ER_DUP_ENTRY'){
        let existe = await this.ciudadanoRepository.findOneBy({dni: data.dni});
        if(existe) throw new BadRequestException ("El dni ya existe.");       
      
        existe = null;
        existe = await this.ciudadanoRepository.findOneBy({email: data.email});
        if(existe) throw new BadRequestException ("El email ya existe.");
      }   

      if(error.status == 404) throw new NotFoundException(error.message);
      
      throw new InternalServerErrorException('Error al modificar: ' + error.message);

    }
  }
  //FIN MODIFICAR CIUDADANO.......................................

  //MODIFICAR PASSWORD
  async updatePassword(idx: number, data: UpdateCiudadanoPassDto) {
    const clavex: string = bcrypt.hashSync(data.clave, 10);
    data.clave = clavex;
    try{
      const respuesta = await this.ciudadanoRepository.update(idx, data);
      if(( await respuesta).affected == 0){
        await this.findOne(idx);        
      } 
      
      return respuesta;
    }
    catch(error){
      this.handleDBErrors(error);

    }
  }
  //FIN MODIFICAR PASSWORD.......................................

  //ELIMINAR CIUDADANO
  async remove(dnix: number) {
    
    const respuesta = await this.ciudadanoRepository.findOneBy({dni: dnix});
    if(!respuesta) throw new NotFoundException("No existe el registro de ciudadano que intenta eliminar");
    return await this.ciudadanoRepository.remove(respuesta);
  }
  //FIN ELIMINAR CIUDADANO..........................................

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
