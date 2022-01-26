let voiceDVC = require("../lib/dynamicVC")
module.exports = [
    {
        "name": "voiceStateUpdate",
        "type": "on",
        "fit": [1, 2],
        "fun": function (client, clientDB, oldMember, newMember) {
            return voiceDVC.main(oldMember, newMember, client.bot, clientDB, client)
        }
    },
]