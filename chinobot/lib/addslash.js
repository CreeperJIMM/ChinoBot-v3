module.exports = function(token,clientId) {
const  Client2  =  require ( "discord-slash-commands-client" ) ; 
const  clientSlah  =  new Client2.Client(token,clientId)

let obj = {
    name: "avatar",
    description:"大頭貼指令",
    required: false,
    options:[
        {
            name:"user",
            description:"查閱用戶(預設為自己)",
            type: 6,
            required: false
        },

        {
            name:"private",
            description:"僅自己查閱(預設為false)",
            type: 5,
            required: false
        },
    ]
}

clientSlah.getCommands({}).then((data) => {
    data.forEach((data2) => {
        console.log(data2)
    })
})
//1//
//2//881050642897072148

clientSlah.editCommand(obj,"822762063994028074")
.then(console.log).catch(console.error)
/*
clientSlah.createCommand(obj)
.then(console.log).catch((error) => {
    console.error(error)
    console.log("錯誤!")
})*/

}