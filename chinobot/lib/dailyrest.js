let today = new Date();
let Mongo = require("./MongoData/index.js");
console.log(today.getTime())
console.log(today.getDate())

module.exports.main = function () {
  setInterval(() => {
    let timer = new Date();
    if (timer.getDate() != today.getDate()) {
      Mongo.loadDaily(clientDB).then((users) => {
        if (users === false) {
          return;
        }
        users.daily = [];
        users.time = new Date().getTime()
        Mongo.writeDaily(clientDB, users);
        today = new Date()
      });
    } else {
      return;
    }
  }, 10000);
};
