import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { DepartamentosService } from './departamentos.service';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards( AuthGuard() )
@Controller('departamentos')
export class DepartamentosController {
  constructor(private readonly departamentosService: DepartamentosService) {}

  @Post()
  create(@Body() data: CreateDepartamentoDto) {
    return this.departamentosService.create(data);
  }

  @Get()
  findAll() {
    return this.departamentosService.findAll();
  }

  //BUSCAR DEPARTAMENTOS CON CENTROS DE MEDIACION
  @Get('con-centro-mediacion')
  async findConCentroMEdiacion(
  ) {    

    return this.departamentosService.findConCentroMediacion();    
  }
  //BUSCAR DEPARTAMENTOS CON CENTROS DE MEDIACION.....................................................

  //BUSCAR DEPARTAMENTOS CON CENTROS DE MEDIACION
  @Get('actualizar-con-centro-mediacion')
  async findActualizarConCentroMEdiacion(
  ) {    

    return this.departamentosService.findActualizarConCentroMediacion();    
  }
  //BUSCAR DEPARTAMENTOS CON CENTROS DE MEDIACION.....................................................

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    
  return this.departamentosService.findOne(+id);
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
    @Body() dataDto: UpdateDepartamentoDto
  ) {
    
    return this.departamentosService.update(+id, dataDto);
  }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: string) {
   
  //   return this.departamentosService.remove(+id);
  // }
}
