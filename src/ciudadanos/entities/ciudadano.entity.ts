import { type } from "os";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Provincia } from '../../provincias/entities/provincia.entity';
import { Departamento } from '../../departamentos/entities/departamento.entity';
import { Municipio } from '../../municipios/entities/municipio.entity';
import { Sexo } from '../../sexo/entities/sexo.entity';

@Entity('ciudadanos')
export class Ciudadano {
    @PrimaryGeneratedColumn()
    id_ciudadano: number;
    
    @Column({
        type: 'int',
        nullable: false,
        unique: true
    })
    dni: number;

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

    @Column({
        type: 'date',
        nullable: false
    })
    fecha_nac: Date;

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
        nullable: true
    })
    email:string;

    @Column({
        type: 'varchar',
        length: 200,
        nullable: false,
        select: false
    })
    clave: string;

}
