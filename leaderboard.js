class Leaderboard {
    constructor() {
        this.background = new Item([screenSize.x, 0], [sc.offsetWidth-screenSize.x, screenSize.y], "lightblue", "leaderboard");
        this.playerInfo = {rank: 0, player: {publicName: "-"}, score: 0};
        this.topPlayers = [];
        for (let i = 0; i < 10; ++i) {
            this.topPlayers.push({rank: 0, player:{publicName: "-"}, score: 0});
        }
        this.topPlayersTexts = [];
        for (let i = 0; i < 10; ++i) {
            this.topPlayersTexts.push(new textObject(
                [this.background.pos.x+5, this.background.pos.y+20+40*i],
                this.topPlayers[i].rank + " " + this.topPlayers[i].player.publicName + " " + this.topPlayers[i].score,
                "black",
                ""));
        }
        this.playerRateText = new textObject([this.background.pos.x+5, this.background.pos.y+5+40*11],
            this.playerInfo.rank + " " + this.playerInfo.player.publicName + " " + this.playerInfo.score,
            "black",
            "");

    }

    updateText() {
        for (let i = 0; i < this.topPlayers.length; ++i) {
            if (this.topPlayers[i].player.publicName == "-") this.topPlayersTexts[i].text = "-";
            else this.topPlayersTexts[i].text = this.topPlayers[i].rank + " " + this.topPlayers[i].player.publicName + " " + this.topPlayers[i].score;
        }
        if (this.playerInfo.player.publicName == "-") this.playerRateText.text = "- " + humanMaxScore;
        else this.playerRateText.text = this.playerInfo.rank + " " + this.playerInfo.player.publicName + " " + Math.max(this.playerInfo.score, humanMaxScore);
    }

    draw() {
        this.background.draw();
        for (let i = 0; i < this.topPlayers.length; ++i) {
            this.topPlayersTexts[i].draw()
        }
        this.playerRateText.draw();
    }
}

function ysdk_set_score(score) {
    console.log("set score")
    YaGames.init().then(ysdk => {
        ysdk.getLeaderboards()
        .then(lb => {
          lb.setLeaderboardScore('main', score);
        });
    });
}


function ysdk_get_score() {
    console.log("getting score")
    YaGames.init().then(ysdk => {
        ysdk.getLeaderboards()
        .then(lb => {
            ysdk.isAvailableMethod('leaderboards.getLeaderboardPlayerEntry')
            .then(isAv => {
                if (isAv) {
                    lb.getLeaderboardPlayerEntry('main')
                    .then(res => {leaderboard.playerInfo = res; console.log("score has gotten")})
                }
                else {
                    console.log("score unavailable");
                }
            });
        })
    });
}

function ysdk_get_leaders() {
    console.log("get leaders")
    YaGames.init().then(ysdk => {
        ysdk.getLeaderboards()
        .then(lb => {
            // Получение 10 топов
            lb.getLeaderboardEntries('main', { quantityTop: 10 })
            .then(res => {
                for (let i = 0; i < res.ranges.length; ++i) {
                    if (res.entries[i].rank <= 10) leaderboard.topPlayers[res.entries[i].rank-1] = res.entries[i];
                }
            })
            .catch(reason => {console.log("fail to get leaders " + reason)});
        });
    });
}