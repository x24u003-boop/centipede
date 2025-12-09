import { draw, clearDraw } from "./draw.js";
import { stageCount } from "./finalAssignment.js";
import { addObjects } from "./collision.js";
export class Scorpion{
    constructor(x, y,direction) {
        this.x = x;
        this.y = y;
        this.w = 40;
        this.h = 20;
        this.isMove = true;
        this.direction = direction;
    }
    draw() {
        if(this.direction==true){
            draw("scorpion2", this.x, this.y);
        }else if(this.direction==false){
            draw("scorpion1", this.x, this.y);
        }
        
    }
    clearDraw() {
        clearDraw(this.x, this.y, this.w, this.h);
    }
    move(){
        this.clearDraw();
        if(this.direction==true){
            this.x = this.x - 35;
        }else if(this.direction==false){
            this.x = this.x + 35;
        }
        this.draw();
    }
}
let time = 5000;
export let scorpion=null;
export function scorpionTimer() {
    if (stageCount < 2) {
        time = 10000;
    } else if (stageCount < 4) {
        time = 8000;
    } else if (stageCount < 6) {
        time = 6000;
    }else {
        time = 2000;
    }
    scorpion=setTimeout(function () {
        let y=Math.floor(Math.random() *440 ) + 100;
        if (Math.floor(Math.random() * 2) == 1) {
            addObjects(new Scorpion(760, y, true));
        } else {
            addObjects(new Scorpion(0, y, false));
        }
    }, time);
}
export function clearScorpion (){
    clearTimeout(scorpion);
}