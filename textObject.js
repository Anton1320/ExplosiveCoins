class textObject extends gameObject
{
    constructor(pos, text, color, className)
    {
        super(pos, color, className);
        this.text = text;
    }
    draw(_ctx = ctx)
    {
        _ctx.beginPath();
        _ctx.font = '15px arial';
        _ctx.fillStyle = this.color;
        _ctx.fill();
        _ctx.fillText(this.text, this.pos.x, this.pos.y);
        _ctx.closePath();
    }
}