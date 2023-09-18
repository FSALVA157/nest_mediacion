import { IsNotEmpty, Length } from "class-validator";

export class CreateTipoAudienciaDto {

    @Length(2,100,{message: "El tipo_audiencia debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el tipo-audiencia."})
    tipo_audiencia: string;
}
