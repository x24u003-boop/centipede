import { clearDraw, draw } from "./draw.js";
import { objects } from "./collision.js";
import { addObjects } from "./collision.js";
import { clearObjects } from "./collision.js";
import {lastButton, startButton,stopLoop} from "./finalAssignment.js";
export class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 10;
        this.h = 10;
        this.isMove = true;
        this.oldY = this.y;
        this.oldX = this.x;
        this.health = 3;
    }
    draw() {
        draw("player", this.x, this.y);
    }
    clearDraw() {
        clearDraw(this.x, this.y, this.w, this.h);
    }
    subHealth() {
        const life = document.getElementById("life");
        this.health--;
        life.innerText = this.health;
        
        
    }
    move() {
        if (keys[" "]) {
            if (player == null) {
            }
            if (isBullet(objects)) {
                const bullet = new Bullet(player.x, player.y);
                addObjects(bullet);
            }

        } 
        if (keys["w"]) {
            this.clearDraw();
            if (!(this.y <= 440)) {
                this.oldY = this.y;
                this.y = this.y - 10;
            }
            this.draw();
        } else if (keys["d"]) {
            this.clearDraw();
            this.oldX = this.x;
            this.x = this.x + 10;
            this.draw();
        } else if (keys["s"]) {
            this.clearDraw();
            this.oldY = this.y;
            this.y = this.y + 10;
            this.draw();
        } else if (keys["a"]) {
            this.clearDraw();
            this.oldX = this.x;
            this.x = this.x - 10;
            this.draw();
        }
    }
}
export class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 5;
        this.h = 5;
        this.isMove = false;
    }
    draw() {
        draw("bullet", this.x, this.y);
    }
    clearDraw() {
        clearDraw(this.x, this.y, this.w, this.h);
    }
    move() {
        clearDraw(this.x, this.y, this.w, this.h);
        this.oldY = this.y;
        this.y = this.y - 19;
        draw("bullet", this.x, this.y);
    }
}
let player = null;
const keys = {};
export function addPlayer() {
    const already = objects.some(obj => obj instanceof Player);
    if (!already) {
        player = new Player(395, 625);
        addObjects(player);
    }
}
export function initEvent() {

    document.addEventListener("keydown", (e) => {
        keys[e.key] = true;
    });
    document.addEventListener("keyup", (e) => {
        keys[e.key] = false;
    });
}
export function clearPlayer() {
    player = null;
}
export function getPlayer() {
    return player;
}
export function moveBullets(objs) {
    for (let obj of objs) {
        if (obj instanceof Bullet) {
            obj.move();
            if (obj.y < 0) {
                clearDraw(obj.x, obj.y, obj.w, obj.h);
                clearObjects(obj);
            }
        }
    }
}
function isBullet(objs) {
    for (let obj of objs) {
        if (obj instanceof Bullet) {
            return false;
        }
    }
    return true;
}