import { Controller, Get, Post, Body, Patch, Param, Delete, Req, NotFoundException, Put, Query, ParseIntPipe } from '@nestjs/common';
import { Request } from 'express';
import { TramitesService } from './tramites.service';
import { CreateTramiteDto } from './dto/create-tramite.dto';
import { UpdateTramiteDto } from './dto/update-tramite.dto';
import { CreateCategoriaDto } from 'src/categorias/dto/create-categoria.dto';
import { CreateEstadoTramiteDto } from 'src/estados-tramite/dto/create-estado-tramite.dto';

@Controller('tramites')
export class TramitesController {
  constructor(
    private readonly tramitesService: TramitesService,
  ) {}

  @Post()
  create(@Body() data: CreateTramiteDto) {
    
    return this.tramitesService.create(data);
  }

  @Post('prueba-crear')
  prueba(
    @Body('dataTramite') dataTramite: CreateTramiteDto,
    @Body('dni_ciudadano') data2: string,
    
  ) {
    //cargar datos por defecto
    let fecha_actual: any = new Date().toISOString().split('T')[0];
    
    dataTramite.fecha_tramite = fecha_actual;    
    dataTramite.es_expediente= false;
    dataTramite.fecha_expediente= null;
    dataTramite.expediente = null;
    dataTramite.estado_tramite_id= 1;
    return this.tramitesService.create(dataTramite);
  }

  @Get('buscar-xnumtramite')  
  async findTramiteXNumero(
    @Req()
    req: Request
  ) {
    
    if(!req.query.numero_tramite) throw new NotFoundException("El numero de tramite no fue ingresado.")
    if(isNaN(Number(req.query.numero_tramite.toString()))) throw new NotFoundException("El numero de tramite debe ser un número.")
    let numero_tramitex: number = parseFloat(req.query.numero_tramite.toString());
    if(!Number.isInteger(numero_tramitex)) throw new NotFoundException("El numero de tramite debe ser un número entero.")
    return this.tramitesService.findXNumeroTramite(numero_tramitex);
  }

  //BUSCAR TRAMITES POR CIUDADANO
  @Get('buscar-xciudadano')
  async findByCiudadano( 
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string,   
  ) {  

    let id_ciudadanox: number = +id_ciudadano;

    return this.tramitesService.findXCiudadano(id_ciudadanox);
  } 
  //FIN BUSCAR TRAMITES POR CIUDADANO.......................................
  
  //BUSCAR TRAMITES NUEVOS
  @Get('nuevos')
  async findNuevos(
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string,
    @Req()
    req: Request
  ) {

    let id_ciudadanox: number = +id_ciudadano;

    if (id_ciudadanox === 0) return this.tramitesService.findxestado(1);

    return this.tramitesService.findXCiudadanoXEstado(1, id_ciudadanox);
    
  }
  //BUSCAR TRAMITES NUEVOS.....................................................

  //BUSCAR TRAMITES ASIGNADOS A MEDIADOR
  @Get('asignados-mediador')
  async findAsignadosMediador( 
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string,   
  ) {  

    let id_ciudadanox: number = +id_ciudadano;

    if (id_ciudadanox === 0) return this.tramitesService.findxestado(2);

    return this.tramitesService.findXCiudadanoXEstado(2, id_ciudadanox);
  } 
  //FIN BUSCAR TRAMITES ASIGNADOS A MEDIADORS.......................................

  //BUSCAR TRAMITES FINALIZADOS
  @Get('finalizados')
  async findFinalizados(  
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string,  
  ) {    

    let id_ciudadanox: number = +id_ciudadano;

    if (id_ciudadanox === 0) return this.tramitesService.findxestado(3);
    
    return this.tramitesService.findXCiudadanoXEstado(3, id_ciudadanox);
  }
  //FIN BUSCAR TRAMITES FINALIZADOS.....................................................

  //BUSCAR TRAMITES con ASIGNACIONES
  @Get('asignados-datos')
  async findAsignaciones(    
  ) {    
    return this.tramitesService.findAsignadosConDatos();
  }
  //FIN BUSCAR TRAMITES ASIGNADOS A MEDIADORS.....................................................

  //CONTAR TRAMITES
  @Get('totales-tramites')
  async TotalesTramitesXEstado(    
  ) {    
    let cant_nuevos = await this.tramitesService.contarTramitesXEstado(1);
    let cant_asignado = await this.tramitesService.contarTramitesXEstado(2);
    let cant_finalizados = await this.tramitesService.contarTramitesXEstado(3);
    return {nuevos: cant_nuevos,asignados: cant_asignado, finalizados: cant_finalizados};
  }
  //FIN CONTAR TRAMITES............................................................................

  @Get()
  findAll() {
    return this.tramitesService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dataDto: UpdateTramiteDto) {
    if(isNaN(Number(id))) throw new NotFoundException("El id debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id debe ser un número entero.")
    return this.tramitesService.update(idx, dataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if(isNaN(Number(id))) throw new NotFoundException("El id debe ser un número.")
    let idx: number = parseFloat(id);
    if(!Number.isInteger(idx)) throw new NotFoundException("El id debe ser un número entero.")
    return this.tramitesService.remove(idx);
  }
}
