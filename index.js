const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');
const TOKEN = 'MTI1MTQ4MzQxOTk5Nzg5Njg3Ng.GXr-Zq.cJB9Qm7fyfMFnd2DgfZ94QufqFaJXaJZxu4sdA';
const CLIENT_ID = '1251483419997896876'; // Botunuzun Client ID'sini buraya ekleyin
const GUILD_ID = '1249446935702671563'; // Sunucunuzun ID'sini buraya ekleyin


const client = new Client({
intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent,
]
});


const commands = [
new SlashCommandBuilder()
.setName('say')
.setDescription('Bot belirttiğiniz mesajı yazar.')
.addStringOption(option =>
option.setName('message')
.setDescription('Botun yazacağı mesaj')
.setRequired(true)),
]
.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
try {
console.log('Slash komutları yükleniyor...');

await rest.put(
Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
{ body: commands },
);

console.log('Slash komutları yüklendi.');
} catch (error) {
console.error(error);
}
})();

client.once('ready', () => {
    console.log(`Bot ${client.user.tag} olarak giriş yaptı.`);
  });
  

client.on('interactionCreate', async interaction => {
if (!interaction.isCommand()) return;

const { commandName, options } = interaction;

if (commandName === 'say') {
const message = options.getString('message');
await interaction.reply(message);
}
});

client.login(TOKEN);