import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Tramite } from "src/tramites/entities/tramite.entity";
import { Sexo } from "src/sexo/entities/sexo.entity";
import { Categoria } from "src/categorias/entities/categoria.entity";

@Entity('vinculados')
export class Vinculado {
    @PrimaryGeneratedColumn()
    id_vinculado: number;

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
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: true
    })
    telefono: string;    
   
    //CATEGORIA
    @Column({
        type: 'int',
        nullable: false
    })
    categoria_id: number;

    @ManyToOne(type => Categoria, {eager:true})
    @JoinColumn({
        name: 'categoria_id',
        referencedColumnName: 'id_categoria'
    })
    categoria: Categoria;
    //FIN CATEGORIA
}
