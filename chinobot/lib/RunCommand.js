let Discord = require("discord.js")
module.exports.main = async function(bot, msg, userlang,clientDB,command) {
    this.time(bot, msg)
    bot.cooldown.add(msg.author.id)
    bot.channelcooldown.add(msg.channel.id)
    this.deleteCooldown(bot,msg)
    let prefix = bot.prefix
    if (Object.keys(command).includes(msg.content.replace(prefix, "").split(" ")[0])) {
      try {
        let cmd = command[msg.content.replace(prefix, "").split(" ")[0]]
            return this.RunCommand(msg,cmd,bot,clientDB,userlang,command);
        } catch (error) {
            msg.channel.send("❌嘗試執行發生錯誤!\n```js\n" + error + "\n```")
            bot.channels.cache.get("746185201675141241").send("錯誤!\n執行者:  " + msg.author.tag + ":" + msg.content + "\n```js\n" + error + "\n```")
            if (error) msg.react("<:error:787197851913945118>") //error
            console.log(msg.author.tag + ":" + msg.content)
            throw error;
            }
    }else{
      return;
    }
}
module.exports.RunCommand = async function (msg,cmd,bot,clientDB,userlang,command) {
    let ag = msg.content.split(" ")
    ag.shift()
    let prefix = bot.prefix
    if(!cmd.help && ag[0] === "help") {
        let helper = new Discord.MessageEmbed()
        .setTitle(msg.content.replace(prefix, "").split(" ")[0])
        .setDescription("📄說明:\n"+cmd.description.zh_TW+`\n\n✏使用方式:\n${cmd.instructions}\n`)
        .setFooter("📊類別: "+cmd.category+"\n🗳是否投票: "+cmd.vote+"\n🎭指令權限: "+cmd.authority+"\n註: ＊ 非必填")
        return msg.channel.send({embeds:[helper]})
      }else{
        try {
      if (!msg.guild.me.permissionsIn(msg.channel).has(['READ_MESSAGE_HISTORY'])) return msg.channel.send("⚠智乃有缺漏的權限可能會影響指令運作><!!\n缺漏權限: `READ_MESSAGE_HISTORY`(讀取歷史訊息)");
      if (!msg.guild.me.permissionsIn(msg.channel).has(['EMBED_LINKS'])) return msg.channel.send("⚠智乃有缺漏的權限可能會影響指令運作><!!\n缺漏權限: `EMBED_LINKS`(嵌入連結)");
      command[msg.content.replace(prefix, "").split(" ")[0]]["fun"](bot, msg, clientDB, userlang, ag, ...ag)
      return;        
        } catch (error) {
          throw error;
        }
      }
}

module.exports.time = function(client, message) { 
    if(message) {
    client.times = client.times +1
    return;
    }else{
        return false;
    }
}
module.exports.deleteCooldown = function (client,message) {
    setTimeout(() => {
      client.cooldown.delete(message.author.id)
    }, 3 * 900)
    setTimeout(() => {
      client.channelcooldown.delete(message.channelId)
    }, 2 * 700)
}