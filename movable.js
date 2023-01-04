class Movable extends Item
{
    constructor(pos, size, speed, color, className)
    {
        super(pos, size, color, className);
        this.speed = speed*screenSize.y/600;
        this.moveArray = {Up:false, Down:false, Left:false, Right:false};
    }

    move()
    {
        if (this.moveArray.Up && this.pos.y > 0) this.pos.y -= this.speed;
        if (this.moveArray.Down && this.pos.y + this.size.y < screenSize.y) this.pos.y += this.speed;
        if (this.moveArray.Left && this.pos.x > 0) this.pos.x -= this.speed;
        if (this.moveArray.Right && this.pos.x + this.size.x < screenSize.x) this.pos.x += this.speed;
    }
}