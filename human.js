var human;

function initPlayer() {
    return ysdk.getPlayer().then(_player => {
            human = _player;

            return human;
        });
}

YaGames.init().then(ysdk => {
    initPlayer().then(_player => {
        if (_player.getMode() === 'lite') {
            // Игрок не авторизован.
            ysdk.auth.openAuthDialog().then(() => {
                    // Игрок успешно авторизован
                    initPlayer().catch(err => {
                        // Ошибка при инициализации объекта Player.
                    });
                }).catch(() => {
                    // Игрок не авторизован.
                });
        }
    }).catch(err => {
        // Ошибка при инициализации объекта Player.
    });
}) 
