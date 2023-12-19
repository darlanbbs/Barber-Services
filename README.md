# BarberShop Backend
Este é o backend do serviço de barbearia, desenvolvido com o framework Nest.js e utilizando Prisma como ORM para interação com o banco de dados PostgreSQL. O projeto está estruturado em três módulos principais: Clientes, Barbeiros e Fila de Clientes por Barbeiros.

# Estrutura do Projeto
O projeto está organizado em três módulos independentes, cada um focado em uma funcionalidade específica.

# Módulo de Barbeiros
O módulo de Barbeiros é responsável por todas as operações relacionadas aos profissionais da barbearia. Isso inclui o cadastro de novos barbeiros, atualização de informações e remoção de registros.

<details>
    
<summary><b>Criação de barbeiro</b></summary>
    
### `POST` `/barbers`
Essa é a rota que será utilizada para criação de barbeiro(Apenas para estudo os barbeiros já são fixos já que são os trabalhadores)
    
**Exemplo de request:**

```javascript
{
  "name": "darlan",
  "email": "darlan@gmail.com"
}
```
    
**Exemplo de response:**

```javascript
// HTTP Status 200
{
  "id": "clqccyzwv00001183vuat2yqg",
  "name": "darlan",
  "email": "darlan@gmail.com",
  "phone": null   // Numero é opcional e tem validação para verificação se é um numero verdadeiro(baseado no BR)
}
```
**Exemplo caso já exista**
```javascript 
// HTTP Status 400 / 401 / 403 / 404
{
  "message": "Barbeiro já existe"
}
```
</details>

<details>
    
<summary><b>Edição de barbeiro</b></summary>
    
### `PUT` `/barbers/:id`
Essa é a rota que será utilizada para atualização de barbeiro
    
**Exemplo de request:**

```javascript
Params:clq84cii10002124yjlxa0cba
Body:
{
  "name": "mario",
  "email": "darlan@gmail",
  "phone":"11123657621"
}
```
    
**Exemplo de response:**

```javascript
// HTTP Status 200
{
  "name": "mario",
  "email": "darlan@gmail",
  "phone":"11123657621"
}
```
</details>

<details>
    
<summary><b>Detalhes de um barbeiro</b></summary>
    
### `GET` `/barbers/:id`
Essa é a rota que será utilizada para buscar detalhes de barbeiro.
    
**Exemplo de request:**

```javascript
Params:clq84cii10002124yjlxa0cba
```
    
**Exemplo de response:**

```javascript
// HTTP Status 200
{
  "id:clq84cii10002124yjlxa0cba,
  "name": "mario",
  "email": "darlan@gmail",
  "phone":"11123657621"
}
```
**Exemplo caso não exista**
```javascript 
// HTTP Status 400 / 401 / 403 / 404
{
  "message": "Barbeiro inexistente"
}
```
</details>



# Módulo de filas
Este módulo gerencia as operações relacionadas as filas da barbearia. Inclui recursos para cadastro, atualização, remoção e consulta de informações das filas do dia.
<details>
    
<summary><b>Criação de filas</b></summary>
    
### `POST` `/queue`
Essa é a rota que será utilizada para criação de filas de um barbeiro
    
**Exemplo de request:**

```javascript
{
  "barberId": "clq8iyvxs0000wjscan4u5ahy"
}
```
    
**Exemplo de response:**

```javascript
// HTTP Status 200
{
  "id": "clqcdomt500021183mylbtz2l",
  "date": "2023-12-19T00:00:00.000Z",
  "barberId": "clq8iyvxs0000wjscan4u5ahy"
}
```
**Exemplo caso já exista uma fila no dia**
```javascript 
// HTTP Status 400 / 401 / 403 / 404
{
  "message": "Ja existe uma chamada para o dia"
}
```
**Exemplo caso barbeiro não exista**
```javascript 
// HTTP Status 400 / 401 / 403 / 404
{
  "message": "Barbeiro inexistente"
}
```
</details>

<details>
    
<summary><b>Detalhes das filas do dia</b></summary>
    
### `Get` `/queue/today`
Essa é a rota que será utilizada buscar todas as filas do dia
    
**Exemplo de request:**

```javascript
{
  Nada no body nem params
}
```
    
**Exemplo de response:**

```javascript
// HTTP Status 200
{
  [
  {
    "id": "clqcdomt500021183mylbtz2l",
    "date": "2023-12-19T00:00:00.000Z",
    "barberId": "clq8iyvxs0000wjscan4u5ahy",
    "barber": {
      "id": "clq8iyvxs0000wjscan4u5ahy",
      "name": "darlan",
      "email": "darlan@gmail.com",
      "phone": null
    },
    "ClientsQueue": [
      {
        "id": 7,
        "queueId": "clqcdomt500021183mylbtz2l",
        "name": "Pedro",
        "services": "Cortar cabelo",
        "isAwaiting": true
      }
    ]
  }
]
}
```
</details>
<details>
    
<summary><b>Pegar filas de um barbeiro</b></summary>
    
### `Get` `/queue/:id`
Essa é a rota que será utilizada para pegar filas de um barbeiro
    
**Exemplo de request:**

```javascript
{
 Params:clq84cii10002124yjlxa0cba
}
```
    
**Exemplo de response:**

```javascript
[
  {
    "id": "clq9i5o020001olcgdq5yaqbp",
    "date": "2023-12-17T00:00:00.000Z",
    "barberId": "clq84cii10002124yjlxa0cba",
    "barber": {
      "id": "clq84cii10002124yjlxa0cba",
      "name": "mario",
      "email": "darlanxd@gmail.com",
      "phone": "11123657621"
    },
    "ClientsQueue": [
      {
        "id": 6,
        "queueId": "clq9i5o020001olcgdq5yaqbp",
        "name": "Pedro",
        "services": "Cortar cabelo",
        "isAwaiting": true
      }
    ]
  }
]
```
**Exemplo caso barbeiro não exista**
```javascript 
// HTTP Status 400 / 401 / 403 / 404

{
  "message": "Barbeiro inexistente"
}
```
</details>

<details>
    
<summary><b>Deletar uma fila</b></summary>
    
### `DELETE` `/queue`
Essa é a rota que será utilizada para deletar uma fila do dia
    
**Exemplo de request:**

```javascript
{
  "barberId": "clq84cii10002124yjlxa0cba"
}
```
    
**Exemplo de response:**

```javascript
// HTTP Status NO CONTENT
// a fila é deletada
```
**Exemplo caso barbeiro não exista**
```javascript 
// HTTP Status 400 / 401 / 403 / 404

{
  "message": "Barbeiro inexistente"
}
```
</details>

# Módulo de Fila de Clientes por Barbeiros
Este módulo é essencial para a gestão da fila de atendimento. Permite o registro e acompanhamento da fila de clientes para cada barbeiro, garantindo um atendimento organizado e eficiente.

<details>
    
<summary><b>Adicionar um cliente em uma fila</b></summary>
    
### `POST` `/clientsqueue/:id`
Essa é a rota que será utilizada para adicionar um cliente na fila de um barbeiro.
    
**Exemplo de request:**

```javascript
{
  "queueId": "clq9i5o020001olcgdq5yaqbp",
  "name": "Pedro",
  "services": "Cortar cabelo"
}
```
    
**Exemplo de response:**

```javascript
// HTTP Status 200
{
  "id": 6,
  "queueId": "clq9i5o020001olcgdq5yaqbp",
  "name": "Pedro",
  "services": "Cortar cabelo",
  "isAwaiting": true
}
```
**Exemplo caso barbeiro não exista**
```javascript 
// HTTP Status 400 / 401 / 403 / 404

{
  "message": "Barbeiro inexistente"
}

```
**Exemplo caso não tenha uma fila no dia**
```javascript 
// HTTP Status 400 / 401 / 403 / 404

{
  "message": "Não existe uma fila para o dia"
}

    
```  
    


</details>

<details>
    
<summary><b>Alterar status de um cliente em uma fila</b></summary>
    
### `PUT` `/clientsqueue`
Essa é a rota que será utilizada para atualizar o status de um cliente.
    
**Exemplo de request:**

```javascript

{
  "id": 6,
  "isAwaiting": false
}
```
    
**Exemplo de response:**

```javascript
// HTTP Status NO CONTENT
// o cliente é tirado da fila porque foi atendido
```
**Exemplo caso cliente não exista**
```javascript 
// HTTP Status 400 / 401 / 403 / 404

{
  "message": "Cliente inexistente"
}
```
</details>

<details>
    
<summary><b>Deletar um cliente em uma fila</b></summary>
    
### `DELETE` `/clientsqueue/:id`
Essa é a rota que será utilizada para deletar o cliente de uma fila.
    
**Exemplo de request:**

```javascript
Passando id 6 no Params
```
    
**Exemplo de response:**

```javascript
// HTTP Status NO CONTENT
// o cliente é tirado da fila porque não está presente
```
**Exemplo caso cliente não exista**
```javascript 
// HTTP Status 400 / 401 / 403 / 404

{
  "message": "Cliente inexistente"
}
```
</details>

# Tecnologias Utilizadas
O projeto faz uso das seguintes tecnologias:

- Nest.js: Um framework para construção de aplicativos Node.js escaláveis e eficientes.
- Prisma: Um ORM (Object-Relational Mapping) moderno e fácil de usar para interação com o banco de dados.
- PostgreSQL: Banco de dados relacional utilizado para armazenar os dados do sistema.

# Configuração
Certifique-se de ter o Node.js e o npm instalados em sua máquina antes de prosseguir. Clone o repositório e execute o seguinte comando para instalar as dependências:

```bash
$ git clone git@github.com:darlanbbs/Barber-Services.git && cd Barber-Services
```

**Siga os passos a baixo para rodar a aplicação localmente:**

```bash

# Instale as dependências:
$ npm install

# Inciar a aplicação
$ npm run start:dev
$ npx prisma studio
```

