import { Enemy } from "./enemyMotion.js";
import { Mushroom } from "./mushroom.js";
import { Flea } from "./flea.js";
import { Spider } from "./spider.js";
import { getPlayer } from "./playerMotion.js";
import { Scorpion } from "./scorpion.js";
export function score(obj) {
    const scoreHTML = document.getElementById("score");
    if (obj instanceof Enemy) {
        if (obj.isHead) {
            scoreHTML.innerText = Number(scoreHTML.innerText) + 100;

        } else {
            scoreHTML.innerText = Number(scoreHTML.innerText) + 10;

        }
    } else if (obj instanceof Mushroom) {
        if(!(obj.recovery)){
            scoreHTML.innerText = Number(scoreHTML.innerText) + 1;
        }
    } else if (obj instanceof Flea) {
        scoreHTML.innerText = Number(scoreHTML.innerText) + 200;
    } else if (obj instanceof Spider) {
        const distance = obj.isDistance(getPlayer());
        if (distance < 40) {
            scoreHTML.innerText = Number(scoreHTML.innerText) + 900;
        } else if (distance < 100) {
            scoreHTML.innerText = Number(scoreHTML.innerText) + 600;
        } else {
            scoreHTML.innerText = Number(scoreHTML.innerText) + 300;
        }
    }else if(obj instanceof Scorpion){
        scoreHTML.innerText = Number(scoreHTML.innerText) + 1000;
    }
}