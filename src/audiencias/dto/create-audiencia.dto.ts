import { IsDateString, IsInt, IsString, Length } from "class-validator";

export class CreateAudienciaDto {

    num_audiencia: number;

    @IsInt({message: "El tramite_numero debe ser un número entero."})
    tramite_numero: number;

    @Length(1,300,{message: "El detalle debe tener entre $constraint1 y $constraint2 caracteres."})
    detalles: string;
   
    @IsDateString({message: "El formato de la fecha de inicio ingresada no es válida."})
    fecha_inicio: Date;
   
    @IsString()
    hora_inicio: Date;
    
    @IsString()
    hora_fin: Date;      
   
    @IsInt({message: "El tipo_audiencia_id debe ser un número entero."})
    tipo_audiencia_id: number;   
   
    @IsInt({message: "La modalidad_id debe ser un número entero."})
    modalidad_id: number;
   
    @IsInt({message: "El centro_mediacion_id debe ser un número entero."})
    centro_mediacion_id: number;
   
    @IsInt({message: "El usuario_id debe ser un número entero."})
    usuario_id: number

    fecha_creacion: Date;

}
  

   
    