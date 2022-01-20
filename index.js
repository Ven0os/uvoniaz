const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { token, serverId, channelId } = require("./config.json");
const { SlashCommandBuilder } = require("@discordjs/builders");

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});

client.once("ready", () => {
  client.guilds.cache.get(serverId).commands.create(data);
  client.guilds.cache.get(serverId).commands.create(data2);
  console.log("Opérationnel");
});

const data = new SlashCommandBuilder()
  .setName("bugreport")
  .setDescription("Report un bug via Discord | Aussi disponible en jeu (WIP)")
  .addUserOption((option) => option.setName("pseudo").setDescription("Pseudo"))
  .addStringOption((option) =>
    option.setName("message").setDescription("Problème encourue")
  );
const data2 = new SlashCommandBuilder()
  .setName("news")
  .setDescription("Affiche les news du serveur");

client.on("interactionCreate", (interaction) => {
  if (interaction.isCommand()) {
    if (interaction.commandName === "bugreport") {
      let message = interaction.options.getString("message");
      let user = interaction.options.getUser("pseudo");

      if (message != undefined) {
        const channel = client.channels.cache.get(channelId);
        interaction.reply("J'ai reçu le rapport.");

        channel.send(
          "Voici le rapport de " +
            "<@" +
            user +
            ">" +
            "\n Son rapport : **" +
            message +
            "**"
        );
      } else interaction.reply("Veuillez remplir avec un message.");
    }
    if (interaction.commandName === "news") {
      const msgEmbed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Voici la mise a jour !")
        .setURL("https://youtube.com")
        .setAuthor({
          name: "By Ven0os",
          iconURL: "https://i.imgur.com/AfFp7pu.png",
          url: "https://discord.js.org",
        })
        .setDescription("Mise a jour : ////")
        .setThumbnail("https://i.imgur.com/AfFp7pu.png")
        .addFields(
          { name: "Version Bêta", value: "******" },
          { name: "\u200B", value: "\u200B" },
          { name: "Création du serveur", value: "2x TP", inline: true },
          { name: "Ajout", value: "Création des PNJ's", inline: true }
        )
        .addField("Serveur Uvonia Z", "2022", true)
        .setTimestamp()
        .setFooter({
          text: "Annonces MAJ'S",
          iconURL: "https://i.imgur.com/AfFp7pu.png",
        });

      //const channel = client.channels.cache.get(channelId); Si on poste dans un channel spécifique
      interaction.reply({ embeds: [msgEmbed] });
    }
  }
});

client.login(token);
