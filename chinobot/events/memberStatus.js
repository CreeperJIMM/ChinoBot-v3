let memJoLe = require("../lib/memberJoLe")
let Mongo = require("../lib/MongoData/index")
module.exports = [
    {
        "name":"guildMemberAdd",
        "type":"on",
        "fit": [1,2,3],
        "fun": async function(client,clientDB,member) {       
        let gid = member.guild.id
        let ser= await Mongo.getguild(client,clientDB,gid)
        return memJoLe.join(ser,member,clientDB,client,client.bot)
       }
      },
      {
       "name":"guildMemberRemove",
       "type":"on",
       "fit": [1,2,3],
       "fun": async function(client,clientDB,member) {
         let gid = member.guild.id
         let ser= await Mongo.getguild(client,clientDB,gid)
         return memJoLe.leave(ser,member,clientDB,client,client.bot)
       }
      },
]