import { Controller, Get, Post, Body, Param, Delete, Req, NotFoundException, Put, Patch, ParseIntPipe, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UpdateUsuarioPassDto } from './dto/update-usuario-pass.dto';
import { UpdateUsuarioPerfilDto } from './dto/update-usuario-perfil.dto';
import { UpdateUsuarioRolDto } from './dto/update-usuario-rol.dto';
import { UpdateUsuarioResetPassDto } from './dto/update-usuario-resetpass.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards( AuthGuard() )
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() data: CreateUsuarioDto) {
    return this.usuarioService.create(data);
  }

  @Get('buscar-xdni')  
  async findUsuarioXDni(
    @Req()
    req: Request
  ) {
    
    if(!req.query.dni) throw new NotFoundException("El dni no fue ingresado.")
    if(isNaN(Number(req.query.dni.toString()))) throw new NotFoundException("El dni debe ser un número.")
    let dnix: number = parseFloat(req.query.dni.toString());
    if(!Number.isInteger(dnix)) throw new NotFoundException("El dni debe ser un número entero.")
    return this.usuarioService.findXDni(dnix);
  }

  //BUSCAR USUARIOS CON CENTRO DE MEDIACION
  @Get('centros-asignados')
  async findCentrosAsignados(    
  ) {    
    return this.usuarioService.findUsuariosCentrosMediacion(true);
  } 
  //FIN BUSCAR USUARIOS CON CENTRO DE MEDIACION.......................................

  @Get()
  findAll() {
    return this.usuarioService.findUsuarios();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id_usuario: number) {    
   
    return this.usuarioService.findOne(+id_usuario);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
    
  //   if(isNaN(Number(id))) throw new NotFoundException("El id del ciudadano debe ser un número.")
  //   let id_ciudadano: number = parseFloat(id);
  //   if(!Number.isInteger(id_ciudadano)) throw new NotFoundException("El id del ciudadano debe ser un número entero.")
  //   return this.ciudadanosService.findOne(id_ciudadano);
  // }


  @Patch('cambiar-password/:id')
  updatePassword(
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataPasswordDto: UpdateUsuarioPassDto
  ) {
    
    return this.usuarioService.updatePassword(+id, dataPasswordDto);

  }

  
  @Patch('reset-password/:id')
  updateResetPassword(
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataPasswordDto: UpdateUsuarioResetPassDto
  ) {
    
    return this.usuarioService.updateResetPassword(+id);

  }

  @Patch('editar-perfil/:id')
  updatePerfil(
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataDto: UpdateUsuarioPerfilDto
  ) {
    
    return this.usuarioService.updatePerfil(+id, dataDto);

  }

  @Patch('editar-estado/:id')
  updatePRol(
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataDto: UpdateUsuarioRolDto
  ) {
    
    return this.usuarioService.updateRol(+id, dataDto);

  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataDto: UpdateUsuarioDto
  ) {
    
    return this.usuarioService.update(+id, dataDto);
  }  

  // @Delete(':dni')
  // remove(@Param('dni') dni: string) {
  //   if(isNaN(Number(dni))) throw new NotFoundException("El dni debe ser un número.")
  //   let dnix: number = parseFloat(dni);
  //   if(!Number.isInteger(dnix)) throw new NotFoundException("El dni debe ser un número entero.")
  //   return this.usuarioService.remove(dnix);
  // }
}
