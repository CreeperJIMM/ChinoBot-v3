//智乃小幫手專用模組
//Mongo DataBase讀取與寫入
//製作 BY 苦力怕怕#8558 @2022

/**
 * 讀取用戶資料  
 * {client} => Mongo.client  
 * {userid} => user.id  
*/
module.exports.loadUser = async function(client, userid) {
  let user = await client
    .db("mydb")
    .collection("users")
    .find({ id: userid })
    .toArray();
  if (user[0] === undefined) return false;
  user = user[0][userid];
  return user;
}

/**
 * 寫入用戶資料  
 * {client} => Mongo.client  
 * {userid} => user.id  
 * {data} => [object]  
*/
module.exports.writeUser = function(client,id,data) {
  let user = client
    .db("mydb")
    .collection("users")
    .find({ [id]: Object })
    .toArray();
  var myquery = { id: id };
  user[id] = data;
  var newvalues = { $set: user };
  client
    .db("mydb")
    .collection("users")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) return err;
      if (res) return true;
    });
}

/**
 * 讀取公會資料  
 * {client} => Mongo.client  
 * {guildid} => guild.id  
*/
module.exports.loadGuild = async function(client, guildid) {
  let user = await client
    .db("mydb")
    .collection("guilds")
    .find({ id: guildid })
    .toArray();
  if (user[0] === undefined) return false;
  user = user[0][guildid];
  return user;
}

/**
 * 寫入公會資料  
 * {client} => Mongo.client  
 * {guildid} => guild.id  
 * {data} => [object]  
*/
module.exports.writeGuild = function(client,id,data) {
  let user = client
    .db("mydb")
    .collection("guilds")
    .find({ [id]: Object })
    .toArray();
  var myquery = { id: id };
  user[id] = data;
  var newvalues = { $set: user };
  client
    .db("mydb")
    .collection("guilds")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) return err;
      if (res) return true;
    });
}

/**
 * 讀取用戶每日金錢數據  
 * {client} => Mongo.client  
 */
 module.exports.loadDaily = async function (client) {
  let user = await client
    .db("mydb")
    .collection("daily")
    .find({ id: "daily" })
    .toArray();
  if (user[0] === undefined) return false;
  user = user[0]
  return user;
}

/**
 * 寫入用戶每日金錢數據  
 * {client} => Mongo.client  
 */
 module.exports.writeDaily = function(client,data) {
  let user = client
    .db("mydb")
    .collection("daily")
    .find({ id: "daily" })
    .toArray();
  var myquery = { id: "daily" };
  user = data;
  var newvalues = { $set: user };
  client
    .db("mydb")
    .collection("daily")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) return err;
      if (res) return true;
    });
}

/**
 * 讀取機器人狀態  
 * {client} => Mongo.client  
 */
 module.exports.loaddata = async function(client) {
  let user = await client
    .db("mydb")
    .collection("status")
    .find({ id: "data" })
    .toArray();
  if (user[0] === undefined) return false;
  user = user[0]
  return user;
}

/**
 * 寫入機器人狀態  
 * {client} => Mongo.client  
 */
 module.exports.writedata = function (client,data) {
  let user = client
    .db("mydb")
    .collection("status")
    .find({ id: "data" })
    .toArray();
  var myquery = { id: "data" };
  user = data;
  var newvalues = { $set: user };
  client
    .db("mydb")
    .collection("status")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) return err;
      if (res) return true;
    });
}

/**
 * 讀取圖庫資料數據  
 * {client} => Mongo.client  
 */
 module.exports.loadImage = async function (client,image,nsfw) {
  let user = await client
    .db("mydb")
    .collection("image")
    .find({ id: image })
    .toArray();
    user = user[0]
  if (user.id === undefined) return false;
  let images = []
  await user.images.forEach(element => {
    if(element.Nsfw === nsfw) {
      images.push(element)
    }
  })
  return images;
}

/**
 * 讀取圖庫回報數據  
 * {client} => Mongo.client  
 */
 module.exports.loadPicture = async function (client) {
  let user = await client
    .db("mydb")
    .collection("report")
    .find({ type:"report" })
    .toArray();
  if (user[0] === undefined) return false;
  user = user[0]
  return user;
}

/**
 * 寫入圖庫會報數據  
 * {client} => Mongo.client  
 */
 module.exports.writePicture = function (client,data) {
  let user = client
    .db("mydb")
    .collection("report")
    .find({ type: "report" })
    .toArray();
  var myquery = { type: "report" };
  user = data;
  var newvalues = { $set: user };
  client
    .db("mydb")
    .collection("report")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) return err;
      if (res) return true;
    });
}

/**
 * ping 測試延遲用  
 * {client} => Mongo.client  
 */
 module.exports.ping = async function (client) {
  let user = await client
    .db("mydb")
    .collection("report")
    .find({ type:"ping" })
    .toArray();
  if (user[0] === undefined) return false;
  user = user[0]
  return user;
}

/**
 * 讀取用戶資料並寫入緩存  
 * {client} => Discord.client  
 * {clientDB} => Mongo.client  
 */
 module.exports.getuser = async function (client, clientDB, id) {
  let UserCache = client.UserCache.get(id);
  if (!UserCache) {
    let user = await this.loadUser(clientDB, id)
      if (user === false) return false;
      UserCache = {
        language: user.language,
        money: user.money,
        rank: user.rank,
      };
      client.UserCache.set(id, UserCache);
      return UserCache;
  } else {
    return UserCache;
  }
};

/**
 * 讀取公會資料並寫入緩存  
 * {client} => Discord.client  
 * {clientDB} => Mongo.client  
 */
module.exports.getguild = async function (client, clientDB, id) {
  let GuildCache = client.GuildCache.get(id);
  if (!GuildCache) {
    let user = await this.loadGuild(clientDB, id)
      if (user === false) return false;
      GuildCache = {
        language: user.language,
        detect: user.detect,
        join: user.join,
        leave: user.leave,
        text2: user.text2,
        voice2: user.voice2,
      };
      client.GuildCache.set(id, GuildCache);
      return GuildCache;
  } else {
    return GuildCache;
  }
};
