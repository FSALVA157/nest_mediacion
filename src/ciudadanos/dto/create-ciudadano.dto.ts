import { IsDateString, IsInt, IsNotEmpty, IsString, Length, Matches, MaxLength } from "class-validator";

export class CreateCiudadanoDto {

    @IsInt({message: "El dni debe ser un número entero."})
    dni: number;

    @Length(1,100,{message: "El apellido debe tener entre $constraint1 y $constraint2 caracteres."})
    apellido: string;

    @Length(1,100,{message: "El nombre debe tener entre $constraint1 y $constraint2 caracteres."})
    nombre: string;

    @IsInt({message: "El id-sexo debe ser un número entero"})
    sexo_id: number;    
    
    @Length(1,100,{message: "El teléfono debe tener entre $constraint1 y $constraint2 caracteres."})
    telefono: string;

    @IsDateString({message: "El formato de la fecha de nacimiento ingresada no es válida."})
    fecha_nac: Date;

    @Matches(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,{message:'El formato del email no es válido'})
    @Length(1,200,{message: "El correo debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el correo."})
    email:string;

    @IsString()
    @Length(8,16,{message: "La clave debe tener entre $constraint1 y $constraint2 caracteres."})
    @Matches(
        /[^'"`=+\s]+$/, {
        message: 'Estos caracteres no están permitidos: comillas simples (\'), comillas dobles ("), comillas invertidas (`), signos de igualdad (=), signos de más (+) y los espacios.'
    })
    clave: string;
}
