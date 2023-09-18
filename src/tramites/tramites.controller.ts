import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Query, ParseIntPipe, ParseArrayPipe, BadRequestException, InternalServerErrorException } from '@nestjs/common';

import { TramitesService } from './tramites.service';
import { CreateTramiteDto } from './dto/create-tramite.dto';
import { UpdateTramiteDto } from './dto/update-tramite.dto';
import { Usuario } from '../usuario/entities/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { ConvocadosService } from '../convocados/convocados.service';
import { Tramite } from './entities/tramite.entity';
import { CreateConvocadoSaltaDto } from './dto/create-convocado-salta-tramite.dto';
import { CreateConvocadoNoSaltaDto } from './dto/create-convocado-nosalta-tramite.dto';
import { Convocado } from 'src/convocados/entities/convocado.entity';
import { CreateVinculadoTramiteDto } from './dto/create-vinculado-tramite.dto';
import { VinculadosService } from 'src/vinculados/vinculados.service';
import { Vinculado } from 'src/vinculados/entities/vinculado.entity';

@Controller('tramites')
export class TramitesController {
  constructor(
    private readonly tramitesService: TramitesService,
    private readonly usuarioService: UsuarioService,
    private readonly convocadosService: ConvocadosService,
    private readonly vinculadosService: VinculadosService
  ) {}
 
  //NUEVO TRAMITE
  @Post('nuevo-tramite')
  async prueba(
    @Body('dataTramite') dataTramite: CreateTramiteDto,
    @Body('createConvocadoSaltaDto', new ParseArrayPipe({ items: CreateConvocadoSaltaDto })) 
    createConvocadoSaltaDto?: CreateConvocadoSaltaDto[],
    @Body('createConvocadoNoSaltaDto', new ParseArrayPipe({ items: CreateConvocadoNoSaltaDto })) 
    createConvocadoNoSaltaDto?: CreateConvocadoNoSaltaDto[],
    @Body('createVinculadoTramiteDto', new ParseArrayPipe({ items: CreateVinculadoTramiteDto })) 
    createVinculadoTramiteDto?: CreateVinculadoTramiteDto[]
  ) {
    //controlar que envie por lo menos un convocado
    if(createConvocadoSaltaDto.length == 0 && createConvocadoNoSaltaDto.length == 0) throw new BadRequestException ("Debe enviar un convocado");

    //cargar datos por defecto
    let fecha_actual: any = new Date().toISOString().split('T')[0];    
    dataTramite.fecha_tramite = fecha_actual;  
    
    //crear tramite          
    let tramiteCreado: Tramite = await this.tramitesService.create(dataTramite);
    
    let convocados: Partial<Convocado[]> = [];
    let convocadosCreados: Convocado[];
    let vinculados: Partial<Vinculado[]> = [];
    let vinculadosCreados: Vinculado[];
    if(tramiteCreado){      
      //guardar convocados
      if(createConvocadoSaltaDto.length > 0) {
        let salta: any[]= createConvocadoSaltaDto;
        convocados.push(...salta);
      }
  
      if(createConvocadoNoSaltaDto.length > 0) {
        let noSalta: any[]= createConvocadoNoSaltaDto;
        convocados.push(...noSalta);
      }

      //cargar el numero de tramite para todos los convocados
      for (let convocado of convocados){
        convocado.tramite_numero = tramiteCreado.numero_tramite;
      }

      //crear convocados
      convocadosCreados =  await this.convocadosService.createConvocados(convocados);

      if(convocadosCreados.length < (createConvocadoSaltaDto.length + createConvocadoNoSaltaDto.length)){
        await this.convocadosService.removeByTramite(tramiteCreado.numero_tramite);
        const verConvocados = await this.convocadosService.findXTramite(tramiteCreado.numero_tramite);
        convocadosCreados = verConvocados[0];
      } 
      console.log("convocados: ", convocadosCreados);
      //fin guardar convocados........

      //guardar vinculados
      if(createVinculadoTramiteDto.length > 0){
        let vinculadosAux: any[]= createVinculadoTramiteDto;
        vinculados.push(...vinculadosAux);
        for (let vinculado of vinculados){
          vinculado.tramite_numero = tramiteCreado.numero_tramite;
        }
      }
      console.log("vinculados previos: ", vinculados);

      //crear Vinculados
      vinculadosCreados = await this.vinculadosService.createVinculados(vinculados);

      if(vinculadosCreados.length < (createVinculadoTramiteDto.length)){
        await this.vinculadosService.removeByTramite(tramiteCreado.numero_tramite);
        const verVinculados = await this.vinculadosService.findXTramite(tramiteCreado.numero_tramite);
        vinculadosCreados = verVinculados[0];
      } 
      console.log("vinculados: ", vinculadosCreados);

      //fin guardar vinculados........
      
    }
    console.log("tramite: ", tramiteCreado);
    
    return {
      tramiteCreado,
      convocadosCreados,
      vinculadosCreados
    };
    //return this.tramitesService.create(dataTramite);
  }
  //FIN NUEVO TRAMITE................................................................

  //BUSCAR X NUMERO DE TRAMITE
  @Get('buscar-xnumtramite')  
  async findTramiteXNumero(
    @Query('numero_tramite', ParseIntPipe) numero_tramite: string
  ) {
    let numero_tramitex: number = parseInt(numero_tramite);

    return this.tramitesService.findXNumeroTramite(numero_tramitex);
  }
  //FIN BUSCAR X NUMERO DE TRAMITE.....................................................

  //BUSCAR TRAMITES POR CIUDADANO
  @Get('buscar-xciudadano')
  async findByCiudadano( 
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string,   
  ) {  
    let id_ciudadanox: number = +id_ciudadano;

    return this.tramitesService.findXCiudadano(id_ciudadanox);
  } 
  //FIN BUSCAR TRAMITES POR CIUDADANO.......................................
  
  //BUSCAR TRAMITES NUEVOS X CIUDADANO
  @Get('nuevos-xciudadano')
  async findNuevos(
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string,
  ) {
    let id_ciudadanox: number = +id_ciudadano;

    if (id_ciudadanox === 0) return this.tramitesService.findxestado(1);

    return this.tramitesService.findByCiudadanoByEstado(1, id_ciudadanox);    
  }
  //BUSCAR TRAMITES NUEVOS X CIUDADANO.....................................................

  //BUSCAR TRAMITES NUEVOS PARA CENTRO MEDIACION DEL USUARIO
  @Get('nuevos-xusuario')
  async findNuevosByUsuario(
    @Query('id_usuario', ParseIntPipe) id_usuario: string,
  ) {        
    //let usuario: Usuario = await this.usuarioService.findOne(+id_usuario);    
    
    //if (usuario.rol_id === 1) return this.tramitesService.findxestado(1);

    return this.tramitesService.findByUsuarioByEstado(1, +id_usuario);    
  }
  //FIN BUSCAR TRAMITES NUEVOS PARA CENTRO MEDIACION DEL USUARIO......................................

  //BUSCAR TRAMITES ASIGNADOS A MEDIADOR
  @Get('asignados-mediador')
  async findAsignadosMediador( 
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string,   
  ) {  

    let id_ciudadanox: number = +id_ciudadano;

    if (id_ciudadanox === 0) return this.tramitesService.findxestado(2);

    return this.tramitesService.findByCiudadanoByEstado(2, id_ciudadanox);
  } 
  //FIN BUSCAR TRAMITES ASIGNADOS A MEDIADORS.......................................

  //BUSCAR TRAMITES FINALIZADOS
  @Get('finalizados')
  async findFinalizados(  
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string,  
  ) {    

    let id_ciudadanox: number = +id_ciudadano;

    if (id_ciudadanox === 0) return this.tramitesService.findxestado(3);
    
    return this.tramitesService.findByCiudadanoByEstado(3, id_ciudadanox);
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

  @Patch(':id')
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
