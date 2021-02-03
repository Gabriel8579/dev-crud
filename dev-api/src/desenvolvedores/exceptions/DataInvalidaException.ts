import { HttpException, HttpStatus } from "@nestjs/common";

export class DataInvalidaException extends HttpException {
   constructor(mensagem: string) {
      super(mensagem, HttpStatus.BAD_REQUEST)
   }
}