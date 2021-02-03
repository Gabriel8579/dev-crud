import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Desenvolvedor {
   @PrimaryGeneratedColumn()
   id: number

   @Column({
      nullable: false
   })
   nome: string

   @Column({
      type: "enum",
      enum: ['M', 'F']
   })
   sexo: 'M' | 'F'

   @Column({
      nullable: false
   })
   idade: number

   @Column({
      nullable: false
   })
   hobby: string

   @Column({
      type: "timestamp",
      nullable: false
   })
   datanascimento: Date

}