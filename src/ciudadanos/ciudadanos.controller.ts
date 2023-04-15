import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Req, ParseIntPipe, Query } from '@nestjs/common';
import { Request } from 'express';
import { CiudadanosService } from './ciudadanos.service';
import { CreateCiudadanoDto } from './dto/create-ciudadano.dto';
import { UpdateCiudadanoDto } from './dto/update-ciudadano.dto';
import { UpdateCiudadanoPassDto } from './dto/update-ciudadano-pass.dto';

@Controller('ciudadanos')
export class CiudadanosController {
  constructor(private readonly ciudadanosService: CiudadanosService) {}

  //CREAR CIUDADANO
  @Post()
  create(@Body() data: CreateCiudadanoDto) {
    let edad: number;
    //se crea una instanica de Date porque data.fecha_nac biene como cadena y la funcione no lo reconoce como date
    edad= this.calcularEdad(new Date(data.fecha_nac));
    console.log("edad", edad);
    if ( edad < 18 ) throw new NotFoundException("La edad minima para registrarse es 18 años. Revise la fecha de nacimiento");
    return this.ciudadanosService.create(data);
  }
  //FIN CREAR CIUDADANO..............................

  //BUSCAR CIUDADANO X DNI
  @Get('buscar-xdni')  
  async findCiudadanoXDni(
    @Query('dni', ParseIntPipe) dni: string, 
  ) {    
    
    return this.ciudadanosService.findXDni(+dni);
  }
  //FIN BUSCAR CIUDADANO X DNI...........................................

  @Get()
  findAll() {
    return this.ciudadanosService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
    
  //   if(isNaN(Number(id))) throw new NotFoundException("El id del ciudadano debe ser un número.")
  //   let id_ciudadano: number = parseFloat(id);
  //   if(!Number.isInteger(id_ciudadano)) throw new NotFoundException("El id del ciudadano debe ser un número entero.")
  //   return this.ciudadanosService.findOne(id_ciudadano);
  // }

  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...........

  @Patch('cambiar-password/:id')
  updatePassword(
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataPasswordDto: UpdateCiudadanoPassDto
  ) {
    
    return this.ciudadanosService.updatePassword(+id, dataPasswordDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataDto: UpdateCiudadanoDto
  ) {
    
    return this.ciudadanosService.update(+id, dataDto);
  }  

  @Delete(':dni')
  remove(@Param('dni') dni: string) {
    
    return this.ciudadanosService.remove(+dni);
  }

  private calcularEdad(fechaNacimiento: Date): number {
    const diferenciaMilisegundos = Date.now() - fechaNacimiento.getTime();
    const milisegundosEnAno = 1000 * 60 * 60 * 24 * 365.25; // aproximadamente 365.25 días en un año
    const edad = Math.floor(diferenciaMilisegundos / milisegundosEnAno);
    return edad;
  }
  
}
