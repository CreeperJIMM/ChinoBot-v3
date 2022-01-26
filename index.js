//苦力機器人主程式
//啟動用bootloader
//製作 BY 苦力怕怕#8558 @2022

//env定義
const fs = require("fs")
fs.open("./.env","r",function (err,f) {
    if(!err) {
        console.log("已成功讀取 .env")
        require('dotenv').config();
        SwitchProcess()
    }else{
        console.log("'.env' 找不到,請創建一個放token\n或使用託管請加上token到secret裡.")
        SwitchProcess()
    }
})

function SwitchProcess() {
    //選擇該執行的程式
    const cmd = process.argv.splice(2)
    switch (cmd[0]) {
        case "1":
            console.log("已切換至智乃機器人1號")
            require("././chinobot/main")
            break;
        case "2":
            console.log("已切換至智乃機器人2號")
            require("././chinobot/main2")
            break;
        case "3":
            console.log("已切換至測試用機器人")
            require("././chinobot/main3")
            break;
        default:
            console.log("請輸入 [1 , 2 ,3] 來開啟指定機器人\n目前預設為 1")
            require("././chinobot/main")
        }
}