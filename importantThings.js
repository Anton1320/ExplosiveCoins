function randomInteger(min, max)
{
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

var sc = document.getElementById("myCanvas");
var ctx = sc.getContext("2d");
sc.width = document.documentElement.offsetWidth-50;
sc.height = document.documentElement.offsetHeight-50;
const screenSize = {x:sc.offsetHeight*4/3, y:sc.offsetHeight};

const objectsSize = screenSize.x/40;

const playerStartPos = [100, 100];
const playerStartHp = 10;

const healthNum = 11;

const maxExplosionSize = 200*screenSize.y/600;