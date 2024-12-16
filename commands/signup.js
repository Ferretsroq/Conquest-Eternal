const {SlashCommandBuilder} = require('@discordjs/builders');
const {EmbedBuilder, ComponentType, ActionRowBuilder, ButtonBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonStyle, SelectMenuOptionBuilder } = require('discord.js');



module.exports = 
{
	data: new SlashCommandBuilder()
	.setName('signup')
	.setDescription('Start the week signups!'),

	async execute(interaction, client)
	{
        const NicreapID = '247153261809893376';
        const ttsleaguegeneral = await client.channels.fetch('968549193750822966');
		const embed = new EmbedBuilder().setTitle("Conquest Eternal Signups").setDescription("Press the button to sign up!");
        const buttonRow0 = new ActionRowBuilder();
        const buttonApply = new ButtonBuilder().setCustomId('signupApply').setLabel('Sign Up').setStyle(ButtonStyle.Primary);
        const buttonEnd = new ButtonBuilder().setCustomId('signupEnd').setLabel('End Signups').setStyle(ButtonStyle.Danger);
        buttonRow0.addComponents([buttonApply, buttonEnd]);
        if(interaction.member.id == NicreapID)
        {
            const reply = await interaction.reply({embeds: [embed], components: [buttonRow0]});

            const senderFilter = (i) => i.user.id === interaction.member.id;
    
            const collector = reply.createMessageComponentCollector({
                componentType: ComponentType.Button
            });
            const senderCollector = reply.createMessageComponentCollector({
                componentType: ComponentType.Button,
                senderFilter
            });
            const usernames = [];
            collector.on('collect', async (interaction) => {
                if(interaction.customId.startsWith('signupApply')) {
                    if(!usernames.includes(interaction.user.displayName))
                    {
                        usernames.push(interaction.user.displayName);
                    }
                    await interaction.reply({content: "Successfully signed up!", ephemeral: true});
                    return;
                }
            });
            senderCollector.on('collect', async (interaction) => {
                if(interaction.customId.startsWith('signupEnd'))
                {
                    const newEmbed = new EmbedBuilder().setTitle("Weekly Signups").setDescription(usernames.join('\n'));
                    await ttsleaguegeneral.send({embeds: [newEmbed]});
                    return;
                }
            });   
        }
        else
        {
            interaction.reply({content: "You can't use this!", ephemeral: true});
        }
        
	},
}