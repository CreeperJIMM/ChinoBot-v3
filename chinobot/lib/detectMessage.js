let Mongo = require('./MongoData')
const Discord = require("discord.js")
const lx = require('../language/lang.json');
const kx = require('../language/main.json');

module.exports.main = async function(message, guild, channel, gid, length,clientDB,client,ser,num) {
    if (ser.detect) {
        if (client.channels.cache.has(ser.detect)) {
            if (ser.language.run) { 
                if (ser.language.run != num) return; 
            }
            let l2 = lx.zh_TW, k2 = kx.zh_TW
            if (ser.language.lan) {
                if (ser.language.lan === "zh_TW") { l2 = lx.zh_TW, k2 = kx.zh_TW }
                else if (ser.language.lan === "en_US") { l2 = lx.en_US, k2 = kx.en_US }
                else if (ser.language.lan === "ja_JP") { l2 = lx.ja_JP, k2 = kx.ja_JP }
            } else { l2 = lx.zh_TW, k2 = kx.zh_TW }
            let ch = await client.channels.cache.get(ser.detect)
            if(!message.guild.me.permissionsIn(ch).has('SEND_MESSAGES')) return;
            if(!message.guild.me.permissionsIn(ch).has('VIEW_CHANNEL')) return;
            if (channel === "dele") {
                let file = [{url: null,name: null}],filename = [`${l2.word.none}`]
                if (message.attachments.size > 0) {
                    filename = []
                    file = []
                    var Attachment = (message.attachments);
                    Attachment.forEach(function (attachment) {
                        file.push({url: attachment.proxyURL,name: attachment.name})
                        filename.push(`[${attachment.name}](${attachment.proxyURL})`)
                    })
                }
                let dele = new Discord.MessageEmbed()
                    .setTitle("__" + k2.deleted + k2.message + "__")
                    .setColor("#58a6cc")
                    .addField(k2.member, message.author.tag + `\n <@${message.author.id}> \n${message.author.id}`, true)
                    .addField(k2.channel, `\n <#${message.channel.id}>\n${message.channel.id}`, true)
                if (message.content) { 
                    let content = message.content
                    if(content.length >= 1024) content = content.substring(0,1020)
                    dele.addField(k2.content, content, false) } else { dele.addField(k2.content, l2.word.none, false) 
                    }
                dele.setTimestamp()
                .addField(k2.file, `${filename.join("\n")}`)
                if (file[0].url != null) dele.setImage(file[0].url)
                if(file.length > 0) {
                    client.channels.cache.get(ser.detect).send({embeds: [dele]})
                    let last = file[file.length-1]
                    file.forEach((data) => {
                    if(data.url != file[0].url) {
                    let attach = new Discord.MessageEmbed()
                    .setImage(data.url).setColor("#58a6cc")
                    .setDescription(`[${data.name}](${data.url})`)
                    if(last.name === data.name) attach.setFooter(k2.msgid+` ${message.id}`).setTimestamp()
                    client.channels.cache.get(ser.detect).send({embeds: [attach]})
                    .then((msg) => {
                        return msg;
                    }).catch((error) => {
                        throw error;
                    });
                    }
                    })
                }else{
                    dele.setFooter(k2.msgid+` ${message.id}`)
                    client.channels.cache.get(ser.detect).send({embeds: [dele]})
                    .then((msg) => {
                        return msg;
                    }).catch((error) => {
                        throw error;
                    });
                }
            } else if (channel === "edit") {
                if (guild.embed) return;
                let content = message.content
                let contentedit = guild.content
                if(content.length >= 1024) content = content.substring(0,1020)
                if(contentedit.length >= 1024) contentedit = contentedit.substring(0,1020)
                let dele = new Discord.MessageEmbed()
                    .setTitle("__" + k2.edit + k2.message + "__")
                    .setColor("#c8db5c")
                    .addField(k2.member, message.author.tag + `\n <@${message.author.id}> \n${message.author.id}`, true)
                    .addField(k2.channel, `\n <#${message.channel.id}>\n${message.channel.id}`, true)
                    .addField("📝" + k2.editb, `${content}\n\n📝**${k2.edited}**\n${contentedit}`, false)
                    .setTimestamp().addField(`${k2.msgid}`,` ${message.id} [[前往]](https://discord.com/channels/${message.guildId}/${message.channelId}/${message.id})`)
                client.channels.cache.get(ser.detect).send({embeds: [dele]})
                .then((msg) => {
                    return msg;
                }).catch((error) => {
                    throw error;
                });
                return;
            } else if (channel === "deleBulk") {
                if (guild.embed) return;
                let dele = new Discord.MessageEmbed()
                    .setTitle("__" + k2.much + k2.deleted + k2.message + "__")
                    .setColor("#c8db5c")
                    .setDescription(length + k2.Bulk)
                    .addField(k2.channel, `\n <#${message.first().channel.id}>\n${message.first().channel.id}`, true)
                    .addField(k2.content, message.map(message => `[${message.author.tag}]: ${message.content.substring(0,1020)}`).join("\n"), false)
                    .setTimestamp()
                client.channels.cache.get(ser.detect).send({embeds: [dele]})
                .then((msg) => {
                    return msg;
                }).catch((error) => {
                    throw error;
                });
                return;
            }
        }
    }
}