import { startLoop, stopLoop, clearX, lastStage } from "./finalAssignment.js";
import { allClearObjects } from "./collision.js";
import { clearPlayer, initEvent } from "./playerMotion.js";
import { clearSpider } from "./spider.js";
import { clearScorpion } from "./scorpion.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
export const images = {
    head1: "images/head_1.png",
    head2: "images/head_2.png",
    head1R: "images/head_1_right.png",
    head2R: "images/head_2_right.png",
    body1: "images/body_1.png",
    body2: "images/body_2.png",
    flea: "images/flea.png",
    spider: "images/spider.png",
    scorpion1: "images/scorpion.png",
    scorpion2: "images/scorpion_left.png",
    mushroom1: "images/mushroom1.png",
    mushroom2: "images/mushroom2.png",
    mushroom3: "images/mushroom3.png",
    mushroom4: "images/mushroom4.png",
    poison_mushroom1: "images/poison_mushroom1.png",
    poison_mushroom2: "images/poison_mushroom2.png",
    poison_mushroom3: "images/poison_mushroom3.png",
    poison_mushroom4: "images/poison_mushroom4.png",
    player: "images/player.png",
    bullet: "images/bullet.png"
};

export let imgs = null;
export function draw(name, x, y) {
    const img = imgs[name];
    ctx.drawImage(img, x, y);
}
export function clearDraw(x, y, w, h) {
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, w, h);
}

// 単体画像を読み込む関数
function loadImage(src) {
    return new Promise(function (resolve, reject) {
        const img = new Image();
        img.onload = function () { resolve(img) };
        img.onerror = function () { reject(new Error("画像読み込み失敗: " + src)) };
        img.src = src;
    });
}

// キー→画像パス のオブジェクトを読み込んで
// キー→Image のオブジェクトとして返す
export async function loadImages(map) {
    const entries = Object.entries(map);
    const promises = entries.map(function ([key, src]) { return loadImage(src).then(function (img) { return [key, img] }) });
    const results = await Promise.all(promises);

    // キー付きオブジェクトに再構築
    return Object.fromEntries(results);
}

(async () => {
    imgs = await loadImages(images);
    const startButton = document.getElementById("startButton");
    const resetButton = document.getElementById("resetButton");
    const lastButton = document.getElementById("lastButton");
    startButton.disabled = false;
    lastButton.disabled = false;
    clearDraw(0, 0, 800, 700);
    initEvent();
    startButton.addEventListener("click", function () {
        clearX();
        startLoop(startButton, lastButton);
    });
    resetButton.addEventListener("click", function () {
        startButton.disabled = false;
    lastButton.disabled = false;
        stopLoop(startButton, lastButton);
        clearDraw(0, 0, 800, 700);
        clearPlayer();
        allClearObjects();
    });
    lastButton.addEventListener("click", function () {

        clearX();
        lastStage();
        startLoop(startButton, lastButton);
    });

})();
