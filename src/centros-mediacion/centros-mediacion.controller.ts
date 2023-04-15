import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, Query } from '@nestjs/common';
import { CentrosMediacionService } from './centros-mediacion.service';
import { CreateCentroMediacionDto } from './dto/create-centro-mediacion.dto';
import { UpdateCentroMediacionDto } from './dto/update-centro-mediacion.dto';

@Controller('centros-mediacion')
export class CentrosMediacionController {
  constructor(private readonly centrosMediacionService: CentrosMediacionService) {}

  @Post()
  create(@Body() data: CreateCentroMediacionDto) {
    return this.centrosMediacionService.create(data);
  }  


  @Get('buscar-xdepartamento')
  findByDepartamento(
    @Query('id_departamento', ParseIntPipe) id_departamento: string
  ) {
    
    return this.centrosMediacionService.findByDepartamento(+id_departamento);
  }

  @Get()
  findAll() {
    return this.centrosMediacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    
    return this.centrosMediacionService.findOne(+id);
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
    @Body() dataDto: UpdateCentroMediacionDto
  ) {
    
    return this.centrosMediacionService.update(+id, dataDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {

    return this.centrosMediacionService.remove(+id);
  }
}
