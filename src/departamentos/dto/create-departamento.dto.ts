import { IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateDepartamentoDto {

    @Length(1,100,{message: "El departamento debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el departamento."})    
    departamento: string;

    @IsInt({message: "El provincia_id debe ser un número entero."})
    provincia_id: number;
}
