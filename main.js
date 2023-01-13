var player = new Player(playerStartPos);

var enemys = [];

var healths = [];
for (let i = 0; i < healthNum; ++i){
    healths.push(new Health([0, 0]))
    healths[i].move();
}

var explosions = [];

var scoreText = new textObject([5, 15], '0', "black", 'scoreText');

var hpText = new textObject([screenSize.x-30, 15], '10', "red", 'hpText')

leaderboard = new Leaderboard();

function spawnEnemy()
{
    let a = randomInteger(1, 4);
    var pos = new Array(2);
    switch (a) {
        case 1:
            pos[0] = -20
            pos[1] = randomInteger(0, screenSize.y)
            break;
        case 2:
            pos[1] = screenSize.y+1
            pos[0] = randomInteger(0, screenSize.x)
            break;
        case 3:
            pos[1] = -20
            pos[0] = randomInteger(0, screenSize.x)
            break;
        case 4:
            pos[0] = screenSize.x+1
            pos[1] = randomInteger(0, screenSize.y)
            break;
    }
    enemys.push(new Enemy(pos));
}

document.onkeydown = function(event)
{
    if (event.code == 'ArrowUp')
    {
        player.moveArray.Up = true;
        player.direction = {Up:true, Down:false, Left:false, Right:false};
    }
    if (event.code == 'ArrowDown')
    {
        player.moveArray.Down = true;
        player.direction = {Up:false, Down:true, Left:false, Right:false};
    }
    if (event.code == 'ArrowLeft')
    {
        player.moveArray.Left = true;
        player.direction = {Up:false, Down:false, Left:true, Right:false};
    }
    if (event.code == 'ArrowRight')
    {
        player.moveArray.Right = true;
        player.direction = {Up:false, Down:false, Left:false, Right:true};
    }
}

document.onkeyup = function(event)
{
    if (event.code == 'ArrowUp') player.moveArray.Up = false;
    if (event.code == 'ArrowDown') player.moveArray.Down = false;
    if (event.code == 'ArrowLeft') player.moveArray.Left = false;
    if (event.code == 'ArrowRight') player.moveArray.Right = false;
}

var running = true;
var alive = false;
var attempt = 1;

function reloadGame()
{
    attempt++;

    player.pos = {x: playerStartPos[0], y: playerStartPos[1]}
    player.hp = playerStartHp;
    player.score = 1;
    hpText.text = playerStartHp.toString();
    scoreText.text = '0';
    alive = 1;

    enemys = [];

    healths = [];
    for (let i = 0; i < healthNum; ++i) {
        healths.push(new Health([0, 0]))
        healths[i].move();
    }

    explosions = [];
    ysdk_get_leaders();
    ysdk_get_score();
    ysdk_get_human_score();
    if (humanMaxScore > leaderboard.playerInfo.score) {
        ysdk_set_score(humanMaxScore);   
    }
    else {
        ysdk_set_human_score(leaderboard.playerInfo.score);
    }
}


window.onload = function()
{
    ysdk_get_leaders();
    ysdk_get_score();
    ysdk_get_human_score();
    YaGames.init().then(ysdk => ysdk.adv.showFullscreenAdv())

    var timer = 0;
    
    var t = setInterval(function()
    {
        if (!running)
        {
            clearInterval(t);
        }
        if (alive) {
            timer++;
            for (let enemy of enemys)
            {
                enemy.liveTime -= 1;
            }
            if (timer >= 2000/(1+0.2*player.score))
            {
                spawnEnemy();
                timer = 0;
            }
            ctx.clearRect(0, 0, sc.offsetWidth, sc.offsetHeight);
            
            for (let health of healths)
            {
                if (health.colision(player))
                {
                    explosions.push(new Explosion([health.pos.x, health.pos.y], [health.size.x, health.size.y]))
                    health.move()
                    player.score+=5;
                    player.hp++;
                    scoreText.text = player.score;
                    
                    hpText.text = player.hp;
                    
                    spawnEnemy();
                }
                health.draw();
            }
            for (let i = 0; i < enemys.length; ++i)
            {
                enemys[i].move(player);
                enemys[i].draw();
                if (enemys[i].colision(player))
                {
                    player.hp -= 5;
                    let q = enemys[i];
                    enemys[i] = enemys[enemys.length-1];
                    enemys[enemys.length-1] = q;
                    enemys.pop();
                    hpText.text = player.hp;
                }
                else if (enemys[i].liveTime <= 0)
                {
                    let q = enemys[i];
                    enemys[i] = enemys[enemys.length-1];
                    enemys[enemys.length-1] = q;
                    enemys.pop();
                }
            }
            for (let expl of explosions) {
                for (let i = 0; i < enemys.length; ++i) {
                    if (enemys[i].colision(expl)) {
                        enemys[i] = enemys[enemys.length-1];
                        enemys.pop();
                        player.score += 1;
                        player.hp += 1;
                        scoreText.text = player.score;
                        hpText.text = player.hp;
                    }
                }
                expl.expand();
            }
    
            if (player.hp <= 0) {
                alive = 0;
                ysdk_get_score();
                ysdk_get_human_score();

                ysdk_get_leaders();
                if (player.score > leaderboard.playerInfo.score) {
                    ysdk_set_score(player.score);
                }
                if (player.score > humanMaxScore) {
                    humanMaxScore = player.score;
                    ysdk_set_human_score(humanMaxScore);
                }
                if (attempt%5 == 0) YaGames.init().then(ysdk => ysdk.adv.showFullscreenAdv())
            }
    
    
            for (let i = 0; i < explosions.length; ++i) {
                if (explosions[i].size.x >= maxExplosionSize) {
                    explosions[i] = explosions[explosions.length-1];
                    explosions.pop();
                }
                else {
                    explosions[i].draw();
                }
            }
    
            player.move();
            player.draw();
            hpText.draw();
            scoreText.draw();
        }
        leaderboard.updateText();
        leaderboard.draw();
    }, 0);
};