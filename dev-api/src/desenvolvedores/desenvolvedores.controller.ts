import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Pagination } from '../helpers/Pagination';
import { PaginationParams } from '../helpers/PaginationParams';
import { DeleteResult, UpdateResult } from 'typeorm';
import { DesenvolvedoresService } from './desenvolvedores.service';
import { DesenvolvedorDto } from './interfaces/Desenvolvedor.dto';

@Controller('developers')
export class DesenvolvedoresController {
   constructor(private readonly desenvolvedoresService: DesenvolvedoresService) {}
   
   @Get()
   @ApiQuery({ name: "page", type: "int", description: "Página selecionada", required: false })
   @ApiQuery({ name: "limit", type: "int", description: "Limite entre paginas", required: false })
   @ApiQuery({ name: "offset", type: "int", description: "Substitui o parametro `page`. Quantidade de registros a se pular para paginação", required: false })
   @ApiQuery({ name: "nome", type: "string", description: "Filtra os desenvolvedores com um nome que contenha o valor", required: false })
   @ApiQuery({ name: "idade", type: "int", description: "Filtra os desenvolvedores por idade igual ao valor", required: false })
   @ApiQuery({ name: "sexo", type: "string", description: "Filtra os desenvolvedores por sexo igual ao valor", required: false })
   @ApiQuery({ name: "hobby", type: "string", description: "Filtra os desenvolvedores por um hobby que contenha o valor", required: false})
   @ApiQuery({ name: "datanascimento", type: "date", description: "Filtra os desenvolvedores pela data de nascimento igual o valor", required: false})
   @ApiOperation({ summary: 'Obtem dados de todos os desenvolvedores' })
   @ApiResponse( { status: 200, description: "Desenvolvedores encontrados", type: DesenvolvedorDto })
   @ApiResponse( { status: 404, description: "Nenhum desenvolvedor encontrado com os filtros selecionados" })
   findAll(@Query() query, @Query() { offset, limit, page }: PaginationParams): Promise<Pagination<DesenvolvedorDto>> {
      return this.desenvolvedoresService.findAll(query, offset, limit, page);
   }

   @Get('/:id')
   @ApiOperation({ summary: 'Obtem dados de um único desenvolvedor' })
   @ApiResponse({ status: 200, description: "Desenvolvedor encontrado", type: DesenvolvedorDto })
   @ApiResponse({ status: 404, description: "Desenvolvedor não encontrado!" })
   findOne(@Param('id') id: number): Promise<DesenvolvedorDto> {
      return this.desenvolvedoresService.findOne(id);
   }

   @Put('/:id')
   @ApiBody({ type: DesenvolvedorDto })
   @ApiOperation({ summary: 'Atualiza os dados de um único desenvolvedor' })
   @ApiResponse({ status: 200, description: "Desenvolvedor atualizado com sucesso" })
   @ApiResponse({ status: 400, description: "Idade não condiz com a data de nascimento ou Data de nascimento maior que hoje ou Parametros inválidos" })
   @ApiResponse({ status: 404, description: "Desenvolvedor não encontrado"})
   update(@Param('id') id: number, @Body() desenvolvedorDto: DesenvolvedorDto): Promise<UpdateResult> {
      return this.desenvolvedoresService.update(id, desenvolvedorDto, new Date());
   }

   @Post()
   @ApiBody({ type: DesenvolvedorDto })
   @ApiOperation({ summary: "Cria um desenvolvedor" })
   @ApiResponse({ status: 201, description: "Desenvolvedor criado com sucesso!", type: DesenvolvedorDto })
   @ApiResponse({ status: 400, description: "Idade não condiz com a data de nascimento ou Data de nascimento maior que hoje ou Parametros inválidos" })
   create(@Body() desenvolvedorDto: DesenvolvedorDto): Promise<DesenvolvedorDto> {
      return this.desenvolvedoresService.create(desenvolvedorDto, new Date());
   }

   @Delete('/:id')
   @ApiOperation({ summary: "Deleta um desenvolvedor" })
   @ApiResponse({ status: 204, description: "Desenvolvedor deletado com sucesso!" })
   @ApiResponse({ status: 400, description: "Erro ao excluir o desenvolvedor"})
   @ApiResponse({ status: 404, description: "Desenvolvedor não encontrado"})
   delete(@Param('id') id: number): Promise<DeleteResult> {
      return this.desenvolvedoresService.delete(id);
   }
}
