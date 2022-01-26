let {banlist , why} = require('../banlist.json')
let adv = require("../lib/achievement")
let msgcmd = require("../lib/MessageCommand")
const fs = require('fs');
let command = {}
let languages = require("../language/lang.json")
let commandfiles = fs.readdirSync("./chinobot/commands")
let RunCommand = require("../lib/RunCommand")
let msgsay = require("../lib/detectSay")
let Mongo = require("../lib/MongoData/index")
console.log("commands file:" + commandfiles)
for (file of commandfiles) {
    let q = require(`../commands/${file}`)
    Object.assign(command, q)
}
module.exports = [
    {
        "name":"messageCreate",
        "type":"on",
        "fit": [1,2,3],
        "fun": async function(client,clientDB,msg) {  
        msgsay.detectsay(msg,client.bot,clientDB)  
        let prefix = client.prefix;
        let cooldown = client.cooldown
        let channelcooldown = client.channelcooldown
        let UserCache = client.UserCache
        let GuildCache = client.GuildCache
        if (msg.content.startsWith(prefix)) {
            if (!msg.guild) return;
            if (!msg.guild.me.permissions.has(['SEND_MESSAGES'])) return;
            if(!msg.guild.me.permissionsIn(msg.channel).has('SEND_MESSAGES')) return;
            if(!msg.guild.me.permissionsIn(msg.channel).has('VIEW_CHANNEL')) return;
            if (channelcooldown.has(msg.channel.id)) return;
            if (msg.author.bot) return;
            msgcmd.ifban(banlist,why,msg)
            let cache = UserCache.get(msg.author.id);
            if(!cache) {
              cache = await msgcmd.usercache(msg,cache,clientDB)
              UserCache.set(msg.author.id, cache);
            }
            let user2 = cache
            if (user2 === false) return RunCommand.main(client, msg, "zh_TW",clientDB,command);
              let uwu = GuildCache.get(msg.author.id);
              if(!uwu) {
                uwu = await msgcmd.guildcache(msg,uwu,clientDB)
                if(uwu === false) {
                  return RunCommand.main(client, msg,"zh_TW",clientDB,command)
                }
                GuildCache.set(msg.guild.id, uwu);
              }
              if(msgcmd.ifpicture(msg,uwu,prefix)) return msg.channel.send("⛔此指令被本群管理員禁止.\nThis command has been disabled by server admin.");
              if (cooldown.has(msg.author.id)) {
                if (user2.language) {
                  if(!languages[user2.language]) return;
                    let lsay = languages[user2.language].error.TooSpeed
                      msg.channel.send(lsay);
                      adv.speed(client, msg, user2.language,clientDB)
                      return;
                } else {
                    msg.channel.send("請等等再來使用此指令!\nplease wait.");
                    speed(client, msg)
                    return;
                  }
              } else {
                let userlang = user2.language
                return RunCommand.main(client, msg, userlang,clientDB,command);
            }
        }
        if(client.bot != 3) detectrank(msg,clientDB,client)
      }
      },
]
let rank = new Set();
function deleRank(message) {
    if (message.author.bot) return;
    setTimeout(() => { rank.delete(message.author.id) }, 120000)
}
let openServer = true;
setTimeout(() => {openServer = false;}, 40000);

let rankMain = require("../lib/Rank")
async function detectrank(message,clientDB,client) {
    if (message.author.bot) return;
    if(openServer) return;
        if (rank.has(message.author.id)) { return; }else{
        rank.add(message.author.id)
        deleRank(message)
        let cache= client.UserCache.get(message.author.id)
        if(!cache) {
            await Mongo.loadUser(clientDB,message.author.id).then((user) => {
            cache = user
            if(user === false) return rankMain.main(message,user,clientDB,client,1)
            client.UserCache.set(message.author.id,user)
        })}
        let user = cache
        return rankMain.main(message,user,clientDB,client,client.bot)
}
}