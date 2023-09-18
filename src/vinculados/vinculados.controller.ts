import { Controller, Get, Post, Body, Patch, Param, Delete, ParseArrayPipe, BadRequestException, Query, ParseIntPipe } from '@nestjs/common';
import { VinculadosService } from './vinculados.service';
import { CreateVinculadoDto } from './dto/create-vinculado.dto';
import { UpdateVinculadoDto } from './dto/update-vinculado.dto';
import { Vinculado } from './entities/vinculado.entity';

@Controller('vinculados')
export class VinculadosController {

  constructor(
    private readonly vinculadosService: VinculadosService
  ) {}

  @Post('nuevo-vinculado')
  createVinculado(
    @Body( new ParseArrayPipe({ items: CreateVinculadoDto })) 
    vinculadoDto: CreateVinculadoDto[]
  ) {
    
    let vinculados: CreateVinculadoDto[] = [];
    let vinculadosAux: any[] = vinculadoDto;
    vinculados.push(...vinculadosAux);
        
    if(vinculadoDto.length == 0) new BadRequestException ("Debe enviar por lo menos un vinculado");
    
    console.log("vinculados en controller", vinculados);
    return this.vinculadosService.createVinculados(vinculadoDto);
  }

  
  @Get('buscar-xdni')  
  async findVinculadoXDni(
    @Query('dni', ParseIntPipe) dni: string
  ) {    
    
    return this.vinculadosService.findXDni(+dni);
  }

  @Get('buscar-xtramite')  
  async findVinculadoXTramite(
    @Query('num_tramite', ParseIntPipe) num_tramite: string
  ) {    
    
    return this.vinculadosService.findXTramite(+num_tramite);
  }

  @Get()
  findAll() {
    return this.vinculadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
        
    return this.vinculadosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataDto: UpdateVinculadoDto
  ) {
    
    return this.vinculadosService.update(+id, dataDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {

    return this.vinculadosService.remove(+id);
  }
  
}
