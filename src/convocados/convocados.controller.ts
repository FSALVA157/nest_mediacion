import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, ParseArrayPipe, BadRequestException } from '@nestjs/common';
import { ConvocadosService } from './convocados.service';
import { CreateConvocadoNoSaltaDto } from './dto/create-convocado-nosalta.dto';
import { CreateConvocadoSaltaDto } from './dto/create-convocado-salta.dto';
import { Convocado } from './entities/convocado.entity';
import { UpdateConvocadoDto } from './dto/update-convocado.dto';
import { Type } from 'class-transformer';

@Controller('convocados')
export class ConvocadosController {
  
  constructor(
    private readonly convocadosService: ConvocadosService
  ) {}
 
  @Post('nuevo-convocado')
  createConvocado(
    @Body('createConvocadoSaltaDto', new ParseArrayPipe({ items: CreateConvocadoSaltaDto })) 
    createConvocadoSaltaDto?: CreateConvocadoSaltaDto[],
    @Body('createConvocadoNoSaltaDto', new ParseArrayPipe({ items: CreateConvocadoNoSaltaDto })) 
    createConvocadoNoSaltaDto?: CreateConvocadoNoSaltaDto[]
  ){
    
    if(createConvocadoSaltaDto.length == 0 && createConvocadoNoSaltaDto.length == 0) throw new BadRequestException ("Debe enviar un convocado");    
      
    let convocados: Partial<Convocado[]> = [];
    
    if(createConvocadoSaltaDto.length > 0) {
      let salta: any[]= createConvocadoSaltaDto;
      convocados.push(...salta);
    }

    if(createConvocadoNoSaltaDto.length > 0) {
      let noSalta: any[]= createConvocadoNoSaltaDto;
      convocados.push(...noSalta);
    }
    
    console.log("dataDto", convocados);
    
    return this.convocadosService.createConvocados(convocados);
  }

  @Post('nuevo-convocado-salta')
  createConvocadoSalta(
    @Body( new ParseArrayPipe({ items: CreateConvocadoSaltaDto })) 
    dataDto: CreateConvocadoSaltaDto[]
  ){
    
    if(dataDto.length == 0) throw new BadRequestException ("La data es nula")
    
    console.log("dataDto", dataDto);
    return this.convocadosService.createSalta(dataDto);
  }

  @Post('nuevo-convocado-nosalta')
  createConvocadoNoSalta
  (
    @Body( new ParseArrayPipe({ items: CreateConvocadoNoSaltaDto })) dataDto: CreateConvocadoNoSaltaDto[]
  ) {
    
    return this.convocadosService.createNoSalta(dataDto);
  }

  @Get('buscar-xdni')  
  async findConvocadoXDni(
    @Query('dni', ParseIntPipe) dni: string
  ) {    
    
    return this.convocadosService.findXDni(+dni);
  }

  @Get('buscar-xtramite')  
  async findConvocadoXTramite(
    @Query('num_tramite', ParseIntPipe) num_tramite: string
  ) {    
    
    return this.convocadosService.findXTramite(+num_tramite);
  }

  @Get()
  findAll() {
    return this.convocadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
        
    return this.convocadosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataDto: UpdateConvocadoDto
  ) {
    
    return this.convocadosService.update(+id, dataDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {

    return this.convocadosService.remove(+id);
  }
}
