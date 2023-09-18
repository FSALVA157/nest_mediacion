import { IsEmpty, IsInt, IsNotEmpty, Length, Min } from "class-validator";

export class CreateVinculadoDto {
    
    @IsEmpty({message: "El id_vinculado no debe ser enviado."})
    id_vinculado: number;

    @Min(1,{message: "El tramite_numero no debe ser menor que $constraint1"})
    @IsInt({message: "El tramite_numero debe ser un número entero"})
    tramite_numero: number;

    @Length(1,100,{message: "El apellido debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el apellido."})
    apellido: string;

    @Length(1,100,{message: "El nombre debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el nombre."})
    nombre: string;

    @IsInt({message: "El dni debe ser un número entero."})
    dni: number;

    @IsInt({message: "El sexo_id debe ser un número entero"})
    sexo_id: number;

    @Length(1,100,{message: "El teléfono debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el teléfono."})
    telefono: string;

    @IsInt({message: "El categoria_id debe ser un número entero."})
    categoria_id: number    
}
