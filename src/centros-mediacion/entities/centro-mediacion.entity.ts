import { Departamento } from "src/departamentos/entities/departamento.entity";
import { Municipio } from "src/municipios/entities/municipio.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('centros_mediacion')
export class CentroMediacion {

    @PrimaryGeneratedColumn()
    id_centro_mediacion: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    centro_mediacion: string;

    //DEPARTAMENTO
    @Column({
        type: 'int',
        nullable: false
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
        nullable: false
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
        type: 'varchar',
        length: 100,
        nullable: false
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
        nullable: false
    })
    numero_dom: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true
    })
    telefono: string;

    @Column({
        type: 'varchar',
        length: 200,
        unique: true,
        nullable: false
    })
    email:string;

    @Column({
        type: "boolean",
        default: true
    })
    activo: boolean;
}
