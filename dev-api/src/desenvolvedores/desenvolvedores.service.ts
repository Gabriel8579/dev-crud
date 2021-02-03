import { Injectable } from '@nestjs/common';
import { Pagination } from '../helpers/Pagination';
import { Brackets, DeleteResult, Repository, SelectQueryBuilder, UpdateResult } from 'typeorm';
import { Desenvolvedor } from './database/Desenvolvedor.entity';
import { DataInvalidaException } from './exceptions/DataInvalidaException';
import { DesenvolvedorNaoEncontradoException } from './exceptions/DesenvolvedorNaoEncontradoException';
import { ExcluirException } from './exceptions/ExcluirExeption';
import { SalvarExeption } from './exceptions/SalvarExeption';
import { DesenvolvedorDto } from './interfaces/Desenvolvedor.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DesenvolvedoresService {

   constructor(
      @InjectRepository(Desenvolvedor)
      private repository: Repository<Desenvolvedor>
   ) {}

   private getAvailableFilters(): string[] {
      return ['idade', 'sexo', 'datanascimento']
   }

   private getAvailableLikeFilters(): string[] {
      return ['nome', 'hobby']
   }

   async findAll(
      params: any,
      offset?: number,
      limit?: number,
      page?: number
   ): Promise<Pagination<Desenvolvedor>> {
      const filter = (qb: SelectQueryBuilder<Desenvolvedor>) => {
         const _filter = {}
         const _filterLike = {}

         this.getAvailableFilters().forEach((availableFilter) => {
            if (params.hasOwnProperty(availableFilter)) {
               _filter[availableFilter] = params[availableFilter]
            }
         })

         this.getAvailableLikeFilters().forEach((availableLikeFilter) => {
            if (params.hasOwnProperty(availableLikeFilter)) {
               _filterLike[availableLikeFilter] = params[availableLikeFilter]
            }
         })

         if (Object.keys(_filter).length > 0) qb.where(_filter)

         if (Object.keys(_filterLike).length > 0 ) {
            qb.andWhere( 
               new Brackets((subQuery: SelectQueryBuilder<Desenvolvedor>) => {
                  Object.keys(_filterLike).forEach(selectFilterLike => {
                     subQuery.andWhere(`${selectFilterLike} LIKE '%${_filterLike[selectFilterLike]}%'`)
                  });
               })
            )
         }
      }

      if (!offset && page) {
         offset = page * ( limit || 0 )
      }

      const [resultado, total] = await this.repository.findAndCount({
         where: filter,
         skip: offset,
         take: limit
      })

      if (resultado.length == 0) {
         throw new DesenvolvedorNaoEncontradoException();
      }

      return new Pagination<Desenvolvedor>(resultado, total);
   }

   async findOne(id: number): Promise<Desenvolvedor> {
      let desenvolvedor = await this.repository.findOne(id);
      if (!desenvolvedor) {
         throw new DesenvolvedorNaoEncontradoException();
      }
      return desenvolvedor
   }

   async update(id: number, desenvolvedorDto: DesenvolvedorDto, data: Date): Promise<UpdateResult> {
      if (this.findOne(id)) {         
         if (this.validaData(desenvolvedorDto.idade, new Date(desenvolvedorDto.datanascimento), data)) {         
            try {
               const resultadoUpdate: UpdateResult = await this.repository.update(id, desenvolvedorDto);
               return resultadoUpdate
            } catch (error) {
               throw new SalvarExeption();
            }
         }
      }
   }

   async create(desenvolvedorDto: DesenvolvedorDto, data: Date): Promise<Desenvolvedor> {

      if (this.validaData(desenvolvedorDto.idade, new Date(desenvolvedorDto.datanascimento), data)) {     
         try {
            const desenvolvedor: Desenvolvedor = await this.repository.save(desenvolvedorDto);
            return desenvolvedor
         } catch (error) {
            throw new SalvarExeption();
         }
      }
   }

   async delete(id: number): Promise<DeleteResult> {
      if (this.findOne(id)) {
         try {
            const resultadoDelete: DeleteResult = await this.repository.delete(id);
            return resultadoDelete;
         } catch (error) {
            throw new ExcluirException();
         }
      }
   }

   private confereNascimentoComIdade(idade: number, nascimento: Date, hoje: Date) {
      let diferencaAnos = hoje.getFullYear() - nascimento.getFullYear();
      if ( new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()) < 
           new Date(hoje.getFullYear(), nascimento.getMonth(), nascimento.getDate()) )
          diferencaAnos--;
      return diferencaAnos == idade;
   }

   private validaData(idade: number, nascimento: Date, hoje: Date): boolean {
      if (nascimento > hoje) {
         throw new DataInvalidaException("A data de nascimento não pode ser maior do que hoje!");
      }
      if (!this.confereNascimentoComIdade(idade, nascimento, hoje)) {
         throw new DataInvalidaException("A idade não bate com a data de nascimento!");
      }
      return true
   }

}
