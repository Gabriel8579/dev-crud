import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Desenvolvedor } from './desenvolvedores/database/Desenvolvedor.entity';
import { DesenvolvedoresModule } from './desenvolvedores/desenvolvedores.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mariadb",
      host: process.env.DESENVOLVEDORES_API_HOST,
      port: parseInt(process.env.DESENVOLVEDORES_API_PORT, 10),
      username: process.env.DESENVOLVEDORES_API_USERNAME,
      password: process.env.DESENVOLVEDORES_API_PASSWORD,
      database: "api",
      entities: [
        Desenvolvedor
      ],
      synchronize: true
    }),
    DesenvolvedoresModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
