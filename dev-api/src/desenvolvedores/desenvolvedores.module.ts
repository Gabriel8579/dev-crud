import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Desenvolvedor } from './database/Desenvolvedor.entity';
import { DesenvolvedoresController } from './desenvolvedores.controller';
import { DesenvolvedoresService } from './desenvolvedores.service';

@Module({
   providers: [DesenvolvedoresService],
   controllers: [DesenvolvedoresController],
   exports: [DesenvolvedoresService],
   imports: [
      TypeOrmModule.forFeature([Desenvolvedor])
   ]
})
export class DesenvolvedoresModule {}
