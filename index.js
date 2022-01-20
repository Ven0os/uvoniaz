const Discord = require("discord.js");
const { token, serverId, clientId, channelId } = require("./config.json");
const { SlashCommandBuilder } = require("@discordjs/builders");

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  client.guilds.cache.get(serverId).commands.create(data);
  console.log("Opérationnel");
});

const data = new SlashCommandBuilder()
  .setName("bugreport")
  .setDescription("Report un bug via Discord | Aussi disponible en jeu (WIP)")
  .addStringOption((option) =>
    option.setName("message").setDescription("Problème encourue")
  );

client.on("interactionCreate", (interaction) => {
  if (interaction.isCommand()) {
    if (interaction.commandName === "bugreport") {
      let msg = interaction.options.getString("message");
      let user = msg.author.username;
      const channel = client.channels.cache.get(channelId);

      channel.send(
        "Voici le rapport de " +
          "<@" +
          user +
          ">" +
          "\n Son rapport : **" +
          msg +
          "**"
      );

      if (message != undefined) {
        interaction.reply("J'ai reçu le rapport.");
      } else interaction.reply("Veuillez remplir avec un message.");
    }
  }
});

client.login(token);
