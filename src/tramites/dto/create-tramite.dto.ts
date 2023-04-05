import { IsBoolean, IsDateString, IsEmpty, IsInt, IsNotEmpty, Length } from "class-validator";


export class CreateTramiteDto {
   
    numero_tramite: number;

    @IsInt({message: "El id-ciudadano debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el id-ciudadano."})
    ciudadano_id:number;

    @IsInt({message: "El id-provincia debe ser un número entero"})
    provincia_id: number;

    @IsInt({message: "El id-departamento debe ser un número entero."})
    departamento_id: number;

    @IsInt({message: "El id-municipio debe ser un número entero."})
    municipio_id: number

    @Length(1,100,{message: "La localidad o barrio debe tener entre $constraint1 y $constraint2 caracteres."})
    localidad_barrio: string;

    @Length(1,100,{message: "La calle/direccion debe tener entre $constraint1 y $constraint2 caracteres."})
    calle_direccion: string;
    
    @IsInt({message: "El numero de domicilio debe ser un número entero."})
    numero_dom: number;

    @IsInt({message: "El id-centro-mediacion debe ser un número entero."})
    centro_mediacion_id: number

    @IsBoolean({message: "El campo esta asesorado debe ser verdadero o falso"})
    esta_asesorado: boolean;    
    
    fecha_tramite: Date;
    
    es_expediente: boolean;
        
    expediente: string;
    
    fecha_expediente: Date;

    @IsInt({message: "El id-objeto de la mediacón debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el id-objeto de la mdiación."})
    objeto_id: number;

    @IsBoolean({message: "El campo violencia-genero debe ser verdadero o falso"})
    violencia_genero: boolean;

    @IsBoolean({message: "El campo violencia-partes debe ser verdadero o falso"})
    violencia_partes: boolean;

    @IsBoolean({message: "El campo existe-denuncia debe ser verdadero o falso"})
    existe_denuncia: boolean;

    @IsBoolean({message: "El campo medida-cautelar debe ser verdadero o falso"})
    medida_cautelar: boolean;

    @IsBoolean({message: "El campo pdf de denuncia debe ser verdadero o falso"})
    pdf_denuncia: boolean;

    @IsBoolean({message: "El campo pdf-cautelar debe ser verdadero o falso"})
    pdf_cautelar: boolean;

    @IsBoolean({message: "El campo pdf-ingresos debe ser verdadero o falso"})
    pdf_ingresos: boolean;

    @IsBoolean({message: "El campo pdf-negativa debe ser verdadero o falso"})
    pdf_negativa: boolean;

    @IsInt({message: "El id-modalidad debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el id-modalidad."})
    modalidad_id: number;

    @IsInt({message: "El id-variante debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el id de la variante."})
    variante_id: number;

    estado_tramite_id: number;       

    fecha_finalizacion: Date;
}
