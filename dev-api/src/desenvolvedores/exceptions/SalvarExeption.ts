import { HttpException, HttpStatus } from "@nestjs/common";

export class SalvarExeption extends HttpException {
   constructor() {
      super("Ocorreu um erro ao salvar o desenvolvedor!", HttpStatus.BAD_REQUEST)
   }
}