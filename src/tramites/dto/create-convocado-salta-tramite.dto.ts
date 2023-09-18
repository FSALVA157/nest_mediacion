import { IsEmpty, IsInt, IsNotEmpty, IsNumber, IsOptional, Length, Matches, MaxLength, Min } from "class-validator";

export class CreateConvocadoSaltaDto {

    @IsEmpty({message: "El id_convocado no debe ser enviado."})
    id_convocado: number;

    @Length(1,100,{message: "El apellido debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el apellido."})
    apellido: string;

    @Length(1,100,{message: "El nombre debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el nombre."})
    nombre: string;

    @IsInt({message: "El dni debe ser un número entero."})
    @IsOptional()
    dni: number;

    @IsInt({message: "El sexo_id debe ser un número entero"})
    sexo_id: number;    

    @IsInt({message: "El departamento_id debe ser un número entero."})
    departamento_id: number;

    @IsInt({message: "El municipio_id debe ser un número entero."})
    municipio_id: number

    @IsInt({message: "El codigo_postal debe ser un número entero"})
    codigo_postal: number;

    @Length(1,100,{message: "La localidad_barrio debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar la localidad_barrio."})
    localidad_barrio: string;

    @MaxLength(100,{message: "La calle_direccion debe tener hasta $constraint1 caracteres."})
    @IsNotEmpty({message: "Debe ingresar la calle_direccion."})
    calle_direccion: string;

    @IsInt({message: "El numero_dom de domicilio debe ser un número entero."})
    numero_dom: number;

    @MaxLength(100,{message: "El punto_referencia debe tener hasta  $constraint1 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el punto_referencia."})
    punto_referencia: string;
    
    @Length(1,100,{message: "El teléfono debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsOptional()
    telefono: string;

    @Matches(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,{message:'El formato del email no es válido.'})
    @Length(1,200,{message: "El email debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsOptional()
    email:string;

}
