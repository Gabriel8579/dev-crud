import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Pagination } from '../helpers/Pagination';
import TestUtil from '../helpers/TestUtil';
import { Desenvolvedor } from './database/Desenvolvedor.entity';
import { DesenvolvedoresService } from './desenvolvedores.service';
import { DataInvalidaException } from './exceptions/DataInvalidaException';
import { DesenvolvedorNaoEncontradoException } from './exceptions/DesenvolvedorNaoEncontradoException';

describe('DesenvolvedoresService', () => {
  let service: DesenvolvedoresService;

  const mockRepositorio = {
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DesenvolvedoresService, 
      {
        provide: getRepositoryToken(Desenvolvedor),
        useValue: mockRepositorio
      }]
    }).compile();

    service = module.get<DesenvolvedoresService>(DesenvolvedoresService)
  });

  beforeEach(() => {
    mockRepositorio.findAndCount.mockReset();
    mockRepositorio.findOne.mockReset();
    mockRepositorio.save.mockReset();
    mockRepositorio.update.mockReset();
    mockRepositorio.delete.mockReset();
  })

  it('Deve estar definido', () => {
    expect(service).toBeDefined();
  })

  describe('Ações GET', () => {

    it('Deve listar todos os desenvolvedores', async () => {
      const desenvolvedor = TestUtil.retornaDesenvolvedorValido();
      mockRepositorio.findAndCount.mockReturnValue([new Pagination<Desenvolvedor>([desenvolvedor], 1)])
      const desenvolvedores = await service.findAll({})
      expect(desenvolvedores).toHaveProperty('data');
      expect(mockRepositorio.findAndCount).toBeCalledTimes(1)
    })

    it('Deve falhar ao tentar listar nenhum desenvolvedor existente', async () => {
      mockRepositorio.findAndCount.mockReturnValue([new Pagination<Desenvolvedor>([], 0), 0]);
      await service.findAll({}).catch(e => {
        expect(e).toBeInstanceOf(DesenvolvedorNaoEncontradoException);
      })
      expect(mockRepositorio.findAndCount).toBeCalledTimes(1);
    })

    it('Deve detalhar um desenvolvedor', async () => {
      const desenvolvedor = TestUtil.retornaDesenvolvedorValido();
      mockRepositorio.findOne.mockReturnValue(desenvolvedor);
      expect(await service.findOne(1)).toHaveProperty('id', 1);
      expect(mockRepositorio.findOne).toBeCalledTimes(1);
    })

    it('Deve falhar ao procurar um desenvolvedor nao existente', () => {
      mockRepositorio.findOne.mockReturnValue(null);
      expect(service.findOne(1)).rejects.toBeInstanceOf(DesenvolvedorNaoEncontradoException);
      expect(mockRepositorio.findOne).toBeCalledTimes(1);
    })

    it('Deve obter sucesso ao pesquisar todos os desenvolvedores com o nome parecido com Teste e sexo M', async () => {
      const desenvolvedor = TestUtil.retornaDesenvolvedorValido();
      mockRepositorio.findAndCount.mockReturnValue([new Pagination<Desenvolvedor>([desenvolvedor], 1)])
      expect(await service.findAll({nome: 'Teste', sexo: 'M'})).toHaveProperty('data')
      expect(mockRepositorio.findAndCount).toBeCalledTimes(1)
    })

    it('Deve pesquisar desenvolvedores com paginação', async () => {
      const desenvolvedor = TestUtil.retornaDesenvolvedorValido();
      mockRepositorio.findAndCount.mockReturnValue([new Pagination<Desenvolvedor>([desenvolvedor], 1), 2]);
      expect(await service.findAll({page: 1, limit: 1})).toHaveProperty('total', 2);
      expect(mockRepositorio.findAndCount).toBeCalledTimes(1);
    })

  });

  describe('Ações POST', () => {

    it('Deve criar um desenvolvedor', async () => {
      const desenvolvedor = TestUtil.retornaDesenvolvedorValido();
      mockRepositorio.save.mockReturnValue(desenvolvedor);
      expect(await service.create(desenvolvedor, TestUtil.retornaDataTeste())).toHaveProperty('id', desenvolvedor.id);
      expect(mockRepositorio.save).toBeCalledTimes(1);
    })

    it('Deve falhar ao tentar criar um desenvolvedor com a idade nao condizente com o nascimento', () => {
      const desenvolvedor = TestUtil.retornaDesenvolvedorIdadeInvalida();
      expect(service.create(desenvolvedor, TestUtil.retornaDataTeste())).rejects.toBeInstanceOf(DataInvalidaException);
      expect(mockRepositorio.save).toBeCalledTimes(0);
    })

    it('Deve falhar ao tentar criar um desenvolvedor com o nascimento maior do que hoje', () => {
      const desenvolvedor = TestUtil.retornaDesenvolvedorNascimentoInvalido();
      expect(service.create(desenvolvedor, TestUtil.retornaDataTeste())).rejects.toBeInstanceOf(DataInvalidaException);
      expect(mockRepositorio.save).toBeCalledTimes(0);
    })

  });

  describe('Ações PUT', () => {

    it('Deve ter sucesso ao atualizar um desenvolvedor', async () => {
      const desenvolvedor = TestUtil.retornaDesenvolvedorValido();
      const result: UpdateResult = new UpdateResult();
      result.affected = 1;
      mockRepositorio.findOne.mockReturnValue(desenvolvedor);
      mockRepositorio.update.mockReturnValue(result);
      expect(await service.update(1, desenvolvedor, TestUtil.retornaDataTeste()));
      expect(mockRepositorio.update).toBeCalledTimes(1);
      expect(mockRepositorio.findOne).toBeCalledTimes(1);
    })

    it('Deve falhar ao tentar atualizar um desenvolvedor com a idade nao condizente com o nascimento', () => {
      const desenvolvedor = TestUtil.retornaDesenvolvedorIdadeInvalida();
      mockRepositorio.findOne.mockReturnValue(desenvolvedor);
      expect(service.update(1, desenvolvedor, TestUtil.retornaDataTeste())).rejects.toBeInstanceOf(DataInvalidaException);
      expect(mockRepositorio.update).toBeCalledTimes(0);
      expect(mockRepositorio.findOne).toBeCalledTimes(1);
    })

    it('Deve falhar ao tentar atualizar um desenvolvedor com o nascimento maior do que hoje', () => {
      const desenvolvedor = TestUtil.retornaDesenvolvedorNascimentoInvalido();
      mockRepositorio.findOne.mockReturnValue(desenvolvedor);
      expect(service.update(1, desenvolvedor, TestUtil.retornaDataTeste())).rejects.toBeInstanceOf(DataInvalidaException);
      expect(mockRepositorio.update).toBeCalledTimes(0);
      expect(mockRepositorio.findOne).toBeCalledTimes(1);
    })

  })

  describe('Ações DELETE', () => {
    it('Deve deletar um desenvolvedor', async () => {
      const desenvolvedor = TestUtil.retornaDesenvolvedorValido();
      const result = new DeleteResult();
      result.affected = 1;
      mockRepositorio.findOne.mockReturnValue(desenvolvedor);
      mockRepositorio.delete.mockReturnValue(result)
      expect(await service.delete(desenvolvedor.id)).toHaveProperty('affected', 1);
    })
  })
  
});
