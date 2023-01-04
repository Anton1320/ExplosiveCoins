class Enemy extends Movable
{
    constructor(pos)
    {
        super(pos, [objectsSize, objectsSize], 1, "blue", 'enemy');
        this.liveTime = 10000;
    }

    move(target)
    {
        this.pos.x += 2*((target.pos.x > this.pos.x)-0.5) * this.speed;
        this.pos.y += 2*((target.pos.y > this.pos.y)-0.5) * this.speed;
    }
}