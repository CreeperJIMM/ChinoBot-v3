//智乃小幫手主程式
//機器人啟動代碼
//製作 BY 苦力怕怕#8558 @2022
////all rights reserved//////
///// 版權所有 請勿竊取 //////
/////// Version 8.0 /////////
//-------------------------//
const { Client, Intents } = require("discord.js");
const Discord = require("discord.js")
const Mongo = require("./lib/MongoData/index")
const fs = require('fs');
let mongo_token = process.env["mongo_token"]
start()

function start() {
    //Discord
    const client = new Client({intents: [Intents.FLAGS.GUILDS,"GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES","GUILD_PRESENCES","GUILD_MEMBERS","GUILD_VOICE_STATES"] })
    const { DiscordTogether } = require('discord-together');
    client.discordTogether = new DiscordTogether(client);
    //Mongo
    const MongoClient = require('mongodb').MongoClient;
    const clientDB = new MongoClient(mongo_token, { useNewUrlParser: true, useUnifiedTopology: true });
    clientDB.connect(err => {
        console.log("[MangoDB] 連接成功")
    });
    const token = process.env["discord_token_3"]
    const prefix = process.env["discord_prefix_3"]
    const version = process.env["discord_version_3"]
    //cooldown
    client.cooldown = new Set()
    client.channelcooldown = new Set()
    //user&guild cache
    client.UserCache = new Map();
    client.GuildCache = new Map();
    setInterval(() => {
        client.UserCache.clear()
        client.GuildCache.clear()
      }, 30000);
    //definition
    client.prefix = prefix
    client.version = version
    client.times = 0
    client.bot = 3
    //bot satus
    let onlineSET = require("./lib/BotOnline")
    client.once('ready', async () => {
        onlineSET.main1(client,3,clientDB)
        return console.log(`智乃機器人測試號讀取成功! 版本: ${version} Time: ` + new Date().toUTCString());
    });

    //event
    client.commands = new Discord.Collection()
    let event = []
    let eventfiles = fs.readdirSync("./chinobot/events")
    console.log("events file:" + eventfiles)
    for (file of eventfiles) {
        let w = require(`./events/${file}`)
        for (sd of w) {
            event.push(sd)
        }
    };
    for (file of event) {
        try {
            w = function (fun) {
                return function (...a) {
                    try {
                        fun(client,clientDB, ...a)
                    } catch (error) {
                        throw error;
                    }
                }
            }
            if(file.fit.indexOf(3) != -1) client[file.type](file.name, w(file.fun))
        } catch (error) {
            console.log(`file:${file.name}\nError:\n`)
            throw error;
        }
    }
    //Language
    client.command = fs.readdirSync(`./chinobot/commands/`)
    let languages = {}
    for (let i of fs.readdirSync("./chinobot/language/")) {
        let filename = i.split(".")[0]
        languages[`${filename}`] = JSON.parse(fs.readFileSync(`./chinobot/language/${i}`))
    }
    languages.lan = JSON.parse(fs.readFileSync("./chinobot/language/lang.json"))
    client.languages = languages
    //bot cmd
    let BotFun = require("./lib/BotCommand")
    BotFun.forEach(element => {
        client[element.name] = element.fun
    });
    //Slash command
    let slash = require("./lib/slashCommand")
    slash.main(client,clientDB,prefix)
    //start bot
    console.log(`該程序目前總共使用了${Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100}MB的RAM`)

    client.login(token);
}