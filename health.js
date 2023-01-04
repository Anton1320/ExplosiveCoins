class Health extends Item
{
    constructor(pos)
    {
        super(pos, [objectsSize, objectsSize], "orange", 'health');
    }

    move()
    {
        this.pos.x = randomInteger(0, screenSize.x - this.size.x);
        this.pos.y = randomInteger(0, screenSize.y - this.size.y);
    }
}