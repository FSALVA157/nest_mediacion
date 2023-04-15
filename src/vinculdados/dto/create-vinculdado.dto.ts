import { IsInt, IsNotEmpty, Length, Matches, MaxLength } from "class-validator";

export class CreateVinculdadoDto {

    @IsInt({message: "El numero-tramite debe ser un número entero"})
    tramite_numero: number;

    @Length(1,100,{message: "El apellido debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el apellido."})
    apellido: string;

    @Length(1,100,{message: "El nombre debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el nombre."})
    nombre: string;

    @IsInt({message: "El dni debe ser un número entero."})
    dni: number;

    @IsInt({message: "El id-sexo debe ser un número entero"})
    sexo_id: number;

    @Length(1,100,{message: "El teléfono debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el teléfono."})
    telefono: string;

    @IsInt({message: "El id-categoria debe ser un número entero."})
    categoria_id: number

    // @IsInt({message: "El id-provincia debe ser un número entero"})
    // provincia_id: number;

    // @IsInt({message: "El id-departamento debe ser un número entero."})
    // departamento_id: number;

    // @IsInt({message: "El id-municipio debe ser un número entero."})
    // municipio_id: number

    // @Length(1,100,{message: "La localidad o barrio debe tener entre $constraint1 y $constraint2 caracteres."})
    // @IsNotEmpty({message: "Debe ingresar la localidad o barrio."})
    // localidad_barrio: string;

    // @MaxLength(100,{message: "La calle debe tener hasta $constraint1 caracteres."})
    // calle: string;

    // @IsInt({message: "El numero de domicilio debe ser un número entero."})
    // numero_dom: number;

    // @MaxLength(100,{message: "El punto de referencia debe tener hasta  $constraint1 caracteres."})
    // punto_referencia: string;   
    
    // @Matches(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,{message:'El formato del email no es válido.'})
    // @Length(1,200,{message: "El correo debe tener entre $constraint1 y $constraint2 caracteres."})
    // @IsNotEmpty({message: "Debe ingresar el correo."})
    // email:string;

    

}
