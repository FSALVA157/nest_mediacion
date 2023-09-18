import { IsBoolean, IsDateString, IsEmpty, IsInt, IsNotEmpty, Length } from "class-validator";


export class CreateTramiteDto {
   
    numero_tramite: number;

    @IsInt({message: "El ciudadano_id debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el id-ciudadano."})
    ciudadano_id:number;

    // @IsInt({message: "El id-provincia debe ser un número entero"})
    // provincia_id: number;

    @IsInt({message: "El departamento_id debe ser un número entero."})
    departamento_id: number;

    @IsInt({message: "El municipio_id debe ser un número entero."})
    municipio_id: number

    @Length(1,100,{message: "La localidad_barrio o barrio debe tener entre $constraint1 y $constraint2 caracteres."})
    localidad_barrio: string;

    @Length(1,100,{message: "La calle_direccion debe tener entre $constraint1 y $constraint2 caracteres."})
    calle_direccion: string;
    
    @IsInt({message: "El numero_dom debe ser un número entero."})
    numero_dom: number;

    @IsInt({message: "El centro_mediacion_id debe ser un número entero."})
    centro_mediacion_id: number

    @IsBoolean({message: "sta_asesorado debe ser verdadero o falso"})
    esta_asesorado: boolean;    
    
    fecha_tramite: Date;
    
    es_expediente: boolean;
        
    expediente: string;
    
    fecha_expediente: Date;

    @IsInt({message: "El objeto_id de la mediacón debe ser un número entero."})
    objeto_id: number;

    @IsBoolean({message: "violencia_genero debe ser verdadero o falso"})
    violencia_genero: boolean;

    @IsBoolean({message: "violencia_partes debe ser verdadero o falso"})
    violencia_partes: boolean;

    @IsBoolean({message: "existe_denuncia debe ser verdadero o falso"})
    existe_denuncia: boolean;

    @IsBoolean({message: "medida_cautelar debe ser verdadero o falso"})
    medida_cautelar: boolean;

    @IsBoolean({message: "pdf_denuncia debe ser verdadero o falso"})
    pdf_denuncia: boolean;

    @IsBoolean({message: "pdf_cautelar debe ser verdadero o falso"})
    pdf_cautelar: boolean;

    @IsBoolean({message: "El campo pdf-ingresos debe ser verdadero o falso"})
    pdf_ingresos: boolean;

    @IsBoolean({message: "pdf_ingresos debe ser verdadero o falso"})
    pdf_negativa: boolean;

    // @IsInt({message: "El id-modalidad debe ser un número entero."})
    // @IsNotEmpty({message: "Debe ingresar el id-modalidad."})
    // modalidad_id: number;

    // @IsInt({message: "El id-variante debe ser un número entero."})
    // @IsNotEmpty({message: "Debe ingresar el id de la variante."})
    // variante_id: number;

    estado_tramite_id: number;       

    fecha_finalizacion: Date;
}
