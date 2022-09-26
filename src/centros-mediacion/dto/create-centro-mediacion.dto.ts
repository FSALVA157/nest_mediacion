import { IsInt, IsNotEmpty, Length, Matches, MaxLength } from "class-validator";

export class CreateCentroMediacionDto {
    @Length(1,100,{message: "El centro de mediación debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el centro de mediación."})
    centro_mediacion: string;   

    @IsInt({message: "El id de departamento debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el id de departamento."})
    departamento_id: number;

    @IsInt({message: "El id de municipio debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el id de municipio."})
    municipio_id: number

    @Length(1,100,{message: "La localidad o barrio debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar la localidad o barrio."})
    localidad_barrio: string;

    @MaxLength(100,{message: "La calle debe tener hasta $constraint1 caracteres."})
    calle: string;
    
    @IsInt({message: "El numero de domicilio debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el numero de domicilio."})
    numero_dom: number;
    
    @Length(1,100,{message: "El teléfono debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el teléfono."})
    telefono: string;

    @Matches(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,{message:'El formato del email no es válido'})
    @Length(1,200,{message: "El correo debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el correo."})
    email:string;

}
