# CRUD Desenvolvedores

## Introdução

> Uma API e um APP desenvolvidos utilizando NestJS e ReactJS, respectivamente

Documentações geradas pelo Swagger

Testes unitários utilizando JEST

Banco de dados utilizado: MariaDB

## Pré-requisitos

Docker e docker-compose precisam estar instalados.

## Instalação

> O docker já faz todo o processo de instalação e inicialização da API e do APP.

Na pasta raiz executar:

```
docker-compose up -d
```

Em alguns minutos já estará pronto para testes.

A API e o APP também tem seus composers para subir somente um deles caso ache necessario, neste caso seguir o passo acima  executando na pasta do desejado.

> Caso for subir a API e o APP em redes separadas, alterar o caminho para a API no arquivo localizado em ./dev-app/src/config.json

## Observações

As documentações completas geradas pelo Swagger estão disponiveis no link http://IP-OU-DOMINIO-DA-API:8000/docs

Foi disponibilizado uma collection do Postman para auxiliar nos testes da API

As telas do APP foram feitas utilizando o [ReactAdmin](https://marmelab.com/react-admin/) devido o mesmo fazer toda a funcionalidade desejada e ser de facil manipulação/uso. Foi necessário criar um adaptador para atender as necessidades do mesmo em relação a comunicação com a API.

O MariaDB já cria o banco de dados utilizado automaticamente, então não é necessário nenhuma configuração adicional para se executar o projeto (a não ser que esteja rodando fora do docker-compose disponibilizado).
