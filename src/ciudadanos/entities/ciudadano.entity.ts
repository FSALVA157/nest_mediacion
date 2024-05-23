import { type } from "os";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Sexo } from '../../sexo/entities/sexo.entity';
import { Rol } from "src/roles/entities/role.entity";

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

    //ROL
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        default: 'ciudadano'
    })
    rol_id: string;

    @ManyToOne(type => Rol, {eager: true} )
    @JoinColumn({
        name: 'rol_id',
        referencedColumnName: 'id_rol'
    })
    rol: Rol;
    //FIN ROL

    @Column({
        type: 'varchar',
        length: 200,
        nullable: false,
        select: false
    })
    clave: string;

}
