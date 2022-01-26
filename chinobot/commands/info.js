const Discord = require("discord.js")
const fs = require("fs")
const version = process.env["discord_version"]
const Mongo = require("../lib/MongoData")
const lan = require('../language/lang.json');
const infoX = require('../language/info.json');

module.exports = {
    "userinfo": {
        description: { zh_TW: "dc用戶信息", en_US: "Discord user info.", ja_JP: "" },
        authority: "everyone",
        instructions: "userinfo",
        category: "normal",
        vote: false,
        help: false,
        fun: function (bot, message, clientDB, language, args, ...ag) {
            return userinfo(bot, message, args, clientDB, language)
        }
    },
    "uinfo": {
        description: { zh_TW: "dc用戶信息", en_US: "Discord user info.", ja_JP: "" },
        authority: "everyone",
        instructions: "uinfo",
        vote: false,
        help: false,
        fun: function (bot, message, clientDB, language, args, ...ag) {
            return userinfo(bot, message, args, clientDB, language)
        }
    },
    "ui": {
        description: { zh_TW: "dc用戶信息", en_US: "Discord user info.", ja_JP: "" },
        authority: "everyone",
        instructions: "userinfo",
        vote: false,
        help: false,
        fun: function (bot, message, clientDB, language, args, ...ag) {
            return userinfo(bot, message, args, clientDB, language)
        }
    },
    "sinfo": {
        description: { zh_TW: "dc伺服器信息", en_US: "Discord servr info.", ja_JP: "" },
        authority: "everyone",
        instructions: "sinfo",
        vote: false,
        help: false,
        fun: function (bot, message, clientDB, language, args, ...ag) {
            return server(bot, message, args, language)
        }
    },
    "si": {
        description: { zh_TW: "dc伺服器信息", en_US: "Discord servr info.", ja_JP: "" },
        authority: "everyone",
        instructions: "si",
        vote: false,
        help: false,
        fun: function (bot, message, clientDB, language, args, ...ag) {
            return server(bot, message, args, language)
        }
    },
    "gi": {
        description: { zh_TW: "dc伺服器信息", en_US: "Discord guild info.", ja_JP: "" },
        authority: "everyone",
        instructions: "gi",
        vote: false,
        help: false,
        fun: function (bot, message, clientDB, language, args, ...ag) {
            return server(bot, message, args, language)
        }
    },
    "guildinfo": {
        description: { zh_TW: "dc伺服器信息", en_US: "Discord guild info.", ja_JP: "" },
        authority: "everyone",
        instructions: "guildinfo",
        category: "normal",
        vote: false,
        help: false,
        fun: function (bot, message, clientDB, language, args, ...ag) {
            return server(bot, message, args, language)
        }
    },
    "serverinfo": {
        description: { zh_TW: "dc伺服器信息", en_US: "Discord servr info.", ja_JP: "" },
        authority: "everyone",
        instructions: "serverinfo",
        vote: false,
        help: false,
        fun: function (bot, message, clientDB, language, args, ...ag) {
            return server(bot, message, args, language)
        }
    },
    "binfo": {
        description: { zh_TW: "智乃機器人信息", en_US: "Chino bot info.", ja_JP: "" },
        authority: "everyone",
        instructions: "binfo",
        vote: false,
        help: false,
        fun: function (bot, message, clientDB, language, args, ...ag) {
            return botinfo(bot, message, args, language)
        }
    },
    "bi": {
        description: { zh_TW: "智乃機器人信息", en_US: "Chino bot info.", ja_JP: "" },
        authority: "everyone",
        instructions: "bi",
        category: "normal",
        vote: false,
        help: false,
        fun: function (bot, message, clientDB, language, args, ...ag) {
            return botinfo(bot, message, args, language)
        }
    },
    "gm": {
        description: { zh_TW: "dc伺服器成員信息", en_US: "Servr member info.", ja_JP: "" },
        authority: "everyone",
        instructions: "gm",
        category: "normal",
        vote: false,
        help: false,
        fun: function (bot, message, clientDB, language, args, ...ag) {
            return guildmember(bot, message, args, language)
        }
    },
    "guildmember": {
        description: { zh_TW: "dc伺服器成員信息", en_US: "Servr member info.", ja_JP: "" },
        authority: "everyone",
        instructions: "gm",
        category: "normal",
        vote: false,
        help: false,
        fun: function (bot, message, clientDB, language, args, ...ag) {
            return guildmember(bot, message, args, language)
        }
    },
    "role": {
        description: { zh_TW: "身分組列表", en_US: "servr member info.", ja_JP: "" },
        authority: "everyone",
        instructions: "gm",
        category: "normal",
        vote: false,
        help: false,
        fun: function (bot, message, clientDB, language, args, ...ag) {
            return role(bot, message, args, language)
        }
    }
}
async function role(bot, message, args, language) {
    let lang = lan.zh_TW, h = infoX.zh_TW
    if (language === "zh_TW") { lang = lan.zh_TW; h = infoX.zh_TW } else if (language === "zh_CN") { lang = lan.zh_CN; h = infoX.zh_CN } else if (language === "ja_JP") {
        lang = lan.ja_JP; h = infoX.ja_JP
    } else if (language === "en_US") { lang = lan.en_US; h = infoX.en_US }
    if (!message.guild) return;
    let member = null;
    let user = message.guild.roles.cache.get(args[0])
    if (message.mentions.roles.size) { member = message.mentions.roles.first() } else if (args[0] != null) {
        if (user) { member = user }
    } else { member = "guild" }
    if (member === "guild") {
        let roles = new Array;
        for (let role of message.guild.roles.cache.sort((a, b) => b.position - a.position).map(r => r)) {
            roles.push("<@&" + role.id + ">: " + role.members.size)
        }
        setTimeout(() => {
            let roleembed = new Discord.MessageEmbed()
                .setTitle(message.guild.name)
                .setThumbnail(message.guild.iconURL({ format: "png", dynamic: true, size: 512 }))
                .setDescription("ID: " + message.guild.id + "\nRoles:\n" + roles.join("\n"))
            message.channel.send({ embeds: [roleembed] })
        }, 1000);
    } else {
        if (member) {
            let args = member.createdAt.toUTCString().split(" ")
            if (args[2] == "Jan") { var mon = lang.date.months[1] } else if (args[2] == "Feb") { var mon = lang.date.months[2] } else if (args[2] == "Mar") { var mon = lang.date.months[3] } else if (args[2] == "Apr") { var mon = lang.date.months[4] } else if (args[2] == "May") { var mon = lang.date.months[5] } else if (args[2] == "Jun") { var mon = lang.date.months[6] } else if (args[2] == "Jul") { var mon = lang.date.months[7] } else if (args[2] == "Aug") { var mon = lang.date.months[8] } else if (args[2] == "Sep") { var mon = lang.date.months[9] } else if (args[2] == "Oct") { var mon = lang.date.months[10] } else if (args[2] == "Nov") { var mon = lang.date.months[11] } else if (args[2] == "Dec") { var mon = lang.date.months[12] }; if (args[0] == "Mon,") { var week = lang.date.weeks.Mon } else if (args[0] == "Tue,") { var week = lang.date.weeks.Tue } else if (args[0] == "Wed,") { var week = lang.date.weeks.Wed } else if (args[0] == "Thu,") { var week = lang.date.weeks.Thur } else if (args[0] == "Fri,") { var week = lang.date.weeks.Fir } else if (args[0] == "Sat,") { var week = lang.date.weeks.Sat } else if (args[0] == "Sun,") { var week = lang.date.weeks.Sun }
            let hor = member.createdAt.getUTCHours(8); let H = (hor + 8) + args[4].substring(2); let time = args[3] + " " + H + " " + mon + " " + args[1] + `${lang.date.date} ` + week + " UTC+8"
            let mem = member.members.sort((a, b) => b - a).map(r => r).join("\n")
            if (!mem) { mem = lang.word.none }
            if (mem.toString().length > 1024) { mem = "Many member has this role." }
            let colo = member.hexColor.replace("#", "")
            let roles = new Discord.MessageEmbed()
                .setTitle(message.guild.name)
                .setColor(member.hexColor)
                .setDescription("Name:  <@&" + member.id + "> \nID: " + member.id + "\nColor: [" + member.hexColor + "](https://www.color-hex.com/color/" + colo + ")\n")
                .addField(h.guild.member.all + ` ${member.members.size}`, mem)
                .setFooter("Add date:\n" + time)
            return message.channel.send({ embeds: [roles] });
        }
    }
}
async function guildmember(bot, message, args, language) {
    let p = bot.prefix
    let lang = lan.zh_TW, h = infoX.zh_TW
    if (language === "zh_TW") { lang = lan.zh_TW; h = infoX.zh_TW } else if (language === "zh_CN") { lang = lan.zh_CN; h = infoX.zh_CN } else if (language === "ja_JP") {
        lang = lan.ja_JP; h = infoX.ja_JP
    } else if (language === "en_US") { lang = lan.en_US; h = infoX.en_US }
    if (!message.guild) return;
    let member = null;
    let user = bot.users.cache.get(args[0])
    if (message.mentions.users.size) { member = message.mentions.users.first() } else if (args[0] != null) {
        if (user) { member = user }
    } else { member = "guild" }
    if (member === "guild") {
        let guild = message.guild
        message.guild.members.fetch().then((m) => {
            let gm = new Discord.MessageEmbed()
                .setTitle(message.guild.name)
                .setDescription(message.guild.id)
                .setThumbnail(message.guild.iconURL({ format: "png", dynamic: true, size: 512 }))
                .addField(`${h.guild.member.all}` + message.guild.memberCount, `${h.guild.member.member}` + message.guild.members.cache.filter(member => !member.user.bot).size + `\n` + `${h.guild.member.bot} ` + message.guild.members.cache.filter(users => users.user.bot).size, true)
                .addField(h.status.member + guild.presences.cache.size, `${h.status.online} ` + m.filter(m => m.presence.status === "online").size + `\n` + `${h.status.afk} ` + m.filter(m => m.presence.status === "idle").size + `\n` + `${h.status.dnd} ` + m.filter(m => m.presence.status === "dnd").size + "\n" + `${h.status.offline} ` + m.filter(m => m.presence.status === "offline").size, true)
            return message.channel.send({ embeds: [gm] });
        }).catch((error) => {
            let gm = new Discord.MessageEmbed()
                .setTitle(message.guild.name)
                .setDescription(message.guild.id)
                .setThumbnail(message.guild.iconURL({ format: "png", dynamic: true, size: 512 }))
                .addField(`${h.guild.member.all}` + message.guild.memberCount, `${h.guild.member.member}` + message.guild.members.cache.filter(member => !member.user.bot).size + `\n` + `${h.guild.member.bot} ` + message.guild.members.cache.filter(users => users.user.bot).size, true)
            try { gm.addField(h.status.member + guild.presences.cache.size, `${h.status.online} ` + guild.presences.cache.filter(user => user.member.presence.status === 'online').size + `\n` + `${h.status.afk} ` + guild.presences.cache.filter(user => user.member.presence.status === 'idle').size + `\n` + `${h.status.dnd} ` + guild.presences.cache.filter(user => user.member.presence.status === 'dnd').size + "\n" + `${h.status.offline} ` + guild.members.cache.filter(user => user.presence.status === 'offline').size, true) } catch { gm.addField(h.status.member, h.status.error, true) }
            return message.channel.send({ embeds: [gm] });
        })
    } else {
        if (member) {
            let nick = null, member2 = message.guild.member(member)
            if (member2.nickname == null) { nick = "" } else { nick = "(" + member2.nickname + ")" }
            const presence = `${member.presence.status}`
            if (presence === "online") { var online = h.status.online } else if (presence === "idle") { var online = h.status.afk } else if (presence === "dnd") { var online = h.status.dnd } else if (presence === "offline") { var online = h.status.offline }
            if (message.bot) { var Bot = lang.word.yes } else if (!message.bot) { var Bot = lang.word.no }
            let gm = new Discord.MessageEmbed()
                .setTitle(h.user.name + " " + member.username + "#" + member.discriminator + ` ${nick}`, true)
                .setDescription(member.id)
                .setThumbnail(member.displayAvatarURL({ format: "png", dynamic: true, size: 512 }))
                .addField(h.user.status, online + "\n\n**" + h.user.bot + "**\n" + Bot, true)
                .addField(h.guild.role + ` ${member2.roles.cache.sort((a, b) => b.position - a.position).map(r => r).length}`, member2.roles.cache.sort((a, b) => b.position - a.position).map(r => r), true)
                .setFooter(h.user.footer.user + h.user.footer.data + p + "ui" + h.user.footer.data2)
            return message.channel.send({ embeds: [gm] });
        }
    }
}
async function userinfo(bot, message, args, clientDB, language) {
    let p = bot.prefix
    let lang = lan.zh_TW, h = infoX.zh_TW
    if (language === "zh_TW") { lang = lan.zh_TW; h = infoX.zh_TW } else if (language === "zh_CN") { lang = lan.zh_CN; h = infoX.zh_CN } else if (language === "ja_JP") {
        lang = lan.ja_JP; h = infoX.ja_JP
    } else if (language === "en_US") { lang = lan.en_US; h = infoX.en_US }
    if (!message.guild) return;
    var member = null;
    let user = message.guild.members.cache.get(args[0])
    if (message.mentions.users.size) {
        member = message.mentions.users.first()
        member = message.guild.members.cache.get(member.id)
    } else if (args[0] != null) {
        if (user) { member = user }
    } else { member = message.member }
    let presence = null, Bott = null
    let time = "(未知)", time2 = "(未知)", clour = "#80ac76"
    let member2 = member
    if (member) {
        if (member.presence) {
            presence = `${member.presence.status}`
            Bott = `${member.user.bot}`
            if (member2.presence.guild) {
                clour = member2.presence.member.roles.highest.color
                if (member2.presence.guild.joinedAt) {
                    let args = member2.presence.guild.joinedAt.toUTCString().split(" ")
                    if (args[2] == "Jan") { var mon = lang.date.months[1] } else if (args[2] == "Feb") { var mon = lang.date.months[2] } else if (args[2] == "Mar") { var mon = lang.date.months[3] } else if (args[2] == "Apr") { var mon = lang.date.months[4] } else if (args[2] == "May") { var mon = lang.date.months[5] } else if (args[2] == "Jun") { var mon = lang.date.months[6] } else if (args[2] == "Jul") { var mon = lang.date.months[7] } else if (args[2] == "Aug") { var mon = lang.date.months[8] } else if (args[2] == "Sep") { var mon = lang.date.months[9] } else if (args[2] == "Oct") { var mon = lang.date.months[10] } else if (args[2] == "Nov") { var mon = lang.date.months[11] } else if (args[2] == "Dec") { var mon = lang.date.months[12] }; if (args[0] == "Mon,") { var week = lang.date.weeks.Mon } else if (args[0] == "Tue,") { var week = lang.date.weeks.Tue } else if (args[0] == "Wed,") { var week = lang.date.weeks.Wed } else if (args[0] == "Thu,") { var week = lang.date.weeks.Thur } else if (args[0] == "Fri,") { var week = lang.date.weeks.Fir } else if (args[0] == "Sat,") { var week = lang.date.weeks.Sat } else if (args[0] == "Sun,") { var week = lang.date.weeks.Sun }
                    let hor = member2.presence.guild.joinedAt.getUTCHours(8); let H = (hor + 8) + args[4].substring(2); time = args[3] + " " + H + " " + mon + " " + args[1] + `${lang.date.date} ` + week + " UTC+8"
                }
                if (member2.user) {
                    let args2 = member2.user.createdAt.toUTCString().split(" ")
                    if (args2[2] == "Jan") { var mon = lang.date.months[1] } else if (args2[2] == "Feb") { var mon = lang.date.months[2] } else if (args2[2] == "Mar") { var mon = lang.date.months[3] } else if (args2[2] == "Apr") { var mon = lang.date.months[4] } else if (args2[2] == "May") { var mon = lang.date.months[5] } else if (args2[2] == "Jun") { var mon = lang.date.months[6] } else if (args2[2] == "Jul") { var mon = lang.date.months[7] } else if (args2[2] == "Aug") { var mon = lang.date.months[8] } else if (args2[2] == "Sep") { var mon = lang.date.months[9] } else if (args2[2] == "Oct") { var mon = lang.date.months[10] } else if (args2[2] == "Nov") { var mon = lang.date.months[11] } else if (args2[2] == "Dec") { var mon = lang.date.months[12] }; if (args2[0] == "Mon,") { var week = lang.date.weeks.Mon } else if (args2[0] == "Tue,") { var week = lang.date.weeks.Tue } else if (args2[0] == "Wed,") { var week = lang.date.weeks.Wed } else if (args2[0] == "Thu,") { var week = lang.date.weeks.Thur } else if (args2[0] == "Fri,") { var week = lang.date.weeks.Fir } else if (args2[0] == "Sat,") { var week = lang.date.weeks.Sat } else if (args2[0] == "Sun,") { var week = lang.date.weeks.Sun }
                    let hor2 = member2.user.createdAt.getUTCHours(8); let H2 = (hor2 + 8) + args2[4].substring(2); time2 = args2[3] + " " + H2 + " " + mon + " " + args2[1] + `${lang.date.date} ` + week + " UTC+8"
                }
            }
        }
        if (message.guild.members.cache.has(member.id)) {
            member2 = message.guild.members.cache.get(member.id);
        }
        if (Bott === "true") { var Bot = lang.word.yes } else if (Bott === "false") { var Bot = lang.word.no } else { var Bot = lang.word.no }
        if (presence === "online") { var online = h.status.online } else if (presence === "idle") { var online = h.status.afk } else if (presence === "dnd") { var online = h.status.dnd } else if (presence === "offline") { var online = h.status.offline } else { var online = h.status.offline }
        let joindate = null; let nick = null;
        if (member.id == message.author.id) { joindate = h.user.firstJoin } else { joindate = h.user.lastJoin }
        let act = "(未知)"; let gameact = null; let gameing = null;
        if (member.presence) {
            if (member.presence && member.presence.activities[0] != undefined) {
                if (member.presence.activities[0].name === "Custom Status") { if (member.presence.activities[0].emoji) { act = member.presence.activities[0].emoji.name + member.presence.activities[0].state } else { act = member.presence.activities[0].state } } else { act = lang.word.none }
            } else { act = lang.word.none; gameact = lang.word.none; gameing = "" }
            if (member.presence.activities && member.presence.activities[1] != undefined || member.presence.activities && member.presence.activities[0] != undefined) {
                if (member.presence.activities[0].name != "Custom Status") {
                    let gm = member.presence.activities[0].type
                    if (gm == "PLAYING") { gameing = h.user.gaming.Playing } else if (gm == "STREAMING") { gameing = h.user.gaming.Streaming } else if (gm == "LISTENING") { gameing = h.user.gaming.Listening } else if (gm == "WATCHING") { gameing = h.user.gaming.Watching } else { gameing = "" }
                    gameact = member.presence.activities[0].name
                } else if (member.presence.activities[0].name != "Custom Status") {
                    let gm = member.presence.activities[1].type
                    if (gm == "PLAYING") { gameing = h.user.gaming.Playing } else if (gm == "STREAMING") { gameing = h.user.gaming.Streaming } else if (gm == "LISTENING") { gameing = h.user.gaming.Listening } else if (gm == "WATCHING") { gameing = h.user.gaming.Watching } else { gameing = "" }
                    gameact = member.presence.activities[1].name
                } else { gameact = lang.word.none; gameing = "" }
            } else { gameact = lang.word.none; gameing = "" }
        }
        if (member2.nickname == null) { nick = "" } else { nick = "(" + member2.nickname + ")" }
        Mongo.loadUser(clientDB, member.id).then((user) => {
            if (user === false) {
                const infoEmbed = new Discord.MessageEmbed()
                    .setColor(clour)
                    .setTitle(h.user.name + " " + member.user.username + "#" + member.user.discriminator + ` ${nick}`, true)
                    .setDescription("ID:  " + member.id + `\n[[📄Link]](https://discordapp.com/users/${member.id})`, true)
                    .setThumbnail(member.user.displayAvatarURL({ format: "png", dynamic: true, size: 512 }), true)
                    .addField(h.user.bot, Bot, true)
                    .addField(h.user.status, online, true)
                    .addField(h.user.act, act, true)
                    .addField(h.user.gameAct, `${gameing} ${gameact}`, true)
                    .addField(h.user.joinTime + joindate, `${time}`, false)
                    .addField(h.user.createTime, `${time2}`, true)
                    .setFooter(h.user.footer.user).setTimestamp()
                return message.channel.send({ embeds: [infoEmbed] });
            } else {
                let mary = [user.marry]
                if (mary != "[object Object]" || mary != "") {
                    const member = bot.users.cache.get(user.marry)
                    if (member) {
                        var mary2 = member.username + "#" + member.discriminator
                    } else { var mary2 = h.user.emotion.alone }
                } else { var mary2 = h.user.emotion.alone }
                if (user.hostname != "[object Object]" || user.hostname != "") { var host = user.hostname } else { var host = h.user.emotion.none }
                if (user.petname != "[object Object]" || user.petname != "") { var pet = user.petname } else { var pet = h.user.emotion.none }
                let role = ""
                if (user.role.indexOf("S1_moneyA") != -1) {
                    role = role + "[S1百萬富翁]"
                }
                if (user.role.indexOf("S1_moneyB") != -1) {
                    role = role + "[S1富豪]"
                }
                if (user.role.indexOf("S1_moneyC") != -1) {
                    role = role + "[S1土豪]"
                }
                if (user.role.indexOf("S1_rankA") != -1) {
                    role = role + "[S1智乃玩弄者]"
                }
                if (user.role.indexOf("S1_rankB") != -1) {
                    role = role + "[S1智乃愛好者]"
                }
                if (user.role.indexOf("S1_rankC") != -1) {
                    role = role + "[S1智乃追隨者]"
                }
                if (user.role.indexOf("Bot_owner") != -1) {
                    role = role + "[智乃開發者]"
                }
                const infoEmbed = new Discord.MessageEmbed()
                    .setColor(clour)
                    .setTitle(h.user.name + member.user.username + "#" + member.user.discriminator + ` ${nick}`, true)
                    .setDescription(`Role: ${role}\n` + "ID:  " + member.id + `\n[[📄Link]](https://discordapp.com/users/${member.id})`, true)
                    .setThumbnail(member.user.displayAvatarURL({ format: "png", dynamic: true, size: 512 }), true)
                    .addField(h.user.bot, Bot, true)
                    .addField(h.user.status, online, true)
                    .addField(h.user.act, act, true)
                    .addField(h.user.gameAct, `${gameing} ${gameact}`, true)
                    .addField(h.user.money, user.money.toString(), false)
                    .addField(h.user.emotion["?"], mary2, true)
                    .addField(h.user.host, "឵ ឵឵" + host, false)
                    .addField(h.user.pet, "឵ ឵឵" + pet, false)
                    .addField(h.user.joinTime + joindate, `${time}`, false)
                    .addField(h.user.createTime, `${time2}`, true)
                    .setFooter(h.user.footer.user + h.user.footer.data + p + "card" + h.user.footer.data2).setTimestamp()
                return message.channel.send({ embeds: [infoEmbed] });
            }
        }
        )
    }
}
async function server(bot, message, ag, language) {
    let lang = lan.zh_TW, h = infoX.zh_TW
    if (language === "zh_TW") { lang = lan.zh_TW; h = infoX.zh_TW } else if (language === "zh_CN") { lang = lan.zh_CN; h = infoX.zh_CN } else if (language === "ja_JP") {
        lang = lan.ja_JP; h = infoX.ja_JP
    } else if (language === "en_US") { lang = lan.en_US; h = infoX.en_US }
    if (!message.guild) return;
    let guild = null
    if (ag[0] != null) {
        guild = bot.guilds.cache.get(ag[0])
    } else {
        guild = message.guild;
    }
    let args = guild.createdAt.toUTCString().split(" ")
    if (args[2] == "Jan") { var mon = lang.date.months[1] } else if (args[2] == "Feb") { var mon = lang.date.months[2] } else if (args[2] == "Mar") { var mon = lang.date.months[3] } else if (args[2] == "Apr") { var mon = lang.date.months[4] } else if (args[2] == "May") { var mon = lang.date.months[5] } else if (args[2] == "Jun") { var mon = lang.date.months[6] } else if (args[2] == "Jul") { var mon = lang.date.months[7] } else if (args[2] == "Aug") { var mon = lang.date.months[8] } else if (args[2] == "Sep") { var mon = lang.date.months[9] } else if (args[2] == "Oct") { var mon = lang.date.months[10] } else if (args[2] == "Nov") { var mon = lang.date.months[11] } else if (args[2] == "Dec") { var mon = lang.date.months[12] }; if (args[0] == "Mon,") { var week = lang.date.weeks.Mon } else if (args[0] == "Tue,") { var week = lang.date.weeks.Tue } else if (args[0] == "Wed,") { var week = lang.date.weeks.Wed } else if (args[0] == "Thu,") { var week = lang.date.weeks.Thur } else if (args[0] == "Fri,") { var week = lang.date.weeks.Fir } else if (args[0] == "Sat,") { var week = lang.date.weeks.Sat } else if (args[0] == "Sun,") { var week = lang.date.weeks.Sun }
    let hor = guild.createdAt.getUTCHours(8); let H = (hor + 8) + args[4].substring(2); let time = args[3] + " " + H + " " + mon + " " + args[1] + `${lang.date.date} ` + week + " UTC+8"
    let rolemap = guild.roles.cache.sort((a, b) => b.position - a.position).map(r => r).join("\n"); if (rolemap.length > 1024) rolemap = "To many roles to display"; if (!rolemap) rolemap = "No roles";
    let emojilist = guild.emojis.cache.map(em => em).filter(em => !em.animated)
    let emojilist2 = guild.emojis.cache.map(em => em).filter(em => em.animated)
    var b = 1; var c = 1;
    for (let a = 0; a < emojilist.length; a++) { if (b == "8") { emojilist.splice(a, 0, "\n"); b = 1 } else { ; b++ } }
    for (let a = 0; a < emojilist2.length; a++) { if (c == "8") { emojilist2.splice(a, 0, "\n"); c = 1 } else { c++ } }
    setTimeout(async () => {
        emojilist = emojilist.join(" ");
        emojilist2 = emojilist2.join(" ")
        if (guild.emojis.cache.map(em => em).filter(em => !em.animated).toString().length > 1024) emojilist = "To many emoji to display"; if (!emojilist) emojilist = "No emojis";
        if (guild.emojis.cache.map(em => em).filter(em => em.animated).toString().length > 1024) emojilist2 = "To many emoji to display"; if (!emojilist2) emojilist2 = "No emojis";
        let owner = await guild.fetchOwner()
        const infoEmbed = new Discord.MessageEmbed()
            .setColor('#3aad48')
            .setTitle(`${h.guild.server}` + guild.name, true)
        infoEmbed.setDescription("ID:  " + guild.id, true)
        infoEmbed.setThumbnail(guild.iconURL({ format: "png", dynamic: true, size: 512 }), true)
        try { infoEmbed.addField(h.guild.owner, `<@${owner.user.id}> \n${owner.user.username}#${owner.user.discriminator}`, true) } catch (error) { infoEmbed.addField(h.guild.owner, h.guild.owner_error, true) }
        infoEmbed.addField(h.guild.server + h.guild.area, `${guild.region}`, true)
        infoEmbed.addField(h.guild.avatar, "  ---->", true)
        infoEmbed.addField(`${h.guild.member.all}` + guild.memberCount, `${h.guild.member.member}` + guild.members.cache.filter(member => !member.user.bot).size + `\n` + `${h.guild.member.bot} ` + guild.members.cache.filter(users => users.user.bot).size, true)
        try { infoEmbed.addField(h.status.member + guild.presences.cache.size, `${h.status.online} ` + guild.presences.cache.filter(user => user.member.presence.status === 'online').size + `\n` + `${h.status.afk} ` + guild.presences.cache.filter(user => user.member.presence.status === 'idle').size + `\n` + `${h.status.dnd} ` + guild.presences.cache.filter(user => user.member.presence.status === 'dnd').size + "\n" + `${h.status.offline} ` + guild.members.cache.filter(user => user.presence.status === 'offline').size, true) } catch { infoEmbed.addField(h.status.member, h.status.error, true) }
        infoEmbed.addField(h.guild.channel.all + guild.channels.cache.size, h.guild.channel.category + guild.channels.cache.filter(c => c.type === "category").size + "\n" + h.guild.channel.text + guild.channels.cache.filter(c => c.type === "text").size + '\n' + h.guild.channel.voice + guild.channels.cache.filter(c => c.type === "voice").size + '\n' + h.guild.channel.news + guild.channels.cache.filter(c => c.type === "news").size + '\n' + h.guild.channel.store + guild.channels.cache.filter(c => c.type === "store").size, true)
        infoEmbed.addField(h.guild.emoji.all + guild.emojis.cache.size, h.guild.emoji.emoji + guild.emojis.cache.filter(emojis => !emojis.animated).size + "\n" + h.guild.emoji.gif + guild.emojis.cache.filter(emojis => emojis.animated).size, true)
        infoEmbed.addField(h.guild.boosts.all + "Lv." + guild.premiumTier, h.guild.boosts.level + guild.premiumTier + "\n" + h.guild.boosts.boost + guild.premiumSubscriptionCount, true)
        infoEmbed.addField(h.guild.role + `${guild.roles.cache.size}`, `${rolemap}`, true)
        infoEmbed.addField(`\n${h.guild.emoji.emoji}\n`, emojilist.toString(), true)
        infoEmbed.addField(`\n${h.guild.emoji.gif}\n`, emojilist2.toString(), true)
        infoEmbed.addField(h.guild.verification, guild.verificationLevel)
        infoEmbed.addField(h.guild.createTime, time)
        return message.channel.send({ embeds: [infoEmbed] });
    }, 500);
}
const helpX = require('../language/help.json');
const Open = new Date()
async function botinfo(bot, message, ag, language) {
    let prefix = bot.prefix
    let lang = lan.zh_TW, h = infoX.zh_TW, help = helpX.zh_TW
    if (language === "zh_TW") { lang = lan.zh_TW; h = infoX.zh_TW; help = helpX.zh_TW } else if (language === "zh_CN") { lang = lan.zh_CN; h = infoX.zh_CN; help = helpX.zh_CN } else if (language === "ja_JP") {
        lang = lan.ja_JP; h = infoX.ja_JP; help = helpX.ja_JP
    } else if (language === "en_US") { lang = lan.en_US; h = infoX.en_US; help = helpX.en_US }
    let Today = new Date();
    let member = bot.user
    const member2 = message.guild.me
    let args = message.guild.me.joinedAt.toUTCString().split(" ")
    if (args[2] == "Jan") { var mon = lang.date.months[1] } else if (args[2] == "Feb") { var mon = lang.date.months[2] } else if (args[2] == "Mar") { var mon = lang.date.months[3] } else if (args[2] == "Apr") { var mon = lang.date.months[4] } else if (args[2] == "May") { var mon = lang.date.months[5] } else if (args[2] == "Jun") { var mon = lang.date.months[6] } else if (args[2] == "Jul") { var mon = lang.date.months[7] } else if (args[2] == "Aug") { var mon = lang.date.months[8] } else if (args[2] == "Sep") { var mon = lang.date.months[9] } else if (args[2] == "Oct") { var mon = lang.date.months[10] } else if (args[2] == "Nov") { var mon = lang.date.months[11] } else if (args[2] == "Dec") { var mon = lang.date.months[12] }; if (args[0] == "Mon,") { var week = lang.date.weeks.Mon } else if (args[0] == "Tue,") { var week = lang.date.weeks.Tue } else if (args[0] == "Wed,") { var week = lang.date.weeks.Wed } else if (args[0] == "Thu,") { var week = lang.date.weeks.Thur } else if (args[0] == "Fri,") { var week = lang.date.weeks.Fir } else if (args[0] == "Sat,") { var week = lang.date.weeks.Sat } else if (args[0] == "Sun,") { var week = lang.date.weeks.Sun }
    let hor = member2.joinedAt.getUTCHours(8); let H = (hor + 8) + args[4].substring(2); let time = args[3] + " " + H + " " + mon + " " + args[1] + `${lang.date.date} ` + week + " UTC+8"
    let args2 = member2.user.createdAt.toUTCString().split(" ")
    if (args2[2] == "Jan") { var mon = lang.date.months[1] } else if (args2[2] == "Feb") { var mon = lang.date.months[2] } else if (args2[2] == "Mar") { var mon = lang.date.months[3] } else if (args2[2] == "Apr") { var mon = lang.date.months[4] } else if (args2[2] == "May") { var mon = lang.date.months[5] } else if (args2[2] == "Jun") { var mon = lang.date.months[6] } else if (args2[2] == "Jul") { var mon = lang.date.months[7] } else if (args2[2] == "Aug") { var mon = lang.date.months[8] } else if (args2[2] == "Sep") { var mon = lang.date.months[9] } else if (args2[2] == "Oct") { var mon = lang.date.months[10] } else if (args2[2] == "Nov") { var mon = lang.date.months[11] } else if (args2[2] == "Dec") { var mon = lang.date.months[12] }; if (args2[0] == "Mon,") { var week = lang.date.weeks.Mon } else if (args2[0] == "Tue,") { var week = lang.date.weeks.Tue } else if (args2[0] == "Wed,") { var week = lang.date.weeks.Wed } else if (args2[0] == "Thu,") { var week = lang.date.weeks.Thur } else if (args2[0] == "Fri,") { var week = lang.date.weeks.Fir } else if (args2[0] == "Sat,") { var week = lang.date.weeks.Sat } else if (args2[0] == "Sun,") { var week = lang.date.weeks.Sun }
    let hor2 = member2.user.createdAt.getUTCHours(8); let H2 = (hor2 + 8) + args2[4].substring(2); let time2 = args2[3] + " " + H2 + " " + mon + " " + args2[1] + `${lang.date.date} ` + week + " UTC+8"
    let day = (Today.getDate() - Open.getDate())
    if (Today.getHours() - Open.getHours() < 0 || Today.getHours() - Open.getHours() != 0) { day - 1; var hour = 24 - (Today.getHours() - Open.getHours()) } else { var hour = (Today.getHours() - Open.getHours()) }
    const infoEmbed = new Discord.MessageEmbed()
        .setColor('#3aad48')
        .setThumbnail(member.displayAvatarURL({ format: "png", dynamic: true, size: 512 }))
        .setTitle(h.bot.info + member.username + "#" + member.discriminator, true)
        .setDescription("ID:  " + member.id, true)
        .addField(h.bot.prefix, prefix, true)
        .addField(h.bot.version, `${version}`, true)
        .addField(h.bot.from, "JS(JavaScript) / Discord.js")
        .addField(h.bot.from_version + " node.js/discord.js", "16.6.1(win7 32bit) / 13.1.0")
        .addField(h.bot.guild, `${bot.guilds.cache.size}`, true)
        .addField(h.bot.bootup, day + lang.date.day + hour + lang.time.hour + (Today.getMinutes() - Open.getMinutes()) + lang.time.minute, true)
        .addField(h.bot.inviteTime, `${time}`)
        .addField(h.bot.createTime, `${time2}`, true)
        .setTimestamp()
        .setFooter(help.word.creater + help.word.me, 'https://images-ext-2.discordapp.net/external/z2VL24Kx8kArxG96MNM-GsQf1oMKADfewPobcVW41sk/%3Fv%3D1/https/cdn.discordapp.com/emojis/681075641096863868.png')
    return message.channel.send({ embeds: [infoEmbed] });
}