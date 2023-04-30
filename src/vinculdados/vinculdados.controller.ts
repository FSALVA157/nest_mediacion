import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';

import { VinculdadosService } from './vinculdados.service';
import { CreateVinculdadoDto } from './dto/create-vinculdado.dto';
import { UpdateVinculdadoDto } from './dto/update-vinculdado.dto';
import { Vinculdado } from './entities/vinculdado.entity';

@Controller('vinculados')
export class VinculdadosController {

  constructor(
    private readonly vinculdadosService: VinculdadosService
   ) {}

  @Post('nuevo-vinculado')
  createVinculado(@Body() data: CreateVinculdadoDto) {
    const {...vinculadoData}= data;
    let vinculado: Partial<Vinculdado> = vinculadoData;
        
    return this.vinculdadosService.create(vinculado);
  }

  
  @Get('buscar-xdni')  
  async findVinculadoXDni(
    @Query('dni', ParseIntPipe) dni: string
  ) {    
    
    return this.vinculdadosService.findXDni(+dni);
  }

  @Get('buscar-xtramite')  
  async findVinculadoXTramite(
    @Query('num_tramite', ParseIntPipe) num_tramite: string
  ) {    
    
    return this.vinculdadosService.findXTramite(+num_tramite);
  }

  @Get()
  findAll() {
    return this.vinculdadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
        
    return this.vinculdadosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataDto: UpdateVinculdadoDto
  ) {
    
    return this.vinculdadosService.update(+id, dataDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {

    return this.vinculdadosService.remove(+id);
  }
}
