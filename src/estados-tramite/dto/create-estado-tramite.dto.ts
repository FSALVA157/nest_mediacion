import { IsNotEmpty, Length } from "class-validator";


export class CreateEstadoTramiteDto {

    @Length(2,100,{message: "El estado_tramite debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el estado_tramite."})
    estado_tramite: string;
}
