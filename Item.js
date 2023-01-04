class Item extends gameObject
{
    constructor(pos, size, color, className)
    {
        super(pos, color, className);
        this.size = {x:size[0], y:size[1]};
    }

    colision(Obj)
    {
        if (((-Obj.size.x < Obj.pos.x - this.pos.x) && (Obj.pos.x - this.pos.x < this.size.x)) &&
            ((-Obj.size.y < Obj.pos.y - this.pos.y) && (Obj.pos.y - this.pos.y < this.size.y)))
            return true;
        return false;
    }

    draw(_ctx = ctx)
    {
        _ctx.beginPath();
        _ctx.rect(this.pos.x, this.pos.y, this.size.x, this.size.y)
        _ctx.fillStyle = this.color;
        _ctx.fill();
        _ctx.closePath();
    }
}