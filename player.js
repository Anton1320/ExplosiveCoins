class Player extends Movable
{
    constructor(pos)
    {
        super(pos, [objectsSize, objectsSize], 2, "green", 'player');
        this.direction = {Up:false, Down:false, Left:false, Right:false};
        this.hp = playerStartHp;
        this.score = 0;
    }
}