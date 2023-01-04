class Explosion extends Item {
    constructor (pos, startSize) {
        super(pos, startSize, "tomato", "explosion");
        this.expansionSpeed = 5*screenSize.y/600;
    }

    expand() {
        this.size.x += this.expansionSpeed;
        this.size.y += this.expansionSpeed;
        this.pos.x -= this.expansionSpeed/2;
        this.pos.y -= this.expansionSpeed/2;
    }
}
