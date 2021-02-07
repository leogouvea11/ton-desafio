# TON-DESAFIO

Aplicação de gerenciamento de funcionários e cargos.

# URL de produção

- https://0xhbbsdq38.execute-api.us-east-1.amazonaws.com/test

Está com /test antes da api pois é o nome do enviroment dado dentro do arquivo lambda.tf

# Documentação da API feita em POSTMAN

  - https://documenter.getpostman.com/view/5646961/TW74jQdG

### Utilização local

```sh
$ cd ton-desafio
$ npm i
$ npm run start dev
```

Para subir um lambda para produção...

```sh
$ npm run build
$ npm install --production
$ cp -a /node_modules/. /build/
$ zip -r build.zip build
$ aws s3api create-bucket --bucket=terraform-lambda_name --region=us-east-1
$ aws s3 cp build.zip s3://terraform-serverless-example/v1.0.0/build.zip
$ terraform init
$ terraform apply
```

### Todos

 - Escrever testes

License
----

MIT
