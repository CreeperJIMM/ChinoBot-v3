let Mongo = require("../lib/MongoData/index")
let deleteSnipe = require("../lib/MessageSnipe")
let snipecool = new Set()
module.exports = [
    {
        "name":"messageDelete",
        "type":"on",
        "fit": [1,2],
        "fun": async function(client,clientDB,message) {
         deleteMessage(message,clientDB,client)
         if (message.author.bot) return;
         if (snipecool.has(message.author.id)) return;
         if (!message.guild) return;
         let gid = message.guild.id
         let ser= client.GuildCache.get(gid)
         if(!ser) {
           await Mongo.loadGuild(clientDB,gid).then((user) => {
             ser = user
             client.GuildCache.set(gid,user)
         })}
             if (ser === false) { return }
             if (ser.language.run) { if (ser.language.run != client.bot) return; }
             if(ser.language.setting) {if(ser.language.setting.snipe === false) return;}
             Mongo.loadGuild(clientDB, message.guild.id).then((user) => {
                 if (user === false) { return } else {
                     snipecool.add(message.author.id)
                     deleteSnipe.main(message,clientDB,user)
                 }
             })
             setTimeout(() => { snipecool.delete(message.author.id) }, 1000);
        }
      },
      {
      "name":"messageUpdate",
      "type":"on",
      "fit": [1,2],
      fun: function(client,clientDB,oldmessage, newmessage) {
       if (!oldmessage.guild) return;
       if (oldmessage.content === newmessage.content) return;
       return detects(client,oldmessage, newmessage, "edit", newmessage.guild.id,"",clientDB);
      }
      },
      {
       "name":"messageDeleteBulk",
       "type":"on",
       "fit": [1,2],
       fun: function(client,clientDB,message) {
         if (!message.first().guild) return;
         let length = message.size
         let channel = message.first().channel.name
         return detects(client,message, channel, "deleBulk", message.first().guild.id, length,clientDB);
       }
     },
]
function deleteMessage(message,clientDB,client) {
    if (!message.guild) return;
    detects(client,message, message.guild, "dele", message.guild.id,"",clientDB)
    }
////////////////////////////////////////////////////////////////
let detectMsg = require("../lib/detectMessage")
async function detects(client,message, guild, channel, gid, length,clientDB) {
    let ser= client.GuildCache.get(gid)
    if(!ser) {
        await Mongo.loadGuild(clientDB,gid).then((user) => {
            ser = user
            client.GuildCache.set(gid,user)
        })
    }
    if (ser === false) { return }
    return detectMsg.main(message, guild, channel, gid, length,clientDB,client,ser,client.bot)
};