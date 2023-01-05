class Leaderboard {
    constructor() {
        this.background = new Item([screenSize.x, 0], [sc.offsetWidth-screenSize.x, screenSize.y], "lightblue", "leaderboard");
        this.playerInfo = {rank: 0, publicName: "currently unavailable", score: 0};
        this.topPlayers = [];
        for (let i = 0; i < 10; ++i) {
            this.topPlayers.push({rank: 0, publicName: "currently unavailable", score: 0});
        }
        this.topPlayersTexts = [];
        for (let i = 0; i < 10; ++i) {
            this.topPlayersTexts.push(new textObject(
                [this.background.pos.x+5, this.background.pos.y+20+40*i],
                this.topPlayers[i].rank + " " + this.topPlayers[i].publicName + " " + this.topPlayers[i].score,
                "black",
                ""));
        }
        this.playerRateText = new textObject([this.background.pos.x+5, this.background.pos.y+5+40*11],
            this.playerInfo.rank + " " + this.playerInfo.publicName + " " + this.playerInfo.score,
            "black",
            "");

    }

    updateText() {
        for (let i = 0; i < this.topPlayers.length; ++i) {
            this.topPlayersTexts[i].text = this.topPlayers[i].rank + " " + this.topPlayers[i].publicName + " " + this.topPlayers[i].score;
        }
        this.playerRateText.text = this.playerInfo.rank + " " + this.playerInfo.publicName + " " + this.playerInfo.score;
    }

    draw() {
        this.background.draw();
        for (let i = 0; i < this.topPlayers.length; ++i) {
            this.topPlayersTexts[i].draw()
        }
        this.playerRateText.draw();
    }
}

var ysdk_player_score = 0;
function ysdk_set_score(score) {
    YaGames.init().then(ysdk => {
        ysdk.getLeaderboards()
        .then(lb => {
          lb.setLeaderboardScore('main', score);
        });
    });
}


function ysdk_get_score() {
    YaGames.init().then(ysdk => {
        ysdk.getLeaderboards()
        .then(lb => {
            ysdk.isAvailableMethod('leaderboards.getLeaderboardPlayerEntry')
            .then(isAv => {
                if (isAv) {
                    lb.getLeaderboardPlayerEntry('main')
                    .then(res => leaderboard.playerScore = res)
                }
            });
        })
    });
}

function ysdk_get_leaders() {
    YaGames.init().then(ysdk => {
        ysdk.getLeaderboards()
        .then(lb => {
            // Получение 10 топов
            lb.getLeaderboardEntries('main', { quantityTop: 10 })
            .then(res => res.entries);
        });
    });
}