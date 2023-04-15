import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>
  ){}

  async create(data: CreateCategoriaDto): Promise<Categoria> {    
    
    try {
      const nuevo = await this.categoriaRepository.create(data);
      return await this.categoriaRepository.save(nuevo);

    }catch (error) {

      this.handleDBErrors(error); 
    }      
  }

  async findAll() {
    return await this.categoriaRepository.findAndCount(
      {
          order:{
              categoria: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.categoriaRepository.findOneBy({id_categoria: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateCategoriaDto) {
    try{
      const respuesta = await this.categoriaRepository.update(id, data);
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
    const respuesta = await this.categoriaRepository.findOneBy({id_categoria: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de categoría que intenta eliminar");
    return await this.categoriaRepository.remove(respuesta);
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
