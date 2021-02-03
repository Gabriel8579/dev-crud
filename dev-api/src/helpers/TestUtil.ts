import { Desenvolvedor } from "../desenvolvedores/database/Desenvolvedor.entity";

export default class TestUtil {
   static retornaDesenvolvedorValido(): Desenvolvedor {
      const desenvolvedor = new Desenvolvedor();
      desenvolvedor.id = 1;
      desenvolvedor.nome = "Desenvolvedor teste";
      desenvolvedor.idade = 20;
      desenvolvedor.hobby = "Testar coisas";
      desenvolvedor.datanascimento = new Date("2000-12-12");
      return desenvolvedor;
   }
   static retornaDesenvolvedorIdadeInvalida(): Desenvolvedor {
      const desenvolvedor = this.retornaDesenvolvedorValido();
      desenvolvedor.idade = 25;
      return desenvolvedor;
   }
   static retornaDesenvolvedorNascimentoInvalido(): Desenvolvedor {
      const desenvolvedor = this.retornaDesenvolvedorValido();
      const date = this.retornaDataTeste()
      date.setMonth(date.getMonth() + 1)
      desenvolvedor.datanascimento = date;
      return desenvolvedor;
   }

   static retornaDataTeste(): Date { return new Date('2021-01-01')}
}