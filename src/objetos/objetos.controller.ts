import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { Request } from 'express'
import { ObjetosService } from './objetos.service';
import { CreateObjetoDto } from './dto/create-objeto.dto';
import { UpdateObjetoDto } from './dto/update-objeto.dto';

@Controller('objetos')
export class ObjetosController {
  constructor(private readonly objetosService: ObjetosService) {}

  @Post()
  create(@Body() data: CreateObjetoDto) {
    return this.objetosService.create(data);
  }

  @Get()
  findAll() {
    return this.objetosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    
    return this.objetosService.findOne(+id);
  }

  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...........

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataDto: UpdateObjetoDto
  ) {
    
    return this.objetosService.update(+id, dataDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {

    return this.objetosService.remove(+id);
  }
}
