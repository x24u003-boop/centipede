import { draw, clearDraw } from "./draw.js";
import { clearObjects } from "./collision.js";
export class Mushroom {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 20;
        this.isMove = false;
        this.health = 1;
        this.recovery = false;
        this.poison = false;
    }
    draw() {
        if (this.poison == true) {
            draw("poison_mushroom" + this.health, this.x, this.y);
        } else {
            draw("mushroom" + this.health, this.x, this.y);
        }
    }
    addHealth() {
        this.health++;
    }

    clearDraw() {
        clearDraw(this.x, this.y, this.w, this.h);
    }
}
export function MushroomInit(num, objs) {
    for (let i = 0; i < num; i++) {
        let x = Math.floor(Math.random() * 780);
        let y = Math.floor(Math.random() * 520) + 20;
        objs.push(new Mushroom(x, y));
    }
}

export function countMushroom(objs) {

    let count = 0;
    for (let  obj of objs) {
        if (obj instanceof Mushroom) {
            count++;
        }
    }
    return count;
}
export function countMushroomLowArea(objs) {
    let count = 0;
    for (const obj of objs) {
        if (obj instanceof Mushroom) {
            if (obj.y > 460) {
                count++;
            }
        }
    }
    return count;
}