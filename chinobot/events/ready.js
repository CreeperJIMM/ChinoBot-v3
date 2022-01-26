module.exports = [
    {
        name: "ready",
        type: "once",
        fit: [1, 2, 3],
        fun: function (client, clientDB) {
            //MusicFun.main(client,clientDB,prefix)
            let timer = 1;
            let Open = new Date();
            let prefix = client.prefix;
            setInterval(() => {
                if (timer === 1) {
                    timer++;
                    client.user.setActivity(
                        prefix + "help • " + client.guilds.cache.size + " 個咖啡廳服務中",
                        {
                            type: "STREAMING",
                            url: "https://www.youtube.com/watch?v=ycfNxCroJiE",
                        }
                    );
                } else if (timer === 2) {
                    timer++;
                    let Today = new Date().getTime();
                    let time = (Today - Open.getTime()) / 1000;
                    let day = 0,
                        H = 0,
                        m = 0;
                    day = time / 60 / 60 / 24 >= 1 ? Math.floor(time / 60 / 60 / 24) : 0;
                    H =
                        (time % (60 * 60 * 24)) / (60 * 60) >= 1
                            ? Math.floor((time % (60 * 60 * 24)) / (60 * 60))
                            : 0;
                    m =
                        (time % (60 * 60)) / 60 >= 1
                            ? Math.floor((time % (60 * 60)) / 60)
                            : 0;
                    let text = `${prefix}help • 累計運行${day}天${H}小時${m}分鐘 `;
                    client.user.setActivity(text, {
                        type: "STREAMING",
                        url: "https://www.youtube.com/watch?v=ycfNxCroJiE",
                    });
                } else if (timer === 3) {
                    timer--;
                    client.user.setActivity(
                        prefix + "help • " + client.users.cache.size + " 個顧客服務中",
                        {
                            type: "STREAMING",
                            url: "https://www.youtube.com/watch?v=ycfNxCroJiE",
                        }
                    );
                    timer--;
                }
            }, 8000);
        },
    },
    {
        name: "error",
        type: "on",
        "fit": [1, 2, 3],
        fun: function (client, clientDB, prefix, error) {
            throw error;
        },
    },
];
