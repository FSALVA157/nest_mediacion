import { Controller, Get, Post, Body, Patch, Param, Delete, Req, NotFoundException, Put, Query, ParseIntPipe } from '@nestjs/common';
import { Request } from 'express';
import { UsuariosCentrosService } from './usuarios-centros.service';
import { CreateUsuarioCentroDto } from './dto/create-usuario-centro.dto';
import { UpdateUsuarioCentroDto } from './dto/update-usuario-centro.dto';

@Controller('usuarios-centros')
export class UsuariosCentrosController {
  constructor(private readonly usuariosCentrosService: UsuariosCentrosService) {}

  @Post()
  create(@Body() data: CreateUsuarioCentroDto) {
    let fecha_actual: any = new Date().toISOString().split('T')[0];
    data.fecha_designacion = fecha_actual;
    
    return this.usuariosCentrosService.create(data);
  }

  @Get()
  findAll() {
    return this.usuariosCentrosService.findAll();
  }

  //BUSCAR  XID DEL CENTRO DE MEDIACION
  @Get('buscar-xcentro-mediacion')  
  async findXCentroMEdiacion(
    @Query('id_centro', ParseIntPipe) id_centro: string
    
  ) {    
    
    return this.usuariosCentrosService.findXCentroMediacion(+id_centro);
  }
  //FIN BUSCAR  XI DEL CENTRO DE MEDIACION....................................................
  
  //BUSCAR USUARIOS XID CENTRO DE MEDIACION Y ACTIVOS
  @Get('buscar-activos-xcentro-mediacion')  
  async findActivosXCentroMediacion(
    @Query('id_centro', ParseIntPipe) id_centro: string
  ) {    
    
    return this.usuariosCentrosService.findXCentroMediacionXActivo(+id_centro, true);
  }
  //FIN BUSCAR USUARIOS XID CENTRO DE MEDIACION Y ACTIVOS....................................................

  //BUSCAR CENTRO DE MEDIACION  XUSUARIO Y ACTIVOS
  @Get('buscar-centros-activos-xusuario')  
  async findCentrosActivosXUsuario(
    @Query('id_usuario', ParseIntPipe) id_usuario: string
  ) {    
    
    return this.usuariosCentrosService.findByUsuarioByActivo(+id_usuario, true);
  }
  //FIN BUSCAR CENTRO DE MEDIACION  XUSUARIO Y ACTIVOS....................................................

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    
    return this.usuariosCentrosService.findOne(+id);
  }

  //DESHABILITAR USUARIO
  @Put('deshabilitar-usuario')
  async deshabilitarUsuario(    
    @Query('id_usuario_centro', ParseIntPipe) id_usuario_centro: string,
    @Body() dataDtox: UpdateUsuarioCentroDto
  ) {
    
    let dataDto: UpdateUsuarioCentroDto = new UpdateUsuarioCentroDto();
    dataDto.activo = false;

    return this.usuariosCentrosService.update(+id_usuario_centro,dataDto);
    
  }
  //FIN //DESHABILITAR USUARIO........................................................

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataDto: UpdateUsuarioCentroDto
  ) {

    return this.usuariosCentrosService.update(+id, dataDto);
  }

  // @Put(':id')
  // deshabilitarUsuariox(
  //   @Param('id') id: string, 
  //   @Body() dataDto: UpdateUsuarioCentroDto
  // ) {
  //   if(isNaN(Number(id))) throw new NotFoundException("El id debe ser un númerox.")
  //   let idx: number = parseFloat(id);
  //   if(!Number.isInteger(idx)) throw new NotFoundException("El id debe ser un número enterox.")
    
  //   return this.usuariosCentrosService.update(idx, dataDto);
  // }

  

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {

    return this.usuariosCentrosService.remove(+id);
  }
}
