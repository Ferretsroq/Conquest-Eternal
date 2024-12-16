// Require the necessary discord.js classes
const {Client, Collection, GatewayIntentBits, InteractionType} = require('discord.js');
const {token} = require('./config.json');
const fs = require('fs');


// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles)
    {
        const command = require(`./commands/${file}`);
        // Set a new item in the Collection
        // With the key as the command name and the value as the exported module
        client.commands.set(command.data.name, command);
    }

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});




// Command listener
client.on('interactionCreate', async interaction =>
    {
        if(interaction.type != InteractionType.ApplicationCommand) return;
    
        const command = client.commands.get(interaction.commandName);
        if(!command) return;
        try
        {
            if(interaction.commandName == 'signup')
            {
                await command.execute(interaction, client);
            }
        }
        catch (error)
        {
            console.error(error);
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        }
    });


client.login(token);