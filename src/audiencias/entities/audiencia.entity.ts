import { CentroMediacion } from "src/centros-mediacion/entities/centro-mediacion.entity";
import { Modalidad } from "src/modalidad/entities/modalidad.entity";
import { TipoAudiencia } from "src/tipos-audiencia/entities/tipos-audiencia.entity";
import { Tramite } from "src/tramites/entities/tramite.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('audiencias')
export class Audiencia {

    @PrimaryGeneratedColumn()
    id_audiencia: number;

    @Column({
        type:'int',
        nullable: false,
    })
    num_audiencia: number;
    
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
        type: 'varchar',
        length: 300,
        nullable: false
    })
    detalles: string;

    @Column({
        type: 'date',
        nullable: false
    })
    fecha_inicio: Date;

    @Column({
        type: 'time',
        nullable: false
    })
    hora_inicio: Date;
    
    @Column({
        type: 'time',
        nullable: true
    })
    hora_fin: Date;

    @Column({
        type: 'date',
        nullable: false
    })
    fecha_creacion: Date;

    @Column({
        type: "boolean",
        nullable: false,
        default: false
    })
    esta_cerrada: boolean;

    //TIPO DE AUDIENCIA
    @Column({
        type: 'int',
        nullable: false
    })
    tipo_audiencia_id: number;

    @ManyToOne(type => TipoAudiencia, {eager: true})
    @JoinColumn({
        name: 'tipo_audiencia_id',
        referencedColumnName: 'id_tipo_audiencia'
    })
    tipo_audiencia: TipoAudiencia;
    //FIN TIPO DE AUDIENCIA

    //MODALIDAD
    @Column({
        type: 'int',
        nullable: false
    })
    modalidad_id: number;
    
    @ManyToOne(type => Modalidad, {eager: true})
    @JoinColumn({
        name: 'modalidad_id',
        referencedColumnName: 'id_modalidad'
    })
    modalidad: Modalidad;
    //FIN MODALIDAD

    //CENTRO MEDIACION
    @Column({
        type: 'int',
        nullable: false
    })
    centro_mediacion_id: number;

    @ManyToOne(type => CentroMediacion, {eager: true})
    @JoinColumn({
        name: 'centro_mediacion_id',
        referencedColumnName: 'id_centro_mediacion'
    })
    centro_mediacion: CentroMediacion;
    //FIN CENTRO MEDIACION

    //USUARIO
    @Column({
        type: 'int',
        nullable: false
    })
    usuario_id: number

    @ManyToOne(type => Usuario, {eager:true})
    @JoinColumn({
        name: 'usuario_id',
        referencedColumnName: 'id_usuario'
    })
    usuario: Usuario;
    //FIN USUARIO

}
