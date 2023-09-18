import { IsEmpty, IsInt, IsNotEmpty, IsOptional, Length, Matches, MaxLength, Min } from "class-validator";

export class CreateConvocadoNoSaltaDto {
    
    @IsEmpty({message: "El id_convocado no debe ser enviado."})
    id_convocado: number;

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

    @IsInt({message: "El provincia_id debe ser un número enterox"})
    provincia_id: number;
   
    @IsInt({message: "El codigo_postal debe ser un número entero"})
    codigo_postal: number;
    
    @Length(1,100,{message: "El teléfono debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsOptional()
    telefono: string;

    @Matches(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,{message:'El formato del email no es válido.'})
    @Length(1,200,{message: "El email debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsOptional()
    email:string;

}
