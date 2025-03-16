# Bot de Moderação para Discord

Este é um bot de moderação para o Discord, criado para ajudar na moderação de servidores ao identificar e excluir mensagens com palavras inapropriadas ou ofensivas. Além disso, o bot notifica o autor da mensagem excluída por DM e envia um aviso no canal informando que a mensagem foi excluída devido ao seu conteúdo.

## Funcionalidades

- **Filtragem de palavras ofensivas**: O bot verifica as mensagens em busca de palavras proibidas e, caso encontre, exclui a mensagem.
- **Notificação privada**: Quando uma mensagem é excluída, o autor recebe uma notificação privada (DM) explicando o motivo.
- **Aviso no canal**: Após a exclusão, o bot envia uma mensagem no canal informando que a mensagem foi excluída por conter palavras inapropriadas.

## Pré-requisitos

Para rodar o bot em sua máquina ou servidor, você precisará de:

- Node.js (versão recomendada: 16.x ou superior)
- Uma conta no Discord com permissão para adicionar bots ao servidor.
- Um arquivo de token de bot do Discord.

## Instalando o Projeto

Siga os passos abaixo para configurar e rodar o bot:

### 1. Clonar o repositório

Clone o repositório do projeto para sua máquina local:

git clone https://github.com/seu-usuario/nome-do-repositorio.git

### 2. Instalar as dependências
Dentro do diretório do projeto, instale as dependências necessárias:

cd nome-do-repositorio
npm install
### 3. Configuração do .env
O bot usa um arquivo .env para armazenar informações sensíveis, como o token do bot do Discord. Crie um arquivo .env no diretório raiz do projeto com as seguintes variáveis:

env

TOKEN=seu-token-do-discord
CLIENT_ID=seu-client-id-do-bot
GUILD_ID=seu-guild-id-do-servidor
(Substitua seu-token-do-discord, seu-client-id-do-bot e seu-guild-id-do-servidor pelos valores correspondentes da sua aplicação no Discord.)

### 4. Arquivo de palavras proibidas
O bot lê as palavras proibidas a partir de um arquivo de texto (words.txt). Coloque as palavras proibidas no arquivo words.txt, com uma palavra por linha. Esse arquivo deve estar localizado na pasta ./lib/ do projeto.

### 5. Rodando o Bot
Agora que o bot está configurado, você pode iniciar o bot com o comando:

npm start
Isso fará com que o bot entre no Discord e comece a monitorar as mensagens nos servidores onde ele tiver permissão.

Estrutura do Projeto
Para que os desenvolvedores saibam como o projeto está organizado e onde encontrar cada parte, a estrutura do projeto é a seguinte:

```
├── commands/               # Comandos do bot
│   ├── ping.js             # Arquivo que testa o funcionamento inicial
├── lib/                    # Pasta para arquivos auxiliares
│   └── words.txt           # Arquivo de palavras proibidas
├── .env                    # Configurações sensíveis do bot
├── index.js                # Arquivo principal do bot
├── package.json            # Dependências e configurações do projeto
└── README.md               # Este arquivo
