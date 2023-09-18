
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Tramite } from "src/tramites/entities/tramite.entity";
import { Sexo } from "src/sexo/entities/sexo.entity";
import { Provincia } from "src/provincias/entities/provincia.entity";
import { Departamento } from "src/departamentos/entities/departamento.entity";
import { Municipio } from "src/municipios/entities/municipio.entity";

@Entity('convocados')
export class Convocado {
    @PrimaryGeneratedColumn()
    id_convocado: number;

    //TRAMITE
    @Column({
        type: 'int',
        nullable: false
    })
    tramite_numero: number;

    @ManyToOne(type => Tramite, {eager: true})
    @JoinColumn({
        name: 'tramite_numero',
        referencedColumnName: 'numero_tramite'
    })
    tramite: Tramite;
    //FIN TRAMITE

    @Column({
        type:'varchar',
        length: 100,
        nullable: false
    })
    apellido: string;   

    @Column({
        type:'varchar',
        length: 100,
        nullable: false
    })
    nombre: string;
     
    @Column({
        type: 'int',
        nullable: true,
        default: 0
    })
    dni: number;

    //SEXO
    @Column({
        type: 'int',
        nullable: false
    })
    sexo_id: number;

    @ManyToOne(type => Sexo, {eager: true} )
    @JoinColumn({
        name: 'sexo_id',
        referencedColumnName: 'id_sexo'
    })
    sexo: Sexo;
    //FIN SEXO

    //PROVINCIA
    @Column({
        type: 'int',
        nullable: false,
        default: 18
    })
    provincia_id: number;

    @ManyToOne(type => Provincia, {eager: true} )
    @JoinColumn({
        name: 'provincia_id',
        referencedColumnName: 'id_provincia'
    })
    provincia: Provincia;
    //FIN PROVINCIA

    //DEPARTAMENTO
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    departamento_id: number;

    @ManyToOne(type => Departamento, {eager: true})
    @JoinColumn({
        name: 'departamento_id',
        referencedColumnName: 'id_departamento'
    })
    departamento: Departamento;
    //FIN DEPARATMENTO

    //MUNICIPIO
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    municipio_id: number

    @ManyToOne(type => Municipio, {eager:true})
    @JoinColumn({
        name: 'municipio_id',
        referencedColumnName: 'id_municipio'
    })
    municipio: Municipio;
    //FIN MUNICIPIO

    @Column({
        type: 'int',
        nullable: false,
        default: 0
    })
    codigo_postal: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true
    })
    localidad_barrio: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true
    })
    calle_direccion: string;

    @Column({
        type: 'int',
        nullable: false,
        default: 0
    })
    numero_dom: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true
    })
    punto_referencia: string;    

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true
    })
    telefono: string;    

    @Column({
        type: 'varchar',
        length: 200,
        nullable: true
    })
    email:string;

    @Column({
        type: "boolean",
        default: true
    })
    activo: boolean;
}
