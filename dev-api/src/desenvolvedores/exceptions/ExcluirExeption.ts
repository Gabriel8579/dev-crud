import { HttpException, HttpStatus } from "@nestjs/common";

export class ExcluirException extends HttpException {
   constructor() {
      super("Ocorreu um erro ao excluir o desenvolvedor!", HttpStatus.BAD_REQUEST)
   }
}