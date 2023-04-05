import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Objeto } from '../../objetos/entities/objeto.entity';
import { Modalidad } from '../../modalidad/entities/modalidad.entity';
import { Variante } from '../../variantes/entities/variante.entity';
import { EstadoTramite } from '../../estados-tramite/entities/estados-tramite.entity';
import { Ciudadano } from '../../ciudadanos/entities/ciudadano.entity';
import { UsuariosTramite } from '../../usuarios-tramite/entities/usuarios-tramite.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Provincia } from "src/provincias/entities/provincia.entity";
import { Departamento } from "src/departamentos/entities/departamento.entity";
import { Municipio } from "src/municipios/entities/municipio.entity";
import { CentroMediacion } from '../../centros-mediacion/entities/centro-mediacion.entity';


@Entity('tramites')
export class Tramite {

    @PrimaryGeneratedColumn()
    id_tramite: number;

    @Column({
        type:'int',
        nullable: false,
        unique: true,
    })
    numero_tramite: number;

    //CIUDADANO
    @Column({
        type: "int",
        nullable:false,
        default: 1
    })
    ciudadano_id: number;

    @ManyToOne(type => Ciudadano,{eager : true})
    @JoinColumn({
        name : 'ciudadano_id',
        referencedColumnName : 'id_ciudadano'
    })
    ciudadano : Ciudadano;
    //FIN CIUDADANO..................................

    //PROVINCIA
    @Column({
        type: 'int',
        nullable: false
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
        nullable: false
    })
    calle_direccion: string;

    @Column({
        type: 'int',
        nullable: false
    })
    numero_dom: number;

     //CENTRO MEDIACION
     @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    centro_mediacion_id: number

    @ManyToOne(type => CentroMediacion, {eager:true})
    @JoinColumn({
        name: 'centro_mediacion_id',
        referencedColumnName: 'id_centro_mediacion'
    })
    centro_mediacion: CentroMediacion;
    //FIN CENTRO MEDIACION

    @Column({
        type: 'date',
        nullable: false
    })
    fecha_tramite: Date;

    @Column({
        type: "boolean",
        default: false
    })
    es_expediente: boolean;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true,
        unique: false
    })
    expediente: string;

    @Column({
        type: 'date',
        nullable: true
    })
    fecha_expediente: Date;

    @Column({
        type: "boolean",
        nullable: false
    })
    esta_asesorado: boolean;
    
    //OBJETO
    @Column({
        type: "int",
        nullable:false
    })
    objeto_id: number;

    @ManyToOne(type => Objeto,{eager : true})
    @JoinColumn({
        name : 'objeto_id',
        referencedColumnName : 'id_objeto'
    })
    objeto : Objeto;
    //FIN OBJETO............................

    @Column({
        type: "boolean",
        nullable: false
    })
    violencia_genero: boolean;

    @Column({
        type: "boolean",
        nullable: false
    })
    violencia_partes: boolean;

    @Column({
        type: "boolean",
        nullable: false
    })
    existe_denuncia: boolean;

    @Column({
        type: "boolean",
        nullable: false
    })
    medida_cautelar: boolean;

    @Column({
        type: "boolean",
        nullable: false
    })
    pdf_denuncia: boolean;

    @Column({
        type: "boolean",
        nullable: false
    })
    pdf_cautelar: boolean;

    @Column({
        type: "boolean",
        nullable: false
    })
    pdf_ingresos: boolean;

    @Column({
        type: "boolean",
        nullable: false
    })
    pdf_negativa: boolean;

    //MODALIDAD
    @Column({
        type: "int",
        nullable:false
    })
    modalidad_id: number;

    @ManyToOne(type => Modalidad,{eager : true})
    @JoinColumn({
        name : 'modalidad_id',
        referencedColumnName : 'id_modalidad'
    })
    modalidad : Modalidad;
    //FIN MODALIDAD............................

    //VARIANTE
    @Column({
        type: "int",
        nullable:false
    })
    variante_id: number;

    @ManyToOne(type => Variante,{eager : true})
    @JoinColumn({
        name : 'variante_id',
        referencedColumnName : 'id_variante'
    })
    variante : Variante;
    //FIN VARIANTE............................
    
    //ESTADO TRAMITE
    @Column({
        type: "int",
        nullable:false,
        default: 1
    })
    estado_tramite_id: number;

    @ManyToOne(type => EstadoTramite,{eager : true})
    @JoinColumn({
        name : 'estado_tramite_id',
        referencedColumnName : 'id_estado_tramite'
    })
    estado_tramite : EstadoTramite;
    //FIN ESTADO TRAMITE............................

    @Column({
        type: 'date',
        nullable: true
    })
    fecha_finalizacion: Date;

    //TRAMITES ASIGNADOS
    @OneToMany(() => UsuariosTramite, (asignacion) => asignacion.tramite)
    asignaciones : UsuariosTramite[];
    //FIN TRAMITES ASIGNADOS

    

}
