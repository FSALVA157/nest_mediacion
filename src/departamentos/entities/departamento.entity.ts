import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Provincia } from '../../provincias/entities/provincia.entity';
import { Municipio } from '../../municipios/entities/municipio.entity';

@Entity('departamentos')
export class Departamento {
    
    @PrimaryGeneratedColumn()
    id_departamento: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    departamento: string;

    //PROVINCIA
    @Column({
        type: "int",
        nullable:false
    })
    provincia_id: number;

    @ManyToOne(type => Provincia,{eager : true})
    @JoinColumn({
        name : 'provincia_id',
        referencedColumnName : 'id_provincia'
    })
    provincia : Provincia;
    //FIN PROINCIA............................

    @Column({
        type: "boolean",
        nullable: false,
        default: false,
    })
    tiene_centro_mediacion: boolean;

    //MUNICIPIOS
    @OneToMany(() => Municipio, (municipio) => municipio.departamento)
    municipios : Municipio[];
    //FIN MUNICIPIOS
}
