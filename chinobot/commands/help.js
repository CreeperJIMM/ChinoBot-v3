const Discord = require("discord.js")
const version = process.env["discord_version"]
const lan = require('../language/lang.json');
const helpX = require('../language/help.json');
const fs = require("fs")

module.exports = {
    "help":{
        description: {zh_TW:"智乃幫助頁面",en_US:"Chino help page.",ja_JP:""},
        authority: "everyone",
        instructions: "help",
        category: "normal",
        vote: false,
        help: false,
        fun: function (bot, message,clientDB,language,args, ...ag) { 
            let lang = lan.zh_TW,h = helpX.zh_TW
            if(language === "zh_TW") {lang = lan.zh_TW;h = helpX.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;h = helpX.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;h = helpX.ja_JP
            }else if(language === "en_US") {lang = lan.en_US;h = helpX.en_US}
            let BUTTON1 = new Discord.MessageButton().setStyle('LINK')
            let BUTTON2 = new Discord.MessageButton().setStyle('LINK')
            let BUTTON3 = new Discord.MessageButton().setStyle('LINK')
            let BUTTON4 = new Discord.MessageButton().setStyle('LINK')
            let row = new Discord.MessageActionRow().addComponents([
                BUTTON1.setLabel("點我邀請到你的Server!").setURL('https://discord.com/oauth2/authorize?client_id='+bot.user.id+'&scope=applications.commands%20bot&permissions=1476668478'),
                BUTTON2.setLabel("官方網站").setURL("https://dckabicord.com/main"),
                BUTTON3.setLabel("官方群組").setURL("https://discord.gg/P2yg5V2"),
                BUTTON4.setLabel("官方文檔(Beta)").setURL("https://docs.dckabicord.com/")
            ])
            const helpEmbed = new Discord.MessageEmbed()
            .setColor('#2d9af8')
            .setAuthor(bot.user.username + "#" + bot.user.discriminator+` `+h.help.command+`  V.${version}` , bot.user.displayAvatarURL())
            .setDescription(h.help.desc +p+ h.help.desc2 +p+ h.help.desc3)
            .addField(h.help.addA ,h.help.addF +p+h.help.addF2+p+h.help.addF3+p+h.help.addF4+p+h.help.addF5+p+h.help.addF6+bot.user.id+h.help.addF7+p+h.help.addF8+p+h.help.addF9)
            .setFooter(h.word.all, 'https://images-ext-2.discordapp.net/external/z2VL24Kx8kArxG96MNM-GsQf1oMKADfewPobcVW41sk/%3Fv%3D1/https/cdn.discordapp.com/emojis/681075641096863868.png');
            return message.channel.send({embeds: [helpEmbed],components:[row]});
        }
    },
    "oldcommand":{
        description: {zh_TW:"指令幫助頁面",en_US:"Command help page.",ja_JP:""},
        authority: "everyone",
        instructions: "command [function]",
        category: "normal",
        vote: false,
        help: false,
        fun: function (bot, message,clientDB,language,args, ...ag) { 
            return help(bot,message,language,args)
        }
    },
    "oldcmd":{
        description: {zh_TW:"指令幫助頁面",en_US:"Command help page.",ja_JP:""},
        authority: "everyone",
        instructions: "command [function]",
        vote: false,
        help: false,
        fun: function (bot, message,clientDB,language,args, ...ag) { 
            return help(bot,message,language,args)
        }
    },
    "cmd":{
        description: {zh_TW:"指令幫助頁面",en_US:"Command help page.",ja_JP:""},
        authority: "everyone",
        instructions: "newcommand [function]",
        vote: false,
        help: false,
        fun: function (bot, message,clientDB,language,args, ...ag) {
            return newcmd(bot,message,language,args)
        }
    },
    "command":{
        description: {zh_TW:"指令幫助頁面",en_US:"Command help page.",ja_JP:""},
        authority: "everyone",
        instructions: "newcommand [function]",
        vote: false,
        help: false,
        fun: function (bot, message,clientDB,language,args, ...ag) {
            return newcmd(bot,message,language,args)
        }
    },
    "invite":{
        description: {zh_TW:"智乃邀請頁面",en_US:"Chino invite page.",ja_JP:""},
        authority: "everyone",
        instructions: "invite",
        category: "normal",
        vote: false,
        help: false,
        fun: function (bot, message,clientDB,language,args, ...ag) { 
            let lang = lan.zh_TW,h = helpX.zh_TW
            if(language === "zh_TW") {lang = lan.zh_TW;h = helpX.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;h = helpX.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;h = helpX.ja_JP
            }else if(language === "en_US") {lang = lan.en_US;h = helpX.en_US}
            const invEmbed = new Discord.MessageEmbed()
            .setColor('#2d9af8')
            .setTitle(h.invite.inv)
            .setURL('https://discord.com/oauth2/authorize?client_id='+bot.user.id+'&scope=applications.commands%20bot&permissions=2134900215')
            .setAuthor(bot.user.username + "#" + bot.user.discriminator, bot.user.displayAvatarURL())
            .setDescription(`${h.invite.desc}${bot.user.id}${h.invite.desc2}`)
            .setThumbnail('https://cdn.discordapp.com/attachments/611040945495998464/732973619319275640/289100043sq324qp55p7.gif')
            .addFields(
              { name: h.invite.addF.a1, value: h.invite.addF.v1 },
              { name: lang.word.chino, value: h.invite.addF.cocoa, inline: true },
              { name: h.invite.addF.tippy, value: h.invite.addF.other, inline: true },
            )
            .addField(h.invite.addF2.a1,h.invite.addF2.v1, true)
            .setImage('https://cdn.discordapp.com/attachments/611040945495998464/732975856754098236/78469703_p0.jpg')
            .setFooter( h.word.all, 'https://images-ext-2.discordapp.net/external/z2VL24Kx8kArxG96MNM-GsQf1oMKADfewPobcVW41sk/%3Fv%3D1/https/cdn.discordapp.com/emojis/681075641096863868.png');
            return message.channel.send({embeds: [invEmbed]});
        }
    },
    "inv":{
        description: {zh_TW:"智乃邀請頁面",en_US:"Chino invite page.",ja_JP:""},
        authority: "everyone",
        instructions: "inv",
        vote: false,
        help: false,
        fun: function (bot, message,clientDB,language,args, ...ag) { 
            let lang = lan.zh_TW,h = helpX.zh_TW
            if(language === "zh_TW") {lang = lan.zh_TW;h = helpX.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;h = helpX.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;h = helpX.ja_JP
            }else if(language === "en_US") {lang = lan.en_US;h = helpX.en_US}
            const invEmbed = new Discord.MessageEmbed()
            .setColor('#2d9af8')
            .setTitle(h.invite.inv)
            .setURL('https://discord.com/oauth2/authorize?client_id='+bot.user.id+'&scope=applications.commands%20bot&permissions=2134900215')
            .setAuthor(bot.user.username + "#" + bot.user.discriminator, bot.user.displayAvatarURL())
            .setDescription(`${h.invite.desc}${bot.user.id}${h.invite.desc2}`)
            .setThumbnail('https://cdn.discordapp.com/attachments/611040945495998464/732973619319275640/289100043sq324qp55p7.gif')
            .addFields(
              { name: h.invite.addF.a1, value: h.invite.addF.v1 },
              { name: lang.word.chino, value: h.invite.addF.cocoa, inline: true },
              { name: h.invite.addF.tippy, value: h.invite.addF.other, inline: true },
            )
            .addField(h.invite.addF2.a1,h.invite.addF2.v1, true)
            .setImage('https://cdn.discordapp.com/attachments/611040945495998464/732975856754098236/78469703_p0.jpg')
            .setFooter( h.word.all, 'https://images-ext-2.discordapp.net/external/z2VL24Kx8kArxG96MNM-GsQf1oMKADfewPobcVW41sk/%3Fv%3D1/https/cdn.discordapp.com/emojis/681075641096863868.png');
            return message.channel.send({embeds: [invEmbed]});
        }
    },
    "ver":{
        description: {zh_TW:"智乃版本頁面",en_US:"Chino version page.",ja_JP:""},
        authority: "everyone",
        instructions: "ver [page]",
        vote: false,
        help: false,
        fun: function (bot, message,clientDB,language,args, ...ag) { 
            if(ag[0] == "1") {
                ver1(bot,message,language)
            }else if(ag[0] == "2") {
                ver2(bot,message,language)
            }else if(ag[0] == "3") {
                ver3(bot,message,language)
            }else if(ag[0] == "4") {
                ver4(bot,message,language)
            }else{
                return execute(bot,message,p,language)
        }}
    },
    "version":{
        description: {zh_TW:"智乃版本頁面",en_US:"Chino version page.",ja_JP:""},
        authority: "everyone",
        instructions: "version [page]",
        category: "normal",
        vote: false,
        help: false,
        fun: function (bot, message,clientDB,language,args, ...ag) { 
            if(ag[0] == "1") {
                ver1(bot,message,language)
            }else if(ag[0] == "2") {
                ver2(bot,message,language)
            }else if(ag[0] == "3") {
                ver3(bot,message,language)
            }else if(ag[0] == "4") {
                ver4(bot,message,language)
            }else{
                return execute(bot,message,p,language)
        }}
    },
}
async function execute(bot,message,language) {
    let lang = lan.zh_TW,h = helpX.zh_TW
    let p = client.prefix
    if(language === "zh_TW") {lang = lan.zh_TW;h = helpX.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;h = helpX.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;h = helpX.ja_JP
    }else if(language === "en_US") {lang = lan.en_US;h = helpX.en_US}
const helpEmbed = new Discord.MessageEmbed()
.setColor('#2d9af8')
.setAuthor(bot.user.username + "#" + bot.user.discriminator+` ${h.word.ver} ${version}` , bot.user.displayAvatarURL())
.setDescription(h.ver.ver)
.addField(`${h.ver.use} ${p} ver [${h.ver.pages}]`, `${h.ver.all} 4 ${h.ver.page}`)
.setTimestamp()
.setFooter(`[${h.ver.the} 0 ${h.ver.page}]\n${h.word.creater} ${h.word.me}  ◆v.${version} \n${h.word.copy}  `, 'https://images-ext-2.discordapp.net/external/z2VL24Kx8kArxG96MNM-GsQf1oMKADfewPobcVW41sk/%3Fv%3D1/https/cdn.discordapp.com/emojis/681075641096863868.png');
{message.channel.send({embeds: [helpEmbed]})};
}
async function ver1(bot,message,language) {
    let lang = lan.zh_TW,h = helpX.zh_TW
    if(language === "zh_TW") {lang = lan.zh_TW;h = helpX.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;h = helpX.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;h = helpX.ja_JP
    }else if(language === "en_US") {lang = lan.en_US;h = helpX.en_US}
    const helpEmbed = new Discord.MessageEmbed()
    .setColor('#2d9af8')
    .setAuthor(bot.user.username + "#" + bot.user.discriminator+` ${h.word.ver} ${version}` , bot.user.displayAvatarURL())
    .setDescription(`${h.ver.ver} (1/4${h.ver.page})`)
    .addField('0.0.1 (7/14)', '機器人創立!')
    .addField('0.0.5 (7/14)','大頭貼指令完成,\n help初形')
    .addField('0.0.8 (7/15)','ping指令完成 ')
    .addField('0.1.0 (7/15)','智乃指令完成')
    .addField('0.1.2 (7/15)','help指令優化\n使用`prefix`+`config`')
    .addField('0.1.5 (7/15)','心愛指令完成')
    .addField('0.2.0 (7/15)','提比.S1.S2.Other完成!')
    .addField('0.2.2 (7/16)','邀請指令完成')
    .addField('0.2.8 (7/16)','伺服器資訊指令初形')
    .addField('0.3.0 (7/16)','大頭貼鑲入\n伺服器大頭貼完成!')
    .addField('0.3.2 (7/16)','伺服器資訊完成')
    .addField('0.3.5 (7/16)','Help指令鑲入')
    .addField('0.3.8 (7/16)','版本指令完成')
    .addField('0.4.0 (7/16)','麥塊IP查詢完成')
    .addField('0.4.5 (7/16)','DM修復,重新過濾智乃圖庫,設置18+')
    .addField('0.5.0 (7/17)','新增冷卻機制及關閉機制')
    .addField('0.5.2 (7/21)','優化gi &新增ui')
    .addField('0.6.0 (7/23)','新增清除指令/tts指令')
    .addField('0.7.0 (7/25)','新增踢出封鎖指令 優化say指令')
    .addField('0.8.0 (7/26)','更新圖庫,新增bi')
    .addField('0.9.0 (7/29)','修復&指令優化+新增猜拳指令')
    .setTimestamp()
    .setFooter(`[${h.ver.the} 1/4 ${h.ver.page}]\n${h.word.creater} ${h.word.me}   ◆v.${version} \n${h.word.copy}  `, 'https://images-ext-2.discordapp.net/external/z2VL24Kx8kArxG96MNM-GsQf1oMKADfewPobcVW41sk/%3Fv%3D1/https/cdn.discordapp.com/emojis/681075641096863868.png');
    {message.channel.send({embeds: [helpEmbed]})};
}
async function ver2(bot,message,language) {
    let lang = lan.zh_TW,h = helpX.zh_TW
    if(language === "zh_TW") {lang = lan.zh_TW;h = helpX.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;h = helpX.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;h = helpX.ja_JP
    }else if(language === "en_US") {lang = lan.en_US;h = helpX.en_US}
    const helpEmbed = new Discord.MessageEmbed()
    .setColor('#2d9af8')
    .setAuthor(bot.user.username + "#" + bot.user.discriminator+` ${h.word.ver} ${version}` ,  bot.user.displayAvatarURL())
    .setDescription(`${h.ver.ver} (2/4${h.ver.page})`)
    .addField('1.0.5 (8/4)','新增love指令')
    .addField('1.1.0 (8/5)','新增pick指令 新增頭貼使用ID')
    .addField('1.2.0 (8/6)','修復binfo加入資料/更新圖庫')
    .addField('1.3.0 (8/8)','sinfo新增功能/binfo新增功能')
    .addField('1.4.0 (8/10)','uinfo優化&新增功能/新增投票功能')
    .addField('1.5.0 (8/14)','點兔功能鑲入化')
    .addField('1.6.0 (8/16)','新增點兔功能統計')
    .addField('1.7.0 (8/20)','新增設置功能&動態頻道')
    .addField('1.8.0 (8/21)','指令優化/加入&離開設置')
    .addField('2.0.0 (8/27)','代碼全優化')
    .addField('2.1.0 (8/28)',"指令優化")
    .addField('2.2.0 (9/3)','英文版代碼併入中文版')
    .addField('2.3.0 (9/4)','新增經驗&金錢系統')
    .addField('2.4.0 (9/5)','新增排行榜')
    .addField('2.5.0 (9/6)','金錢連結點兔功能/語言設置')
    .addField('2.6.0 (9/6)','新增文字產生器/新增反饋指令')
    .addField('2.7.0 (9/12)','結婚系統!')
    .addField('2.8.0 (9/13)','修復Bug/snipe指令')
    .addField('2.8.5 (9/15)','修復Bug')
    .addField('2.8.6 (9/19)','修復Bug/access指令')
    .addField('2.8.7 (9/20)','修復Bug/優化prem指令')
    .addField('2.8.8 (9/20)','優化 help指令')
    .addField('2.9.0 (9/27)',"加入離開設置優化")
    .setTimestamp()
    .setFooter(`[${h.ver.the} 2/4 ${h.ver.page}]\n${h.word.creater} ${h.word.me}   ◆v.${version} \n${h.word.copy}  `, 'https://images-ext-2.discordapp.net/external/z2VL24Kx8kArxG96MNM-GsQf1oMKADfewPobcVW41sk/%3Fv%3D1/https/cdn.discordapp.com/emojis/681075641096863868.png');
    {message.channel.send({embeds: [helpEmbed]})};
}
async function ver3(bot,message,language) {
    let lang = lan.zh_TW,h = helpX.zh_TW
    if(language === "zh_TW") {lang = lan.zh_TW;h = helpX.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;h = helpX.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;h = helpX.ja_JP
    }else if(language === "en_US") {lang = lan.en_US;h = helpX.en_US}
    const helpEmbed = new Discord.MessageEmbed()
    .setColor('#2d9af8')
    .setAuthor(bot.user.username + "#" + bot.user.discriminator+` ${h.word.ver} ${version}` ,  bot.user.displayAvatarURL())
    .setDescription(`${h.ver.ver} (3/4${h.ver.page})`)
    .addField('3.0.0 (10/1)',"snipe 優化/新增成就")
    .addField('3.1.0 (10/8)',"寵物指令!")
    .addField('3.2.0 (10/9)',"修復Bug")
    .addField('3.3.0 (10/10)',"新增snipe參數")
    .addField('3.3.5 (10/11)',"新增S3指令")
    .addField('3.4.0 (10/14)',"Pay指令修復")
    .addField('3.5.0 (10/18)',"修復Bug")
    .addField('3.6.0 (10/19)',"等級系統優化")
    .addField('3.7.0 (10/24)',"修復動態語音\n新增gura指令\n點兔指令漲價")
    .addField('3.8.0 (10/25)',"修復動態文字\nosu指令")
    .addField('3.8.5 (10/27)',"萬聖節特別代碼")
    .addField('3.8.8 (10/31)',"移除萬聖節代碼")
    .addField('3.9.0 (11/14)',"公告指令 狀態指令\n修復部分bug")
    .setTimestamp()
    .setFooter(`[${h.ver.the} 3/4 ${h.ver.page}]\n${h.word.creater} ${h.word.me}   ◆v.${version} \n${h.word.copy}  `, 'https://images-ext-2.discordapp.net/external/z2VL24Kx8kArxG96MNM-GsQf1oMKADfewPobcVW41sk/%3Fv%3D1/https/cdn.discordapp.com/emojis/681075641096863868.png');
    {message.channel.send({embeds: [helpEmbed]})};
}
async function ver4(bot,message,language) {
    let lang = lan.zh_TW,h = helpX.zh_TW
    if(language === "zh_TW") {lang = lan.zh_TW;h = helpX.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;h = helpX.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;h = helpX.ja_JP
    }else if(language === "en_US") {lang = lan.en_US;h = helpX.en_US}
    const helpEmbed = new Discord.MessageEmbed()
    .setColor('#2d9af8')
    .setAuthor(bot.user.username + "#" + bot.user.discriminator+` ${h.word.ver} ${version}` , bot.user.displayAvatarURL())
    .setDescription(`${h.ver.ver} (4/4${h.ver.page})`)
    .addField('4.0.0 (10/1)',"新增fubuki chen  gay指令")
    .setTimestamp()
    .setFooter(`[${h.ver.the} 4/4 ${h.ver.page}]\n${h.word.creater} ${h.word.me}   ◆v.${version} \n${h.word.copy}  `, 'https://images-ext-2.discordapp.net/external/z2VL24Kx8kArxG96MNM-GsQf1oMKADfewPobcVW41sk/%3Fv%3D1/https/cdn.discordapp.com/emojis/681075641096863868.png');
    {message.channel.send({embeds: [helpEmbed]})};
}
async function help(bot,message,language,args) {
    let lang = lan.zh_TW,h = helpX.zh_TW
    let p = client.prefix
    if(language === "zh_TW") {lang = lan.zh_TW;h = helpX.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;h = helpX.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;h = helpX.ja_JP
    }else if(language === "en_US") {lang = lan.en_US;h = helpX.en_US}
    if(args[0] == "common") {
        const helpEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username + "#" + bot.user.discriminator+` ${h.word.command}  V.${version}` ,  bot.user.displayAvatarURL())
        .setColor('#2d9af8')
        .setTitle(h.command.common.title)
        .setDescription(h.command.common.cmd)
        .setTimestamp()
        .setFooter(`${h.word.creater} ${h.word.me}\n◆11 ${h.command.word.cmds} \n${h.word.copy}`, 'https://images-ext-2.discordapp.net/external/z2VL24Kx8kArxG96MNM-GsQf1oMKADfewPobcVW41sk/%3Fv%3D1/https/cdn.discordapp.com/emojis/681075641096863868.png');
        message.channel.send({embeds: [helpEmbed]});
    }else if(args[0] == "rabbit") {
        const helpEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username + "#" + bot.user.discriminator+` ${h.word.command}  V.${version}` ,  bot.user.displayAvatarURL())
        .setColor('#2d9af8')
        .setTitle(h.command.rabbit.title)
        .setDescription(h.command.rabbit.cmd)
        .setTimestamp()
        .setFooter(`${h.word.creater} ${h.word.me}\n◆10 ${h.command.word.cmds} \n${h.word.copy}`, 'https://images-ext-2.discordapp.net/external/z2VL24Kx8kArxG96MNM-GsQf1oMKADfewPobcVW41sk/%3Fv%3D1/https/cdn.discordapp.com/emojis/681075641096863868.png');
        message.channel.send({embeds: [helpEmbed]});
    }else if(args[0] == "admin") {
        const helpEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username + "#" + bot.user.discriminator+` ${h.word.command}  V.${version}` ,  bot.user.displayAvatarURL())
        .setColor('#2d9af8')
        .setTitle(h.command.admin.title)
        .setDescription(h.command.admin.cmd)
        .setTimestamp()
        .setFooter(`${h.word.creater} ${h.word.me}\n◆6 ${h.command.word.cmds} \n${h.word.copy}`, 'https://images-ext-2.discordapp.net/external/z2VL24Kx8kArxG96MNM-GsQf1oMKADfewPobcVW41sk/%3Fv%3D1/https/cdn.discordapp.com/emojis/681075641096863868.png');
        message.channel.send({embeds: [helpEmbed]});
    }else if(args[0] == "music") {
        const helpEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username + "#" + bot.user.discriminator+` ${h.word.command}  V.${version}` ,  bot.user.displayAvatarURL())
        .setColor('#2d9af8')
        .setTitle(h.command.music.title)
        .setDescription(h.command.music.cmd)
        .setTimestamp()
        .setFooter(`${h.word.creater} ${h.word.me}\n◆10+ ${h.command.word.cmds} \n${h.word.copy}`, 'https://images-ext-2.discordapp.net/external/z2VL24Kx8kArxG96MNM-GsQf1oMKADfewPobcVW41sk/%3Fv%3D1/https/cdn.discordapp.com/emojis/681075641096863868.png');
        message.channel.send({embeds: [helpEmbed]});
    }else if(args[0] == "other") {
        const helpEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username + "#" + bot.user.discriminator+` ${h.word.command}  V.${version}` , bot.user.displayAvatarURL())
        .setColor('#2d9af8')
        .setTitle(h.command.other.title)
        .setDescription(h.command.other.cmd)
        .setTimestamp()
        .setFooter(`${h.word.creater} ${h.word.me}\n◆6 ${h.command.word.cmds} \n${h.word.copy}`, 'https://images-ext-2.discordapp.net/external/z2VL24Kx8kArxG96MNM-GsQf1oMKADfewPobcVW41sk/%3Fv%3D1/https/cdn.discordapp.com/emojis/681075641096863868.png');
        message.channel.send({embeds: [helpEmbed]});
    }else if(args[0] == "money") {
        const helpEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username + "#" + bot.user.discriminator+` ${h.word.command}  V.${version}` , bot.user.displayAvatarURL())
        .setColor('#2d9af8')
        .setTitle(h.command.money.title)
        .setDescription(h.command.money.cmd)
        .setTimestamp()
        .setFooter(`${h.word.creater} ${h.word.me}\n◆5 ${h.command.word.cmds} \n${h.word.copy}`, 'https://images-ext-2.discordapp.net/external/z2VL24Kx8kArxG96MNM-GsQf1oMKADfewPobcVW41sk/%3Fv%3D1/https/cdn.discordapp.com/emojis/681075641096863868.png');
        message.channel.send({embeds: [helpEmbed]});
    }else if(args[0] == "level") {
        const helpEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username + "#" + bot.user.discriminator+` ${h.word.command}  V.${version}` , bot.user.displayAvatarURL())
        .setColor('#2d9af8')
        .setTitle(h.command.level.title)
        .setDescription(h.command.level.cmd)
        .setTimestamp()
        .setFooter(`${h.word.creater} ${h.word.me}\n◆2 ${h.command.word.cmds} \n${h.word.copy}`, 'https://images-ext-2.discordapp.net/external/z2VL24Kx8kArxG96MNM-GsQf1oMKADfewPobcVW41sk/%3Fv%3D1/https/cdn.discordapp.com/emojis/681075641096863868.png');
        message.channel.send({embeds: [helpEmbed]});
    }else if(args[0] == "user") {
        const helpEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username + "#" + bot.user.discriminator+` ${h.word.command}  V.${version}` , bot.user.displayAvatarURL())
        .setColor('#2d9af8')
        .setTitle(h.command.user.title)
        .setDescription(h.command.user.cmd)
        .setTimestamp()
        .setFooter(`${h.word.creater} ${h.word.me}\n◆7 ${h.command.word.cmds} \n${h.word.copy}`, 'https://images-ext-2.discordapp.net/external/z2VL24Kx8kArxG96MNM-GsQf1oMKADfewPobcVW41sk/%3Fv%3D1/https/cdn.discordapp.com/emojis/681075641096863868.png');
        message.channel.send({embeds: [helpEmbed]});
    }else if(args[0] == "game") {
        const helpEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username + "#" + bot.user.discriminator+` ${h.word.command}  V.${version}` , bot.user.displayAvatarURL())
        .setColor('#2d9af8')
        .setTitle(h.command.game.title)
        .setDescription(h.command.game.cmd)
        .setTimestamp()
        .setFooter(`${h.word.creater} ${h.word.me}\n◆11 ${h.command.word.cmds} \n${h.word.copy}`, 'https://images-ext-2.discordapp.net/external/z2VL24Kx8kArxG96MNM-GsQf1oMKADfewPobcVW41sk/%3Fv%3D1/https/cdn.discordapp.com/emojis/681075641096863868.png');
        message.channel.send({embeds: [helpEmbed]});
    }else if(args[0] == "text") {
        const helpEmbed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username + "#" + bot.user.discriminator+` ${h.word.command}  V.${version}` , bot.user.displayAvatarURL())
        .setColor('#2d9af8')
        .setTitle(h.command.text.title)
        .setDescription(h.command.text.cmd)
        .setTimestamp()
        .setFooter(`${h.word.creater} ${h.word.me}\n◆2 ${h.command.word.cmds} \n${h.word.copy}`, 'https://images-ext-2.discordapp.net/external/z2VL24Kx8kArxG96MNM-GsQf1oMKADfewPobcVW41sk/%3Fv%3D1/https/cdn.discordapp.com/emojis/681075641096863868.png');
        message.channel.send({embeds: [helpEmbed]});
    }else if(args[0] == "all") {
        const helpEmbed = new Discord.MessageEmbed()
        .setColor('#2d9af8')
        .setAuthor(bot.user.username + "#" + bot.user.discriminator+` ${h.word.command}  V.${version}` ,bot.user.displayAvatarURL())
        .setDescription('◆以下指令除了音樂功能, 其他都使用 `'+p+'` \n◆指令旁邊有寫數字代表你需要多少錢來使用此指令!')
        .addFields(
            { name: h.command.common.title , value: h.command.common.cmd, inline: true },
            { name: h.command.rabbit.title, value: h.command.rabbit.cmd, inline: true },
            { name: h.command.game.title, value: h.command.game.cmd, inline: true },
            { name: h.command.admin.title, value:  h.command.admin.cmd, inline: true },
            { name: h.command.music.title, value: h.command.music.cmd, inline: true },
            { name: h.command.other.title, value:h.command.other.cmd, inline: true },
            { name: h.command.money.title, value: h.command.money.cmd, inline: true},
            { name: h.command.level.title, value: h.command.level.cmd, inline: true},
            { name: h.command.user.title, value: h.command.user.cmd, inline: true},
            { name: h.command.text.title, value: h.command.text.cmd,inline: true}
            )
        .setTimestamp()
        .setFooter(`${h.word.creater} ${h.word.me}\n◆64 ${h.command.word.cmds} \n${h.word.copy}`, 'https://images-ext-2.discordapp.net/external/z2VL24Kx8kArxG96MNM-GsQf1oMKADfewPobcVW41sk/%3Fv%3D1/https/cdn.discordapp.com/emojis/681075641096863868.png');
        {message.channel.send({embeds: [helpEmbed]})};
    }else{
        const helpEmbed = new Discord.MessageEmbed()
        .setColor('#2d9af8')
        .setTitle(h.command.word.helpX)
        .setDescription(h.word.pass+" `"+p+h.command.word.help)
        .addField(h.command.word.addF, h.command.word.addV)
        .setFooter(`${h.word.creater} ${h.word.me}\n${h.word.copy}`)
        message.channel.send({embeds: [helpEmbed]})
    }
}
function newcmd(bot,message,language,args) {
    let lang = lan.zh_TW,h = helpX.zh_TW
    let p = client.prefix
    if(language === "zh_TW") {lang = lan.zh_TW;h = helpX.zh_TW}else if(language === "zh_CN") {lang = lan.zh_CN;h = helpX.zh_CN}else if(language === "ja_JP") {lang = lan.ja_JP;h = helpX.ja_JP
    }else if(language === "en_US") {lang = lan.en_US;h = helpX.en_US}
    let command = {}
    let commandfiles = fs.readdirSync("./commands")
    commandfiles.splice(7,1)
    for (file of commandfiles) {
        let q = require(`../commands/${file}`)
        Object.assign(command, q)
    }
    let a = ["other","admin","user","guild","game","normal","image","money","user","rank","text","undefined"]
    let b = {}
    a.forEach(element => {
          b[element] = []  
    });
    let number = 0
    for (const key in command) {
        if (Object.hasOwnProperty.call(command, key)) {
            const element = command[key];
            try {
                number++
                b[element.category].push(key)
            } catch (error) {
                console.log(element.category)
            }
        }
    }
    //console.log(b)
    if(args[0] === "all") {
        const helpEmbed = new Discord.MessageEmbed()
        .setColor('#2d9af8')
        .setAuthor(bot.user.username + "#" + bot.user.discriminator+` ${h.word.command}  V.${version}` ,bot.user.displayAvatarURL())
        .setDescription('◆以下指令都使用 `'+p+'` \n◆如果要查看詳細說明請打 `[指令] help` 例如: `cr!chino help`')
        .setTimestamp()
        .setFooter(`${h.word.creater} ${h.word.me}\n◆${number} ${h.command.word.cmds} \n${h.word.copy}`, 'https://images-ext-2.discordapp.net/external/z2VL24Kx8kArxG96MNM-GsQf1oMKADfewPobcVW41sk/%3Fv%3D1/https/cdn.discordapp.com/emojis/681075641096863868.png');
        let all = []
        for (const key in b) {
            if (Object.hasOwnProperty.call(b, key)) {
                const element = b[key];
                if(key != "undefined") {
                    all.push(key+" "+element.join("\n"))
                }
            }
        }
        all.sort(function(a, b) {
            return a - b;
        })
        setTimeout(() => {
            all.forEach(element => {
                let sp = element.split(" ")
                helpEmbed.addField(sp[0],sp[1],true) 
            });
            helpEmbed.fields.sort(function(a, b) {
                return b.name - a.name;
            })
            message.channel.send({embeds: [helpEmbed]})     
        }, 400);
    }else if(a.indexOf(args[0]) === -1) {
        const helpEmbed = new Discord.MessageEmbed()
        .setColor('#2d9af8')
        .setAuthor(bot.user.username + "#" + bot.user.discriminator+` ${h.word.command}  V.${version}` ,bot.user.displayAvatarURL())
        .setDescription(`◆請使用 \`${p}command [以下參數]\` 來查閱各類別的指令`)
        .setTimestamp()
        .setFooter(`${h.word.creater} ${h.word.me}\n◆${number} ${h.command.word.cmds} \n${h.word.copy}`, 'https://images-ext-2.discordapp.net/external/z2VL24Kx8kArxG96MNM-GsQf1oMKADfewPobcVW41sk/%3Fv%3D1/https/cdn.discordapp.com/emojis/681075641096863868.png');
        a.pop()
        helpEmbed.addField("[參數]",a.join("\n")+"\n或者你打 `all` 可以查看全部類別的指令",true)
        message.channel.send({embeds: [helpEmbed]})
    }else{
        const helpEmbed = new Discord.MessageEmbed()
        .setColor('#2d9af8')
        .setAuthor(bot.user.username + "#" + bot.user.discriminator+` ${h.word.command}  V.${version}` ,bot.user.displayAvatarURL())
        .setDescription('◆以下指令都使用 `'+p+'` \n◆如果要查看詳細說明請打 `[指令] help` 例如: `cr!chino help`')
        .setTimestamp()
        for (const key in b) {
            if (Object.hasOwnProperty.call(b, key)) {
                const element = b[key];
                    if(key === args[0]) {
                    if(key === "undefined") {
                    helpEmbed.addField("喔哇!","你找到了一個神奇的類別\n但這些指令有些可能不能用\n或是有些指令重複到了\n不然就是苦力怕怕才能使用的:P")
                    number = element.length
                    helpEmbed.addField(key,element.join("\n"),true)                                
                    }else{
                    number = element.length
                    helpEmbed.addField(key,element.join("\n"),true)
                    }
                }
            }
        }
        helpEmbed.setFooter(`${h.word.creater} ${h.word.me}\n◆${number} ${h.command.word.cmds} \n${h.word.copy}`, 'https://images-ext-2.discordapp.net/external/z2VL24Kx8kArxG96MNM-GsQf1oMKADfewPobcVW41sk/%3Fv%3D1/https/cdn.discordapp.com/emojis/681075641096863868.png');
        message.channel.send({embeds: [helpEmbed]})
}
}