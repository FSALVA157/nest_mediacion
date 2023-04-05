import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import {hash} from 'bcryptjs';
import { Sexo } from "src/sexo/entities/sexo.entity";
import { UsuarioCentro } from '../../usuarios-centros/entities/usuario-centro.entity';
import { CentroMediacion } from '../../centros-mediacion/entities/centro-mediacion.entity';

@Entity('usuarios')
export class Usuario {

    @PrimaryGeneratedColumn()
    id_usuario: number;

    @Column({
        type: 'int',
        nullable: false,
        unique: true
    })
    dni: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: false
    })
    apellido: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: false
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
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: false
    })
    telefono: string;

    @Column({
        type: 'varchar',
        length: 200,
        nullable: false,
        unique: false
    })
    email: string;

    //ROL
    @Column({
        type: 'int',
        nullable: true,
        default: 2
    })
    rol_id: number;

    // @ManyToOne(type => Sexo, {eager: true} )
    // @JoinColumn({
    //     name: 'sexo_id',
    //     referencedColumnName: 'id_sexo'
    // })
    // sexo: Sexo;
    //FIN ROL

    @Column({
        type: 'varchar',
        length: 200,
        nullable: false,
        unique: false,
        select: false
    })
    clave: string;    

    @Column({
        type: "boolean",
        default: true
    })
    activo: boolean;

    //CENTROS DE MEDIACION ASIGNADOS
    @OneToMany(() => UsuarioCentro, (usuarioCentro) => usuarioCentro.usuario)
    centros_mediacion : UsuarioCentro[];
    //FIN CENTROS DE MEDIACION ASIGNADOS ASIGNADOS
}


