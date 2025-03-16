const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const dotenv = require('dotenv')


dotenv.config()
const { TOKEN, CLIENT_ID, GUILD_ID} = process.env

//importção dos comandos
const fs = require("node:fs");
const path = require('node:path');
const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

// Carregar palavras proibidas a partir de um arquivo
const badWordsFilePath = path.join(__dirname, './lib/words.txt');
let badWords = [];

// Função para carregar as palavras do arquivo
function loadBadWords() {
    const data = fs.readFileSync(badWordsFilePath, 'utf8');
    // Converte para um array de palavras
    badWords = data.split('\n').map(word => word.trim().toLowerCase()).filter(word => word.length > 0);
}

// Carregar as palavras proibidas ao iniciar o bot
loadBadWords();

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,  // Permite ler mensagens
        GatewayIntentBits.MessageContent  // Necessário para ler o conteúdo das mensagens
    ]
    
});
client.commands = new Collection()

for(const file of commandFiles){
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    if ("data" in command && "execute" in command){
        client.commands.set(command.data.name, command)
    }else{
    console.log(`Esse comando em ${filePath} esta com "data" ou "execute" ausente.`)
    }
}

client.once(Events.ClientReady, readyClient => {
	console.log(`Pronto! Login realizado como ${readyClient.user.tag}`);
});


// Verifica mensagens para filtrar palavras inapropriadas
client.on(Events.MessageCreate, async message => {
    if (message.author.bot) return; // Ignora mensagens de bots

    const contentLower = message.content.toLowerCase(); // Converte para minúsculas
    let foundBadWords = [];

    // Verifica se a mensagem contém alguma palavra ou frase proibida
    for (const word of badWords) {
        if (contentLower.includes(word)) {
            foundBadWords.push(word);
        }
    }

    if (foundBadWords.length > 0) {
        await message.delete(); // Exclui a mensagem

        // Envia a mensagem no privado (DM)
        try {
            await message.author.send(`Sua mensagem foi removida no servidor pois continha palavras inapropriadas: **${foundBadWords.join(", ")}**`);
        } catch (error) {
            console.error("Não foi possível enviar a mensagem privada para o usuário.", error);
        }

        // Envia uma mensagem no canal onde a mensagem foi excluída
        try {
            await message.channel.send(`Mensagem excluída por conter palavras inapropriadas ou de caráter ofensivo.`);
        } catch (error) {
            console.error("Não foi possível enviar a mensagem no canal.", error);
        }
    }
});

client.on(Events.InteractionCreate, async interaction =>{
    if (!interaction.isChatInputCommand()) return
    const command = interaction.client.commands.get(interaction.commandName)
    if(!command){
        console.error('comando não encontrado')
        return
    }
    try{
        await command.execute(interaction)
    }catch (error){
        console.error(error)
        await interaction.reply("Houve um erro ao executar esse comando.")

    }
})

// Login do bot
client.login(TOKEN);