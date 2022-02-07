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
        let prefix = client.prefix;
        let cooldown = client.cooldown
        let channelcooldown = client.channelcooldown
        if (msg.content.startsWith(prefix)) {
            if (!msg.guild) return;
            if (!msg.guild.me.permissions.has(['SEND_MESSAGES'])) return;
            if(!msg.guild.me.permissionsIn(msg.channel).has('SEND_MESSAGES')) return;
            if(!msg.guild.me.permissionsIn(msg.channel).has('VIEW_CHANNEL')) return;
            if (channelcooldown.has(msg.channel.id)) return;
            if (msg.author.bot) return;
            msgcmd.ifban(banlist,why,msg)
            let user = await Mongo.getuser(client,clientDB,msg.author.id)
            let uwu = await Mongo.getguild(client,clientDB,msg.guild.id)
              if(msgcmd.ifpicture(msg,uwu,prefix)) return msg.channel.send("⛔此指令被本群管理員禁止.\nThis command has been disabled by server admin.");
              if (user === false) return RunCommand.main(client, msg, "zh_TW",clientDB,command);
              if (cooldown.has(msg.author.id)) {
                if (user.language) {
                  if(!languages[user.language]) return;
                    let lsay = languages[user.language].error.TooSpeed
                      msg.channel.send(lsay);
                      adv.speed(client, msg, user.language,clientDB)
                      return;
                } else {
                    msg.channel.send("請等等再來使用此指令!\nplease wait.");
                    speed(client, msg)
                    return;
                  }
              } else {
                let userlang = user.language
                return RunCommand.main(client, msg, userlang,clientDB,command);
            }
        }
        msgsay.detectsay(client,msg,client.bot,clientDB)  
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
    let user = await Mongo.getuser(client,clientDB,message.author.id)
    return rankMain.main(message,user,clientDB,client,client.bot)
}
}