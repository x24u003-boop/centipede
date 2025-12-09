import { enemyInit, SummaryEnemy } from "./enemyMotion.js";
import { Wall } from "./wall.js";
import { clearDraw } from "./draw.js";
import { Mushroom, MushroomInit } from "./mushroom.js";
import { addPlayer, moveBullets, clearPlayer } from "./playerMotion.js";
import { addObjects, objects, summaryCollition, allClearObjects } from "./collision.js";
import { spiderTimer, clearSpider } from "./spider.js";
import { scorpionTimer, clearScorpion } from "./scorpion.js";



function init(size, num, position) {
    if ((stageCount == 0) || (stageCount == 10)) {
        MushroomInit(15, objects);
        addPlayer();
    }

    stage();
    stageCount++;

    spiderTimer();
    scorpionTimer();

    for (let i = 0; i < num; i++) {

        addObjects(enemyInit(size, position, 0, direction));
        direction = !direction;
    }
}

export let last = null;
export let acc = 0;
export let baseAcc = 100;
export let reqId = null;
export let running = false;

export const startButton = document.getElementById("startButton");
export const lastButton = document.getElementById("lastButton");
export let stageCount = 0;
let direction = true;
export function startLoop(startButton, lastButton) {

    startButton.disabled = true;
    lastButton.disabled = true;
    if (running == false) {
        running = true;
        reqId = requestAnimationFrame(loop);
    }
}
export function stopLoop(startButton, lastButton) {
    running = false;
    startButton.disabled = false;
    lastButton.disabled = false;
    if (reqId !== null) {

        cancelAnimationFrame(reqId);
        reqId = null;
    }
    if ((stageCount == 5) || (stageCount == 15)) {
        clearDraw(0, 0, 800, 700);
        allClearObjects();
        alert("ゲームクリア");
    }
}
export function loop(now) {
    if (running == false) {
        return;
    }
    if (last == null) {
        last = now;
    }
    if (isNaN(acc)) {
        acc = 0;
    }
    const delta = now - last;
    last = now;

    acc += delta;
    if (isEnd(objects)) {
        stopLoop(startButton, lastButton);

        if (stageCount == 0) {
            init(8, 1, 400);
        } else if (stageCount < 3) {
            init(stageCount + 8, 1, 400);
        } else if (stageCount <=5) {
            init(stageCount + 14, 1, 500);
        } else if(stageCount>=10){
            init(35, 1, 700);
        }
        startLoop(startButton, lastButton);
    }
    if (acc >= baseAcc) { // 500ms = 0.5秒
        summaryMove();

    }
    moveBullets(objects);
    summaryCollition();
    if (acc >= baseAcc) {
        summaryDraw();
        acc -= baseAcc;
    }


    reqId = requestAnimationFrame(loop);
}

export function summaryMove() {
    for (let obj of objects) {
        if (obj.isMove) {
            if ((obj instanceof Wall) || (obj instanceof Mushroom)) {
                continue;
            }
            obj.move();
        }
    }
}
export function summaryDraw() {
    for (let obj of objects) {
        if ((obj instanceof Wall)) {
            continue;
        }
        obj.draw();
    }
}
function isEnd(objects) {
    for (let obj of objects) {
        if (obj instanceof SummaryEnemy) {
            return false;
        }
    }
    return true;
}
export function clearX() {
    last = null;
    acc = 0;
    reqId = null;
    running = false;
    stageCount = 0;
    direction = true;
    clearPlayer();
    clearScorpion();
    clearSpider();
    document.getElementById("life").innerHTML = 3;
    document.getElementById("score").innerHTML = 0;

}
function stage() {
    document.getElementById("stage").innerHTML = stageCount + 1;
}
export function lastStage() {
    stageCount = 10;
}



