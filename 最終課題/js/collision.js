import { clearDraw } from "./draw.js";
import { SummaryEnemy, Enemy, clearEnemy } from "./enemyMotion.js";
import { Player, Bullet, clearPlayer } from "./playerMotion.js";
import { Wall } from "./wall.js";
import { Flea } from "./flea.js";
import { countMushroom, Mushroom, countMushroomLowArea } from "./mushroom.js";
import { score } from "./score.js";
import { stopLoop, startButton, lastButton } from "./finalAssignment.js";
import { clearSpider, Spider, spiderTimer } from "./spider.js";
import { Scorpion } from "./scorpion.js";
import { scorpionTimer, clearScorpion } from "./scorpion.js";

export let objects = [new Wall(-1, 1, 1, 661), new Wall(0, 661, 800, 1), new Wall(800, 0, 1, 660)];
//衝突判定を行うオブジェクトを格納する配列

function collision(a, b) {
    return a.x < b.x + b.w
        && a.x + a.w > b.x
        && a.y < b.y + b.h
        && a.y + a.h > b.y;
}
export function addObjects(obj) {
    objects.push(obj);
}
export function clearObjects(obj) {

    objects.splice(objects.indexOf(obj), 1);

}
export function allClearObjects() {

    objects = [new Wall(-1, 1, 1, 661), new Wall(0, 661, 800, 1), new Wall(800, 0, 1, 660)];

}
export function summaryCollition() {
    const hits = collisionCheck(objects);
    collisionExecute(hits);

}
export function collisionCheck(objs) {
    const hits = [];
    const n = objs.length;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (objs[i] instanceof SummaryEnemy) {
                for (let obj of objs[i].enemyList) {
                    if (collision(obj, objs[j])) {
                        hits.push({
                            a: obj,
                            b: objs[j],
                            c: objs[i]
                        });
                    }
                }
            } else if (objs[j] instanceof SummaryEnemy) {

                for (let obj of objs[j].enemyList) {
                    if (collision(objs[i], obj)) {
                        hits.push({
                            a: objs[i],
                            b: obj,
                            c: objs[j]
                        });
                    }
                }
            } else {
                if (collision(objs[i], objs[j])) {
                    {
                        hits.push({
                            a: objs[i],
                            b: objs[j]
                        });
                    }
                }
            }
        }
    }

    return hits;
}

export function collisionExecute(hits) {
    for (let hit of hits) {
        let hitA = hit.a;
        let hitB = hit.b;
        if (((hitA instanceof Enemy && hitB instanceof Player) || (hitA instanceof Player && hitB instanceof Enemy)) ||
            ((hitA instanceof Flea && hitB instanceof Player) || (hitA instanceof Player && hitB instanceof Flea)) ||
            ((hitA instanceof Spider && hitB instanceof Player) || (hitA instanceof Player && hitB instanceof Spider)) ||
            ((hitA instanceof Scorpion && hitB instanceof Player) || (hitA instanceof Player && hitB instanceof Scorpion))) {
            if (hitB instanceof Player) {
                hitB.subHealth();
                if (hitB.health == 0) {
                    end();

                    alert("gameover");
                }

                hitB.clearDraw();
                hitB.x = (20) * 20;
                hitB.y = (30) * 20;
                hitB.draw();
            } else if (hitA instanceof Player) {
                hitA.subHealth();
                if (hitA.health == 0) {
                    end();

                    alert("gameover");
                }

                hitA.clearDraw();
                hitA.x = (20) * 20;
                hitA.y = (30) * 20;
                hitA.draw();
            }
        } else if ((hitA instanceof Enemy && hitB instanceof Bullet) || (hitB instanceof Enemy && hitA instanceof Bullet)) {

            if (hitA instanceof Bullet) {
                score(hitB);
                clearObjects(hitA);
                clearDraw(hitA.x, hitA.y, hitA.w, hitA.h);
                let hitC = hit.c;
                clearEnemy(hitB, hitC);
            } else if (hitB instanceof Bullet) {
                score(hitA);
                clearObjects(hitB);
                clearDraw(hitB.x, hitB.y, hitB.w, hitB.h);
                let hitC = hit.c;
                clearEnemy(hitA, hitC);
            }
        } else if ((hitA instanceof Mushroom && hitB instanceof Bullet) || (hitA instanceof Bullet && hitB instanceof Mushroom)) {
            if (hitA instanceof Mushroom) {
                clearObjects(hitB);
                clearDraw(hitB.x, hitB.y, hitB.w, hitB.h);
                hitA.clearDraw();
                if (hitA.health == 4) {
                    score(hitA);
                    hitA.clearDraw();
                    clearObjects(hitA);
                    if (countMushroom(objects) <= 10) {
                        addObjects(new Flea(Math.floor(Math.random() * 780), 0));
                    }

                } else {
                    hitA.addHealth();
                    hitA.draw();
                }
            } else if (hitB instanceof Mushroom) {
                clearObjects(hitA);
                clearDraw(hitA.x, hitA.y, hitA.w, hitA.h);
                hitB.clearDraw();
                if (hitB.health == 4) {
                    score(hitB);
                    hitB.clearDraw();
                    clearObjects(hitB);
                    if (countMushroom(objects) <= 10) {
                        addObjects(new Flea(Math.floor(Math.random() * 780), 0));
                    }
                } else {
                    hitB.addHealth();
                    hitB.draw();
                }
            }
        } else if ((hitA instanceof Flea && hitB instanceof Bullet) || (hitA instanceof Bullet && hitB instanceof Flea)) {
            if (hitA instanceof Flea) {
                clearObjects(hitB);
                clearDraw(hitB.x, hitB.y, hitB.w, hitB.h);
                if (hitA.health == 0) {
                    score(hitA);
                    clearDraw(hitA.x, hitA.y, hitA.w, hitA.h);
                    clearObjects(hitA);
                } else {
                    hitA.subHealth();
                }
            } else if (hitB instanceof Flea) {
                clearObjects(hitA);
                clearDraw(hitA.x, hitA.y, hitA.w, hitA.h);
                if (hitB.health == 0) {
                    score(hitB);
                    clearDraw(hitB.x, hitB.y, hitB.w, hitB.h);
                    clearObjects(hitB);
                } else {
                    hitB.subHealth();
                }
            }
        } else if ((hitA instanceof Spider && hitB instanceof Bullet) || (hitA instanceof Bullet && hitB instanceof Spider)) {
            if (hitA instanceof Spider) {
                clearObjects(hitB);
                clearDraw(hitB.x, hitB.y, hitB.w, hitB.h);
                score(hitA);
                hitA.clearDraw();
                clearObjects(hitA);
                if ((countMushroomLowArea(objects) < 10) && (!(objects.some(obj => obj instanceof Spider)))) {
                    clearSpider();
                    spiderTimer();
                }
            } else if (hitB instanceof Spider) {
                clearObjects(hitA);
                clearDraw(hitA.x, hitA.y, hitA.w, hitA.h);
                score(hitB);
                hitB.clearDraw();
                clearObjects(hitB);
                if ((countMushroomLowArea(objects) < 10) && (!(objects.some(obj => obj instanceof Spider)))) {
                    clearSpider();
                    spiderTimer();
                }
            }
        } else if ((hitA instanceof Spider && hitB instanceof Wall) || (hitA instanceof Wall && hitB instanceof Spider)) {
            if (hitA instanceof Spider) {
                clearObjects(hitA);
                clearDraw(hitA.x, hitA.y, hitA.w, hitA.h);
                if ((countMushroomLowArea(objects) < 10) && (!(objects.some(obj => obj instanceof Spider)))) {
                    clearSpider();
                    spiderTimer();
                }
            } else if (hitB instanceof Spider) {
                clearObjects(hitB);
                clearDraw(hitB.x, hitB.y, hitB.w, hitB.h);
                if ((countMushroomLowArea(objects) < 10) && (!(objects.some(obj => obj instanceof Spider)))) {
                    clearSpider();
                    spiderTimer();
                }

            }
        } else if ((hitA instanceof Spider && hitB instanceof Mushroom) || (hitA instanceof Mushroom && hitB instanceof Spider)) {
            if (hitA instanceof Mushroom) {
                hitA.recovery = true;
                hitA.health = 1;
            } else if (hitB instanceof Mushroom) {
                hitB.recovery = true;
                hitB.health = 1;
            }
        } else if ((hitA instanceof Scorpion && hitB instanceof Mushroom) || (hitA instanceof Mushroom && hitB instanceof Scorpion)) {
            if (hitA instanceof Mushroom) {
                hitA.poison = true;
            } else if (hitB instanceof Mushroom) {
                hitB.poison = true;
            }
        } else if ((hitA instanceof Scorpion && hitB instanceof Bullet) || (hitA instanceof Bullet && hitB instanceof Scorpion)) {
            if (hitA instanceof Scorpion) {
                clearObjects(hitB);
                clearDraw(hitB.x, hitB.y, hitB.w, hitB.h);
                score(hitA);
                hitA.clearDraw();
                clearObjects(hitA);
                if (!(objects.some(obj => obj instanceof Scorpion))) {
                    clearScorpion();
                    scorpionTimer();
                }
            } else if (hitB instanceof Scorpion) {
                clearObjects(hitA);
                clearDraw(hitA.x, hitA.y, hitA.w, hitA.h);
                score(hitB);
                hitB.clearDraw();
                clearObjects(hitB);
                if (!(objects.some(obj => obj instanceof Scorpion))) {
                    clearScorpion();
                    scorpionTimer();
                }
            }
        } else if ((hitA instanceof Scorpion && hitB instanceof Wall) || (hitA instanceof Wall && hitB instanceof Scorpion)) {
            if (hitA instanceof Scorpion) {
                clearObjects(hitA);
                clearDraw(hitA.x, hitA.y, hitA.w, hitA.h);
                if (!(objects.some(obj => obj instanceof Scorpion))) {
                    clearScorpion();
                    scorpionTimer();
                }

            } else if (hitB instanceof Scorpion) {
                clearObjects(hitB);
                clearDraw(hitB.x, hitB.y, hitB.w, hitB.h);
                if (!(objects.some(obj => obj instanceof Scorpion))) {
                    clearScorpion();
                    scorpionTimer();
                }
            }
        } else if ((hitA instanceof Mushroom && hitB instanceof Player) || (hitA instanceof Player && hitB instanceof Mushroom)) {
            if (hitB instanceof Player) {
                hitB.clearDraw();
                hitB.x = hitB.oldX;
                hitB.y = hitB.oldY;
                hitB.draw();
            } else if (hitA instanceof Player) {
                hitA.clearDraw();
                hitA.x = hitA.oldX;
                hitA.y = hitA.oldY;
                hitA.draw();
            }
        } else if ((hitA instanceof Wall && hitB instanceof Player) || (hitA instanceof Player && hitB instanceof Wall)) {
            if (hitB instanceof Player) {
                hitB.clearDraw();
                hitB.x = hitB.oldX;
                hitB.y = hitB.oldY;
                hitB.draw();
            } else if (hitA instanceof Player) {
                hitA.clearDraw();
                hitA.x = hitA.oldX;
                hitA.y = hitA.oldY;
                hitA.draw();
            }
        } else if ((hitA instanceof Enemy && hitB instanceof Mushroom) || (hitA instanceof Mushroom && hitB instanceof Enemy)) {
            if (hitA instanceof Enemy) {
                hitA.clearMove();
                if ((hitB.poison == true) && (hitB.y < 440)) {
                    hitA.y = 440;
                } else {
                    hitA.y = hitA.y + 20;  // 下へ1段
                }
                hitA.direction = !hitA.direction;

            } else if (hitB instanceof Enemy) {
                hitB.clearMove();
                if ((hitA.poison == true) && (hitB.y < 440)) {
                    hitB.y = 440;
                } else {
                    hitB.y = hitB.y + 20;  // 下へ1段
                }
                hitB.direction = !hitB.direction;
            }
        } else if ((!(((hitA instanceof Enemy && hitB instanceof Flea) || (hitA instanceof Flea && hitB instanceof Enemy)) ||
            ((hitA instanceof Enemy && hitB instanceof Spider) || (hitA instanceof Spider && hitB instanceof Enemy)) ||
            ((hitA instanceof Enemy && hitB instanceof Scorpion) || (hitA instanceof Scorpion && hitB instanceof Enemy)))) &&
            // Flea, Spider, Scorpion以外
            (hitA instanceof Enemy || hitB instanceof Enemy)) {
            if (hitA instanceof Enemy) {
                if (hitA.y >= 620) {
                    stopLoop(startButton, lastButton);
                    alert("gameover");

                }
                hitA.clearMove();
                hitA.y = hitA.y + 20;  // 下へ1段
                hitA.direction = !hitA.direction;
            } else if (hitB instanceof Enemy) {
                if (hitB.y >= 620) {
                    stopLoop(startButton, lastButton);
                    alert("gameover");

                }
                hitB.clearMove();
                hitB.y = hitB.y + 20;  // 下へ1段
                hitB.direction = !hitB.direction;

            }

        }
    }
}

function collisionBullet(newX, newY, oldX, oldY, box) {
    const dx = newX - oldX;
    const dy = newY - oldY;

    // 動かない場合 → 通常チェック
    if (dx === 0 && dy === 0) {
        return (
            oldX >= box.x &&
            oldX <= box.x + box.w &&
            oldY >= box.y &&
            oldY <= box.y + box.h
        );
    }

    let tEnter = 0;
    let tExit = 1;

    // X軸のスラブ判定
    if (dx !== 0) {
        const tx1 = (box.x - oldX) / dx;
        const tx2 = (box.x + box.w - oldX) / dx;
        tEnter = Math.max(tEnter, Math.min(tx1, tx2));
        tExit = Math.min(tExit, Math.max(tx1, tx2));
    } else {
        // X方向に動かない → 外にいるなら当たらない
        if (oldX < box.x || oldX > box.x + box.w) return false;
    }

    // Y軸のスラブ判定
    if (dy !== 0) {
        const ty1 = (box.y - oldY) / dy;
        const ty2 = (box.y + box.h - oldY) / dy;
        tEnter = Math.max(tEnter, Math.min(ty1, ty2));
        tExit = Math.min(tExit, Math.max(ty1, ty2));
    } else {
        if (oldY < box.y || oldY > box.y + box.h) return false;
    }

    // tEnter <= tExit → 衝突
    return tEnter <= tExit && tEnter >= 0 && tEnter <= 1;
}


