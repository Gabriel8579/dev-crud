import { ApiProperty } from "@nestjs/swagger"

export class DesenvolvedorDto {
   
   @ApiProperty()
   id: number

   @ApiProperty()
   nome: string

   @ApiProperty({enum: ['M', 'F']})
   sexo: 'M' | 'F'

   @ApiProperty()
   idade: number

   @ApiProperty()
   hobby: string

   @ApiProperty()
   datanascimento: Date
}

