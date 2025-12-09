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

        startLoop(startButton, lastButton);
    });
    resetButton.addEventListener("click", function () {

        stopLoop(startButton, lastButton);
        addData("scores", {
            name: prompt("あなたのニックネームは？"),
            score:Number(document.getElementById("score").textContent)
        });
        clearX();
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


import { db } from "./firebaseInit.js";


import {
    ref,
    push,
    set,
    get,
    query,
    orderByChild,
    limitToLast,
    onValue
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";

function startRanking() {

    // count を昇順で取得 → 最後の10件が上位
    const q = query(
        ref(db, "scores"),
        orderByChild("score"),
        limitToLast(10)
    );

    onValue(q, (snapshot) => {
        const data = snapshot.val();
        if (!data) return;

        // JSON → 配列化
        let list = Object.entries(data).map(([id, item]) => ({
            id,
            ...item
        }));

        // スコアの降順に並べ替え
        list.sort((a, b) => b.score - a.score);

        // HTML へ表示
        const rankingDiv = document.getElementById("ranking");
        rankingDiv.innerHTML = "";

        list.forEach((item, i) => {
            const row = document.createElement("div");
            row.textContent = `${i + 1}位 : ${item.name} (${item.score})`;
            rankingDiv.appendChild(row);
        });
    });
}

window.onload = startRanking;



async function addData(path, data) {
    const newRef = push(ref(db, path));
    await set(newRef, data);
    console.log("追加完了:", newRef.key);
}

window.onload = startRanking;