import { PartialType } from '@nestjs/mapped-types';
import { IsEmpty } from 'class-validator';
import { CreateUsuariosTramiteDto } from './create-usuarios-tramite.dto';

export class UpdateUsuariosTramiteDto extends PartialType(CreateUsuariosTramiteDto) {

    @IsEmpty({message: "No debe enviar el campo activo."})
    activo: boolean;
}
