import { clearDraw, draw } from "./draw.js";
import { Mushroom } from "./mushroom.js";
import { addObjects } from "./collision.js";
export class Flea {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 20;
        this.isMove = true;
        this.health = 1;
        this.random = Math.floor(Math.random() * 400);
    }
    draw() {
        draw("flea", this.x, this.y);
    }
    clearDraw() {
        clearDraw(this.x, this.y, this.w, this.h);
    }
    move() {
        clearDraw(this.x, this.y, this.w, this.h);
        this.random -= 20;
        if (this.random <= 0) {
            this.mushroom();
        }
        if (this.health == 1) {
            this.y = this.y + 10;
        } else if (this.health == 0) {
            this.y = this.y + 20
        }
        draw("flea", this.x, this.y);
    }
    mushroom() {
        this.random = Math.floor(Math.random() * 400);
        addObjects(new Mushroom(this.x, this.y));
    }
    subHealth() {
        this.health--;
    }
}
