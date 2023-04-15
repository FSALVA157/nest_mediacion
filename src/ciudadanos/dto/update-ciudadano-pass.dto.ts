import { PartialType } from '@nestjs/mapped-types';
import { IsString, Length, Matches } from 'class-validator';

export class UpdateCiudadanoPassDto {
    
    @IsString()
    @Length(8,16,{message: "La clave debe tener entre $constraint1 y $constraint2 caracteres."})
    @Matches(
        /[^'"`=+\s]+$/, {
        message: 'Estos caracteres no están permitidos: comillas simples (\'), comillas dobles ("), comillas invertidas (`), signos de igualdad (=), signos de más (+) y los espacios.'
    })
    clave: string;
    
}
