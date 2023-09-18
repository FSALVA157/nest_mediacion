import { IsBoolean, IsInt, IsNotEmpty, Length, Matches, MaxLength } from "class-validator";

export class CreateCentroMediacionDto {
    @Length(1,100,{message: "centro_mediacion debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el centro_mediacion"})
    centro_mediacion: string;   

    @IsInt({message: "departamento_id debe ser un número entero."})
    departamento_id: number;

    @IsInt({message: "El municipio_id debe ser un número entero."})
    municipio_id: number

    @Length(1,100,{message: "localidad_barrio debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar la localidad_barrio."})
    localidad_barrio: string;

    @MaxLength(100,{message: "calle_direccion debe tener hasta $constraint1 caracteres."})
    calle_direccion: string;
    
    @IsInt({message: "numero_dom debe ser un número entero."})
    numero_dom: number;
    
    @Length(1,100,{message: "teléfono debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el teléfono."})
    telefono: string;

    @Matches(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,{message:'El formato del email no es válido'})
    @Length(1,200,{message: "email debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el email."})
    email:string;

    @IsBoolean({message: "admin_es_responsable debe ser verdadero o falso"})
    admin_es_responsable: boolean;

}
