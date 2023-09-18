import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Query } from '@nestjs/common';
import { AudienciasService } from './audiencias.service';
import { CreateAudienciaDto } from './dto/create-audiencia.dto';
import { UpdateAudienciaDto } from './dto/update-audiencia.dto';

@Controller('audiencias')
export class AudienciasController {
  constructor(private readonly audienciasService: AudienciasService) {}

  @Post()
  create(@Body() data: CreateAudienciaDto) {
    return this.audienciasService.create(data);
  }

  @Get()
  findAll() {
    return this.audienciasService.findAll();
  }

  //BUSCAR AUDIENCIAS POR USUARIO
  @Get('buscar-abiertas-xusuario')
  async findByCiudadano( 
    @Query('id_usuario', ParseIntPipe) id_usuario: string,   
  ) {  
    let id_usuariox: number = +id_usuario;

    return this.audienciasService.findByUsuario(id_usuariox);
  } 
  //FIN BUSCAR AUDIENCIAS POR USUARIO.......................................

  //BUSCAR AUDIENCIAS POR TRAMITE
  @Get('buscar-xtramite')
  async findByTramite( 
    @Query('id_tramite', ParseIntPipe) id_tramite: string,   
  ) {  
    let id_tramitex: number = +id_tramite;

    return this.audienciasService.findByTramite(id_tramitex);
  } 
  //FIN BUSCAR TAUDIENCIAS POR TRAMITE.......................................


  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    
    return this.audienciasService.findOne(+id);
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
    @Body() dataDto: UpdateAudienciaDto
  ) {
    
    return this.audienciasService.update(+id, dataDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    
    return this.audienciasService.remove(+id);
  }

}
