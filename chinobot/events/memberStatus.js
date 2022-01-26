let memJoLe = require("../lib/memberJoLe")
let Mongo = require("../lib/MongoData/index")
module.exports = [
    {
        "name":"guildMemberAdd",
        "type":"on",
        "fit": [1,2],
        "fun": async function(client,clientDB,member) {       
        let gid = member.guild.id
        let ser= client.GuildCache.get(gid)
        if(!ser) {
          await Mongo.loadGuild(clientDB,gid).then((user) => {
            ser = user
            GuildCache.set(gid,user)
        })}
        return memJoLe.join(ser,member,clientDB,client,client.bot)
       }
      },
      {
       "name":"guildMemberRemove",
       "type":"on",
       "fit": [1,2],
       "fun": async function(client,clientDB,member) {
         let gid = member.guild.id
         let ser= client.GuildCache.get(gid)
         if(!ser) {
           await Mongo.loadGuild(clientDB,gid).then((user) => {
             ser = user
             GuildCache.set(gid,user)
         })}
         return memJoLe.leave(ser,member,clientDB,client,client.bot)
       }
      },
]