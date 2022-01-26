const Discord = require("discord.js")
const fs = require("fs")
const request = require("request");
const lan = require('../language/lang.json');
let BotOnline = require("../lib/BotOnline")
const gameX = require('../language/bot.json');
let Mongo = require("../lib/MongoData")
module.exports = {
    "setupuser": {
        description: { zh_TW: "手動生成用戶資料", en_US: "To spawn user data.", ja_JP: "" },
        authority: "everyone",
        instructions: "setupuser",
        category: "user",
        vote: false,
        help: false,
        fun: function (bot, message, clientDB, language, args, ...ag) {
            let l = lan.zh_TW, k = gameX.zh_TW
            if (language === "zh_TW") { l = lan.zh_TW; k = gameX.zh_TW } else if (language === "zh_CN") { l = lan.zh_CN; k = gameX.zh_CN } else if (language === "ja_JP") {
                l = lan.ja_JP; k = gameX.ja_JP
            } else if (language === "en_US") { l = lan.en_US; k = gameX.en_US }
            Mongo.loadUser(clientDB, message.author.id).then((user) => {
                if (user === false) {
                    let time = new Date().toDateString()
                    var obj = {
                        name: [message.author.username],
                        user: { username: message.author.username, id: message.author.id, avatar: message.author.avatar, locale: message.author.locale },
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
                        if (err) return message.channel.send("❌創建失敗! 請找苦力怕怕求助.");
                        console.log("新用戶!!" + message.author.username)
                        message.channel.send("✅創建成功! 開始你的智乃旅程吧!");
                        return;
                    });
                } else {
                    return message.channel.send("❌你已經有資料了! 若資料毀損請找苦力怕怕修復.");
                }
            })
        }
    },
    "close": {
        description: { zh_TW: "關閉機器人.", en_US: "close bot.", ja_JP: "" },
        authority: "owner",
        instructions: "close",
        category: "other",
        vote: false,
        help: false,
        fun: function (bot, message, clientDB, language, args, ...ag) {
            let l = lan.zh_TW, k = gameX.zh_TW
            if (language === "zh_TW") { l = lan.zh_TW; k = gameX.zh_TW } else if (language === "zh_CN") { l = lan.zh_CN; k = gameX.zh_CN } else if (language === "ja_JP") {
                l = lan.ja_JP; k = gameX.ja_JP
            } else if (language === "en_US") { l = lan.en_US; k = gameX.en_US }
            if (message.author.id !== '546144403958398988') return;
            message.channel.send(k.bot.close, { tts: true }).then(() => {
                process.exit(0);
            })
        }
    },
    "ram": {
        description: { zh_TW: "機器人記憶體用量.", en_US: "Bot ram status.", ja_JP: "" },
        authority: "everyone",
        instructions: "ram",
        category: "other",
        vote: false,
        help: false,
        fun: function (bot, message, clientDB, language, args, ...ag) {
            let l = lan.zh_TW, k = gameX.zh_TW
            if (language === "zh_TW") { l = lan.zh_TW; k = gameX.zh_TW } else if (language === "zh_CN") { l = lan.zh_CN; k = gameX.zh_CN } else if (language === "ja_JP") {
                l = lan.ja_JP; k = gameX.ja_JP
            } else if (language === "en_US") { l = lan.en_US; k = gameX.en_US }
            var os = require('os');
            var usedMemory = os.totalmem() - os.freemem(), totalMemory = os.totalmem();
            var getpercentage = ((usedMemory / totalMemory) * 100).toFixed(2) + '%'
            let ramEmbed = new Discord.MessageEmbed()
                .setTitle(k.bot.info)
                .addField(k.ram.all, (usedMemory / Math.pow(1024, 3)).toFixed(2) + "GB / " + (totalMemory / Math.pow(1024, 3)).toFixed(2) + "GB")
                .addField(k.ram.use, getpercentage);
            return message.channel.send({ embeds: [ramEmbed] });
        }
    },
    "cpu": {
        description: { zh_TW: "機器人cpu用量.", en_US: "Bot cpu status.", ja_JP: "" },
        authority: "everyone",
        instructions: "cpu",
        category: "other",
        vote: false,
        help: false,
        fun: function (bot, message, clientDB, language, args, ...ag) {
            let l = lan.zh_TW, k = gameX.zh_TW
            if (language === "zh_TW") { l = lan.zh_TW; k = gameX.zh_TW } else if (language === "zh_CN") { l = lan.zh_CN; k = gameX.zh_CN } else if (language === "ja_JP") {
                l = lan.ja_JP; k = gameX.ja_JP
            } else if (language === "en_US") { l = lan.en_US; k = gameX.en_US }
            var os = require('os-utils');
            try {
                os.cpuFree(function (f) {
                    let cpuEmbed = new Discord.MessageEmbed()
                        .setTitle(k.bot.info)
                        .addField(k.cpu.core, os.platform() + " / " + os.cpuCount())
                        .addField(k.cpu.all, (2.50 - f).toFixed(2) + "Ghz / " + "2.50" + "Ghz")
                        .addField(k.cpu.use, (((2.50 - f).toFixed(2) / 2.50) * 100).toFixed(2) + "%")
                        .addField(k.cpu.runing, (os.sysUptime() / 60).toFixed(1) + l.time.minute)
                    return message.channel.send({ embeds: [cpuEmbed] });
                })
            } catch (error) {
                message.channel.send(`Error!\n\`\`\`js\n${error}\n\`\`\``)
                return;
            }
        }
    },
    "restart": {
        description: { zh_TW: "重啟機器人.", en_US: "Restart bot.", ja_JP: "" },
        authority: "owner",
        instructions: "restart",
        category: "other",
        vote: false,
        help: false,
        fun: function (bot, message, clientDB, language, args, ...ag) {
            let l = lan.zh_TW, k = gameX.zh_TW
            if (language === "zh_TW") { l = lan.zh_TW; k = gameX.zh_TW } else if (language === "zh_CN") { l = lan.zh_CN; k = gameX.zh_CN } else if (language === "ja_JP") {
                l = lan.ja_JP; k = gameX.ja_JP
            } else if (language === "en_US") { l = lan.en_US; k = gameX.en_US }
            if (message.author.id !== '546144403958398988') return;
            message.channel.send(k.bot.restart, { tts: true }).then(() => {
                process.exit(1);
            });
        }
    },
    "debug": {
        description: "紀錄",
        fun: function (bot, message) {
            let l = lan.zh_TW, k = gameX.zh_TW;
            if (message.author.id !== '546144403958398988') return;
            let debug = new Discord.MessageEmbed()
                .setTitle("紀錄(Log)")
                .setDescription(console.log)
                .setTimestamp()
            message.channel.send(debug)
            return;
        }
    },
    "test": {
        description: "測試",
        fun: function (bot, message, clientDB, language, args, ...ag) {
            let l = lan.zh_TW, k = gameX.zh_TW
            if (language === "zh_TW") { l = lan.zh_TW; k = gameX.zh_TW } else if (language === "zh_CN") { l = lan.zh_CN; k = gameX.zh_CN } else if (language === "ja_JP") {
                l = lan.ja_JP; k = gameX.ja_JP
            } else if (language === "en_US") { l = lan.en_US; k = gameX.en_US }
            if (message.author.id !== '546144403958398988') return;
            message.author.send("uwu!")
            return;
        }
    },
    "times": {
        description: "測試",
        fun: function (bot, message) {
            return;
        }
    },
    "backupuser": {
        description: "排行",
        fun: function (bot, message, clientDB, language, args, ...ag) {
            let l = lan.zh_TW, k = gameX.zh_TW
            if (language === "zh_TW") { l = lan.zh_TW; k = gameX.zh_TW } else if (language === "zh_CN") { l = lan.zh_CN; k = gameX.zh_CN } else if (language === "ja_JP") {
                l = lan.ja_JP; k = gameX.ja_JP
            } else if (language === "en_US") { l = lan.en_US; k = gameX.en_US }
            if (message.author.id !== '546144403958398988') return;
            let dbo = clientDB.db("mydb"), query = { "type": "user" }
            dbo.collection("users").find(query).toArray(function (err, result) {
                result = Object.keys(result).map((key) => [result[key]]);
                for (let file of result) {
                    file = file[0]
                    let id = file.id
                    let user = file[id]
                    var json = JSON.stringify(user);
                    fs.writeFileSync('./backup/users/' + id + '.json', json);
                }
                message.channel.send("成功備份用戶檔案.")
                return;
            }
            )
        }
    },
    "backupguild": {
        description: "排行",
        fun: function (bot, message, clientDB, language, args, ...ag) {
            let l = lan.zh_TW, k = gameX.zh_TW
            if (language === "zh_TW") { l = lan.zh_TW; k = gameX.zh_TW } else if (language === "zh_CN") { l = lan.zh_CN; k = gameX.zh_CN } else if (language === "ja_JP") {
                l = lan.ja_JP; k = gameX.ja_JP
            } else if (language === "en_US") { l = lan.en_US; k = gameX.en_US }
            if (message.author.id !== '546144403958398988') return;
            let dbo = clientDB.db("mydb"), query = { "type": "guild" }
            dbo.collection("guilds").find(query).toArray(function (err, result) {
                result = Object.keys(result).map((key) => [result[key]]);
                for (let file of result) {
                    file = file[0]
                    let id = file.id
                    let user = file[id]
                    var json = JSON.stringify(user);
                    fs.writeFileSync('./backup/guilds/' + id + '.json', json);
                }
                message.channel.send("成功備份公會檔案.")
                return;
            }
            )
        }
    },
    "checkdata": {
        description: "測試",
        fun: async function (bot, message, clientDB) {
            if (message.author.id !== '546144403958398988') return;
            let list = new Array(), guildlist = new Array();
            message.channel.send("🔄檢查用戶檔案中....")
            /*讀取用戶檔案*/
            let dbo = clientDB.db("mydb"), query = { "type": "user" };
            let user = await dbo.collection("users").find(query).toArray();
            for (let file of user) {
                try {
                    Mongo.loadUser(clientDB, user.id).then((data) => {
                        if (!data) return list.push(file.id)
                        if (!data.id) return list.push(file.id)
                        if (isNaN(data.money)) list.push(file.id)
                    })
                } catch (error) {
                    list.push(file.id)
                }
            }
            if (list.join(" ") != "") {
                message.channel.send("[!]發現以下用戶檔案有問題: " + list.join("\n"))
            } else {
                message.channel.send("✅所有用戶檔案完美無缺!")
            }
            message.channel.send("🔄檢查公會檔案中....")
            /*讀取公會檔案*/
            let guser = await dbo.collection("guilds").find(query).toArray();
            for (let file of guser) {
                try {
                    Mongo.loadUser(clientDB, guser.id).then((data) => {
                        if (!data) return guildlist.push(file.id)
                        if (!data.id) return guildlist.push(file.id)
                    })
                } catch (error) {
                    guildlist.push(file.id)
                }
            }
            if (guildlist != "") {
                message.channel.send("[!]發現以下伺服器檔案有問題: " + guildlist.join("\n"))
            } else {
                message.channel.send("✅所有伺服器檔案完美無缺!")
            }
        }
    },
    "getchannel": {
        description: "測試",
        fun: function (bot, message, clientDB, language, args, ...ag) {
            let l = lan.zh_TW, k = gameX.zh_TW
            if (language === "zh_TW") { l = lan.zh_TW; k = gameX.zh_TW } else if (language === "zh_CN") { l = lan.zh_CN; k = gameX.zh_CN } else if (language === "ja_JP") {
                l = lan.ja_JP; k = gameX.ja_JP
            } else if (language === "en_US") { l = lan.en_US; k = gameX.en_US }
            if (message.author.id !== '546144403958398988') return;
            message.author.send("uwu!")
            async function* messagesIterator(channel) {
                let before = null;
                let done = false;
                while (!done) {
                    const messages = await channel.messages.fetch({ limit: 100, before });
                    if (messages.size > 0) {
                        before = messages.lastKey();
                        yield messages;
                    } else done = true;
                };
            };

            async function* loadAllMessages(channel) {
                for await (const messages of messagesIterator(channel)) {
                    for (const message of messages.values()) yield message;
                };
            };

            imageChannels = [args[0]]
            imageChannels.forEach(ID => {
                var image = [];
                var numbers = new Object();
                message.client.channels.fetch(ID)
                    .then(channel => {
                        (async () => {
                            message.channel.send(`Fetching ${channel.name}`);
                            var total = 0
                            let time = 0;
                            for await (const messages of loadAllMessages(channel)) {
                                if (messages.attachments.size > 0) {
                                    var images = new Object();
                                    images.author = messages.author.username;
                                    var urlArray = [];
                                    messages.attachments.each(attachments => {
                                        var file = new Object();
                                        file.name = attachments.name;
                                        file.url = attachments.url;
                                        urlArray.push(file)
                                        time++
                                        download(attachments.name, attachments.url, attachments)
                                    });
                                    function download(name, url, attachments) {
                                        setTimeout(() => {
                                            request(attachments.url, function (error, response, body) {
                                                console.log("Running & Downing: " + attachments.name + " || " + attachments.url + " || ")
                                            }).pipe(fs.createWriteStream("./pitrue/download/" + attachments.name), function (err) {
                                                if (err) { console.log("儲存失敗" + attachments.name); }
                                            });
                                        }, 1500 * time);
                                    }
                                    // images.attachments = urlArray;
                                    // images.createdAt = messages.createdAt;
                                    //  image.push(images);
                                    //  var name = messages.author.username
                                    //  if (!name in numbers || numbers[name] === undefined) {
                                    //       numbers[name] = messages.attachments.size;
                                    //  } else {
                                    //       numbers[name] += messages.attachments.size;
                                    // };
                                };
                                total += messages.attachments.size
                            };
                            console.log(channel.name)
                            console.log(numbers)
                            console.log(`Total: ${total}`)
                            let data = JSON.stringify(image, null, 2);
                            var filename = channel.name + '.json';
                            fs.writeFileSync(filename, data);
                            message.channel.send(`Done fetching ${channel.name}`)
                            message.channel.send(`Download ${total} photo`)
                            return;
                        })();
                    });
            })
        }
    },
    "guild": {
        description: "測試",
        fun: function (bot, message, clientDB, language, args, ...ag) {
            let l = lan.zh_TW, k = gameX.zh_TW
            if (language === "zh_TW") { l = lan.zh_TW; k = gameX.zh_TW } else if (language === "zh_CN") { l = lan.zh_CN; k = gameX.zh_CN } else if (language === "ja_JP") {
                l = lan.ja_JP; k = gameX.ja_JP
            } else if (language === "en_US") { l = lan.en_US; k = gameX.en_US }
            if (message.author.id !== '546144403958398988') return;
            var list = new Array();
            bot.guilds.cache.forEach((guild_) => {
                if (guild_.memberCount < 10) {
                    var exp = "000" + guild_.memberCount
                }
                else if (guild_.memberCount < 100) {
                    var exp = "00" + guild_.memberCount
                }
                else if (guild_.memberCount < 1000) {
                    var exp = "0" + guild_.memberCount
                }
                else { var exp = guild_.memberCount }
                list.push(exp + " | " + guild_.name + " | " + guild_.id)
                list.sort(function (a, b) { return a > b; })
            })
            setTimeout(() => {
                list.sort();
                list.splice(40);
            }, 900);
            setTimeout(() => {
                let levelembed = new Discord.MessageEmbed()
                    .setColor('#2d9af8')
                    .setTitle("📦所有咖啡廳☕")
                    .setDescription("群名稱| ID        |  成員數\n ```js\n" + list.join("\n") + "\n```")
                    .setFooter("此為全部群")
                return message.channel.send({ embeds: [levelembed] });
            }, 1000);
        }
    },
    "guildleave": {
        description: "測試",
        fun: function (bot, message, clientDB, language, args, ...ag) {
            let l = lan.zh_TW, k = gameX.zh_TW
            if (language === "zh_TW") { l = lan.zh_TW; k = gameX.zh_TW } else if (language === "zh_CN") { l = lan.zh_CN; k = gameX.zh_CN } else if (language === "ja_JP") {
                l = lan.ja_JP; k = gameX.ja_JP
            } else if (language === "en_US") { l = lan.en_US; k = gameX.en_US }
            if (message.author.id !== '546144403958398988') return message.channel.send("❌執行發生錯誤!\n```你不是擁有者```")
            if (args == null || args == "" || args == " ") return message.channel.send("❌執行發生錯誤!\n```請填入ID```")
            message.channel.send("🔄執行動作...").then((ingmessage) => {
                var name = bot.guilds.cache.get(args[0]).name
                bot.guilds.cache.get(args[0]).leave()
                    .then(() => { return ingmessage.edit("✅成功離開!" + name) })
                    .catch(err => { return ingmessage.edit("❌執行發生錯誤!\n```無法離開 " + name + " 伺服器\n" + err + "```") })
            })
        }
    },
    "bot": {
        description: { zh_TW: "所有智乃機器人狀態.", en_US: "All Chino bot status.", ja_JP: "" },
        authority: "everyone",
        instructions: "bot",
        category: "normal",
        vote: false,
        help: false,
        fun: function (bot, message, clientDB, language, args, ...ag) {
            let l = lan.zh_TW, k = gameX.zh_TW
            if (language === "zh_TW") { l = lan.zh_TW; k = gameX.zh_TW } else if (language === "zh_CN") { l = lan.zh_CN; k = gameX.zh_CN } else if (language === "ja_JP") {
                l = lan.ja_JP; k = gameX.ja_JP
            } else if (language === "en_US") { l = lan.en_US; k = gameX.en_US }
            BotOnline.Mongoload(clientDB).then((user) => {
                if (user === false) { return message.channel.send(l.error.Run_Command_error) } else {
                    let bot = new Discord.MessageEmbed()
                        .setColor('#2d9af8').setTitle(k.status.list)
                        .setDescription(k.status.info)
                        .addField("智乃小幫手#5407", k.status.inv1 + " [[top.gg]](https://top.gg/bot/731408794948730961)\n" + user.chino.member + "  |  " + user.chino.guild + "  |  " + user.chino.status + " |  `cr!`   |  ✅  |  ✅  |  ✅  |  ✅  |  ❌ |[[邀請(管理者)]](https://discord.com/oauth2/authorize?client_id=731408794948730961&scope=applications.commands%20bot&permissions=1476668478)|[[邀請(無管理者)]](https://discord.com/oauth2/authorize?client_id=731408794948730961&scope=applications.commands%20bot&permissions=2134900215)|")
                        .addField("智乃小幫手2#5127", k.status.inv2 + "\n" + user.chino2.member + "  |  " + user.chino2.guild + "  |  " + user.chino2.status + " |  `cr?`   |  ✅  |  ❌  |  ✅  |  ✅  |  ✅ |[[邀請(管理者)]](https://discord.com/oauth2/authorize?client_id=775702812348776478&scope=applications.commands%20bot&permissions=1476668478)|[[邀請(無管理者)]](https://discord.com/oauth2/authorize?client_id=775702812348776478&scope=applications.commands%20bot&permissions=2134900215)")
                        .addField("智乃小幫手•Canary#9156", k.status.inv3 + "\n" + user.chinoc.member + "  |  " + user.chinoc.guild + "  |  " + user.chinoc.status + " |  `cr*`  |  ❌  |  ❌  |  ❌  |  ✅  |  ❌  |[測試用暫不開放]")
                        .setFooter(k.status.footer)
                        .setTimestamp()
                    return message.channel.send({ embeds: [bot] });
                }
            })
        }
    },
    "post": {
        description: { zh_TW: "智乃公告.", en_US: "Chino post.", ja_JP: "" },
        authority: "everyone",
        instructions: "post",
        category: "other",
        vote: false,
        help: false,
        fun: function (bot, message, clientDB, language, args, ...ag) {
            let l = lan.zh_TW, k = gameX.zh_TW
            if (language === "zh_TW") { l = lan.zh_TW; k = gameX.zh_TW } else if (language === "zh_CN") { l = lan.zh_CN; k = gameX.zh_CN } else if (language === "ja_JP") {
                l = lan.ja_JP; k = gameX.ja_JP
            } else if (language === "en_US") { l = lan.en_US; k = gameX.en_US }
            message.channel.send("<a:load:776980097054933063> " + k.post.loading).then((loadmessage) => {
                let bots = message.guild.me
                Mongo.loaddata(clientDB).then((user) => {
                    if (!user) { return message.channel.send(l.error.Run_Command_error) }
                    let Time = new Date()
                    user = user.data
                    setTimeout(() => {
                        let post = new Discord.MessageEmbed()
                            .setColor('#2d9af8').setTitle(k.post.title)
                            .setDescription(`${k.post.post} / ${k.post.notice} / ${k.post.update}`)
                            .addField(k.post.post, "```json\n" + user.post.post + "\n```")
                            .addField(k.post.notice, "```json\n" + k.post.closed + (24 - Time.getHours()) + ` ${l.time.hour} ` + (60 - Time.getMinutes()) + ` ${l.time.minute}` + "\n" + k.post.daily + "\n```")
                            .addField(k.post.update, "```json\n" + user.post.update + "\n```")
                            .setFooter(k.post.time + user.post.time + " | ").setTimestamp()
                        loadmessage.edit(k.post.success_load)
                        loadmessage.edit({ embeds: [post] })
                        return;
                    }, 2000);
                })
            })
        }
    },
}