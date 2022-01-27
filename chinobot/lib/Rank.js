let Mongo = require('./MongoData')

module.exports.main = function(message,user,clientDB,client,num) {
    if (user === false) {
        if (!message.guild) return;
        if(num === 1) if (!message.content.startsWith("cr!")) return;
        if(num === 2) if (!message.content.startsWith("cr?")) return;
        Mongo.loadGuild(clientDB, message.guild.id).then((ser) => {
        if (ser === false) { return; }
        if(ser.language.run) {if(ser.language.run != num) return;}
        let time = new Date().toDateString()
        console.log("新用戶!!" + message.author.username)
        setTimeout(() => {
        var obj = {
            name: [message.author.username],
            user: {username: message.author.username,id: message.author.id ,avatar: message.author.avatar,locale: message.author.locale},
            guild: [message.guild.id],
            language: {},
            money: 0,
            usemoney: 0,
            rank: 0,
            guildrank: [],
            exp: 0,
            guildxep: [],
            marry: {},
            host: [],
            hostname: "",
            pet: [],
            petname: "",
            sex: {},
            age: {},
            chino: 0,
            cocoa: 0,
            tippy: 0,
            other: 0,
            work: 0,
            worktoal: { time: 0, work: 0 },
            picture: { love: [] },
            bank: 0,
            adv: [],
            role: [],
            item: [],
            bag: [],
            time: [time],
            ver: "6.1a(7/11)"
            };
            var myobj = [
            { "type": "user", "id": message.author.id, [message.author.id]: obj }
            ];
            let dbo = clientDB.db("mydb")
            dbo.collection("users").insertMany(myobj, function (err, res) {
            if (err) return;
            });
            }, 1000);
            })
            }else{
            if (!message.guild) return;
            Mongo.loadGuild(clientDB, message.guild.id).then((ser) => {
            if (ser === false) { return }
            if (ser.language.run) { if (ser.language.run != num) return; }
            Mongo.loadUser(clientDB,message.author.id).then((userX) => {
            let exp = 5 + Math.floor(Math.random() * 11)
            let money = 1
            if(num != 1) {
                exp = 1 + Math.floor(Math.random() * 4)
                money = 0
            }
            let user = userX
            user.user = {username: message.author.username,id: message.author.id ,avatar: message.author.avatar,locale: message.author.locale}
            user.exp = user.exp + exp
            user.money = user.money + money
            let rank2 = user.rank
            let exp2 = user.exp
            if (exp2 >= (1000 + rank2 * 50)) {
            user.rank++
            user.exp = 0
            Mongo.writeUser(clientDB, message.author.id, user)
            try {
            if (!message.guild) return;
            let user2 = ""
            if (ser.rank === "[object Object]" || ser.rank === "") { message.channel.send("恭喜 " + "<@" + message.author.id + "> " + "等級達到 " + (user.rank) + " 了!!") } else {
            if (ser.rank === "close") { return; }
            let Rank = ser.rank
            if(!client.channels.cache.get(Rank)) return;
            var str = ser.rank2[0]
            if (!str) return;
            if(str.length <= 0) return;
            var send1 = str.replace(`{rank}`, + user.rank + "").replace(`{user}`, " " + " <@" + message.author.id + "> " + "").replace(`{server}`, " " + message.guild.name + "").replace(`["`, "").replace(`"]`, "")
            try { 
                client.channels.cache.get(Rank).send(send1) 
                return;
            } catch (error) { return; }}
            } catch (error) {
                    client.channels.cache.get("746185201675141241").send("錯誤!! \n```js\n" + error + "\n```")
                    throw error;
                }
            }else{
                return Mongo.writeUser(clientDB, message.author.id, user) 
            }
            })
        }
    )}
}