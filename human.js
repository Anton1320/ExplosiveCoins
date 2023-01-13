var humanMaxScore = 0;

function ysdk_set_human_score(score) {
    YaGames.init().then(ysdk => {
        ysdk.getPlayer().then(_player => {
            _player.setStats({"maxScore": score})
            .then(succ => {
                if (succ) console.log("setting score succed")
                else console.log("setting score failed")
            });
        })
    })
}

function ysdk_get_human_score(score) {
    YaGames.init().then(ysdk => {
        ysdk.getPlayer().then(_player => {
            _player.getStats(["maxScore"]).then(ans => {humanMaxScore = ans.maxScore; console.log("getting score succed" + humanMaxScore)})
        })
    })
}
