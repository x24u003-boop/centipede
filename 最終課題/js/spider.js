import { addObjects, objects } from "./collision.js";
import { draw, clearDraw } from "./draw.js";
import { stageCount } from "./finalAssignment.js";
export class Spider {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 20;
        this.isMove = true;
        this.isMoveType = true;//true:下から右上へ移動 false:上から下へ移動
        this.direction = direction;
    }
    draw() {
        draw("spider", this.x, this.y);
    }
    clearDraw() {
        clearDraw(this.x, this.y, this.w, this.h);
    }
    move() {
        clearDraw(this.x, this.y, this.w, this.h);
        if (this.y > 620) {
            this.isMoveType = true;
        } else if (this.y < 460) {
            this.isMoveType = false;
        }
        if (this.isMoveType == true) {
            if (this.direction) {
                this.y = this.y - 15;
                this.x = this.x - 15;
            } else {
                this.y = this.y - 15;
                this.x = this.x + 15;
            }
        } else {
            this.y = this.y + 20;
        }
        draw("spider", this.x, this.y);
    }
    isDistance(player) {
        let x;
        let y;
        if (player.x >= this.x) {
            x = player.x - this.x;
        } else {
            x = this.x - player.x
        }
        if (player.y >= this.y) {
            y = player.y - this.y;
        } else {
            y = this.y - player.y
        }
        return Math.floor(Math.sqrt(x * x + y * y));
    }
}
let time = 5000;
let spider = null;
export function spiderTimer() {
    if (stageCount < 2) {
        time = 8000;
    } else if (stageCount < 4) {
        time = 6000;
    } else if (stageCount < 6) {
        time = 4000;
    } else {
        time = 1000;
    }
    spider=setTimeout(function () {
        let ran=Math.floor(Math.random() * 2);
        console.log(ran);
        if (ran == 1) {

            spider = new Spider(780, 600, true);
            addObjects(spider);

        } else {

            spider = new Spider(0, 600, false);
            addObjects(spider);
        }
    }, time);
}
export function clearSpider (){
    clearTimeout(spider);
}