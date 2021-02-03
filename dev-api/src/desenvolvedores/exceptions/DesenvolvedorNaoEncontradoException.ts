import { HttpException, HttpStatus } from "@nestjs/common";

export class DesenvolvedorNaoEncontradoException extends HttpException {
   constructor() {
      super("Nenhum desenvolvedor encontrado com o(s) filtro(s) especificado(s)!", HttpStatus.NOT_FOUND)
   }
}