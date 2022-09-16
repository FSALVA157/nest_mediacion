import {Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, PrimaryColumn} from "typeorm";

@Entity('usuarios')
export class Usuario {
    @PrimaryColumn()
    dni_usuario: number;

    /**
     * el correo será el "usuario" por lo que debe ser único 
     */
    @Column({
        type: "varchar",
        length: 50,
        unique: true
           })
    correo: string;

    @Column({
        type: "varchar",
        nullable:false,
        select: false
            })        
    clave: string;

    @Column({
        type: "varchar",
        length: 50,
           })
    nombre: string;

    @Column({
        type: "varchar",
        length: 50,
           })
   apellido: string;

   @Column({
        type: "int",
        nullable: false
     })
    centro_mediacion_id: number;

    // @ManyToOne(type => Destino, {eager: true})
    // @JoinColumn({
    //     name: "destino_id",
    //     referencedColumnName: "id_destino"
    // })
    // destino: Destino


   @CreateDateColumn()
   fecha_alta: Date;

   @UpdateDateColumn()
   ultima_actualizacion:Date;

   @DeleteDateColumn()
   fecha_baja: Date;

    // @Column({
    //     type: "enum",
    //     nullable: true,
    //     enum: UsuarioRole,
    //     default: UsuarioRole.normal
        
    // })
    // role: UsuarioRole;
    
    
// @BeforeInsert()
// @BeforeUpdate()
// async hashPassword(){
//     if(!this.clave){
//         return;
//     }
//     this.clave = await hash(this.clave,10);
// }




}
