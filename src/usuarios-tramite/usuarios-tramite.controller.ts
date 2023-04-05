import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put, Req, Query, ParseIntPipe } from '@nestjs/common';
import { Request } from 'express';
import { UsuariosTramiteService } from './usuarios-tramite.service';
import { CreateUsuariosTramiteDto } from './dto/create-usuarios-tramite.dto';
import { UpdateUsuariosTramiteDto } from './dto/update-usuarios-tramite.dto';
import { TramitesService } from '../tramites/tramites.service';


@Controller('usuarios-tramite')
export class UsuariosTramiteController {
  constructor(
    private readonly usuariosTramiteService: UsuariosTramiteService,
    private readonly tramiteService: TramitesService  
  ) {}

  @Post()
  async create(@Body() data: CreateUsuariosTramiteDto) {
    //cargar datos por defecto
    let fecha_actual: any = new Date().toISOString().split('T')[0];
    data.fecha_asignacion= fecha_actual;
    data.fecha_sece = null;
    data.activo=true;

    const usuarioTramite = this.usuariosTramiteService.create(data);
    //ESTABLECER con mediador
    if(usuarioTramite){      
      this.tramiteService.cambiarEstadoTramite(data.tramite_numero,2)
    }
    return usuarioTramite;
  }

  //BUSCAR TRAMITES ASIGNADOS POR ID-USUARIO
  @Get('buscar-xusuario')  
  async findTramiteXUsuario(
    @Query('id_usuario', ParseIntPipe) id_usuario: string, 
  ) {

    let id_usuariox: number = +id_usuario;

    if (id_usuariox === 0) return this.usuariosTramiteService.findTramitesActivos();

    return this.usuariosTramiteService.findTramitesXUsuario(id_usuariox);
  }
  //FIN BUSCAR TRAMITES ASIGNADOS POR ID-USUARIO....................................................

  //BUSCAR TRAMITES ASIGNADOS POR ID-USUARIO
  @Get('buscar-xnumtramite-activo')  
  async findTramiteXNumero(
    @Query('numero_tramite', ParseIntPipe) numero_tramite: string, 
  ) {

    let numero_tramitex: number = +numero_tramite;

    return this.usuariosTramiteService.findByNumTramiteActivo(numero_tramitex);
  }
  //FIN BUSCAR TRAMITES ASIGNADOS POR ID-USUARIO....................................................

  //BUSCAR TRAMITES ASIGNADOS POR CIUDADANO
  @Get('buscar-xciudadano')  
  async findTramiteXCiudadano(
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string, 
  ) {
    
    let id_ciudadanox: number = +id_ciudadano;

    if (id_ciudadanox === 0) return this.usuariosTramiteService.findTramitesActivos();

    return this.usuariosTramiteService.findTramitesXCiudadano(id_ciudadanox);
  }
  //FIN BUSCAR TRAMITES ASIGNADOS POR CIUDADANO....................................................

  //BUSCAR TRAMITES ASIGNADOS   ACTIVOS
  @Get('buscar-activos')  
  async findTramitesActivos() 
  {    
    return this.usuariosTramiteService.findTramitesActivos();
  }
  //FIN BUSCAR TRAMITES ASIGNADOS ACTIVOS....................................................

  //TODAS LAS ASIGNACIONES
  @Get()
  findAll() {
    return this.usuariosTramiteService.findAll();
  }
  //FIN TODAS LAS ASIGNACIONES

  @Get(':id')
  findOne(@Param('id') id: string) {
    
    if(isNaN(Number(id))) throw new NotFoundException("El id del usuario-tramite debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id del usuario-tramite debe ser un número entero.")
    return this.usuariosTramiteService.findOne(idx);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dataDto: UpdateUsuariosTramiteDto) {
    if(isNaN(Number(id))) throw new NotFoundException("El id usuario-tramite debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id usuario-tramite debe ser un número entero.")
    return this.usuariosTramiteService.update(idx, dataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if(isNaN(Number(id))) throw new NotFoundException("El id de usuariosTramiteService debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id de usuariosTramiteService debe ser un número entero.")
    return this.usuariosTramiteService.remove(idx);
  }
}
