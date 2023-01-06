var humanMaxScore = 0;

function ysdk_set_human_score(score) {
    YaGames.init().then(ysdk => {
        ysdk.getPlayer().then(_player => {
            _player.setStats({"maxScore": score});
        })
    })
}

function ysdk_get_human_score(score) {
    YaGames.init().then(ysdk => {
        ysdk.getPlayer().then(_player => {
            _player.getStats(["maxScore"]).then(ans => humanMaxScore = ans.maxScore);
        })
    })
}
