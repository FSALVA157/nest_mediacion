import { IsDateString, IsInt, IsNotEmpty, Length, Matches } from "class-validator";

export class CreateUsuarioDto {

    @IsInt({message: "El dni debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el dni."})
    dni: number;
    
    @Length(1,100,{message: "El apellido debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el apellido."})
    apellido: string;

    @Length(1,100,{message: "El nombre debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el nombre."})
    nombre: string;

    @IsInt({message: "El id de sexo debe ser un número entero"})
    @IsNotEmpty({message: "Debe ingresar el id de sexo."})
    sexo_id: number;

    @Length(1,100,{message: "El teléfono debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el teléfono."})
    telefono: string;

    @Matches(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,{message:'El formato del email no es válido.'})
    @Length(1,200,{message: "El correo debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el correo."})
    email: string;

    @Length(1,100,{message: "La clave debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar la clave."})
    clave: string;
}
