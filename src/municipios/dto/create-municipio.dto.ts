import { IsInt, IsNotEmpty, Length } from "class-validator";

export class CreateMunicipioDto {

    @Length(1,100,{message: "El municipio debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el municipio."})    
    municipio: string;
    
    @IsInt({message: "El id-departamento debe ser un número entero."})
    departamento_id: number;

}
