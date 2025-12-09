import { draw, clearDraw } from "./draw.js";
import { Mushroom } from "./mushroom.js";
import { addObjects, clearObjects, summaryCollition } from "./collision.js";
/**
 * 敵敵の出発地点をランダムで決定する
 * 0~15のランダム値に50を掛けて、x座標として使用する
 * @return {number} 敵敵の出発x座標
 */
export function startEnemy() {
    return (Math.floor(Math.random() * 39)/*0~15*/ * 20);
}


/**
 * 敵敵の初期化
 * @param {number} size 敵敵の個数
 * @param {number} startPointX 敵敵の出発x座標
 * @param {number} startPointY 敵敵の出発y座標
 * @return {summaryEnemy} 敵敵の情報まとめ
 */
export function enemyInit(size, startPointX, startPointY, direction) {
    let enemy = [];
    if (direction == true) {
        enemy.push(new Enemy(startPointX, startPointY, direction, true));
        for (let i = 1; i < size; i++) {
            enemy.push(new Enemy(startPointX - (i * 20), startPointY, direction, false));
        }
    } else {
        enemy.push(new Enemy(startPointX, startPointY, direction, true));
        for (let i = 1; i < size; i++) {
            enemy.push(new Enemy(startPointX + (i * 20), startPointY, direction, false));
        }
    }

    return new SummaryEnemy(enemy, true);
}

export class Enemy {

    /*************  ✨ Windsurf Command ⭐  *************/
    /**
     * 敵敵のConstructor
     * @param {number} x 敵敵のx座標
     * @param {number} y 敵敵のy座標
     * @param {boolean} direction 敵敵の向き(右true, 左false)
     * @param {boolean} head 敵敵の頭部フラグ(頭部true, その他false)
     */
    /*******  e2a8d2d0-b08d-46b0-84cd-2586e40940a2  *******/
    constructor(x, y, direction, head) {
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 20;
        this.direction = direction;//右true左false
        this.isHead = head;
        this.isMove = true;
       
    }

    draw(imgNum) {
        if (this.isHead == true) {
            if (this.direction == true) {
                if (imgNum == true) {
                    draw("head1R", this.x, this.y);
                } else {
                    draw("head2R", this.x, this.y);
                }

            } else if (this.direction == false) {
                if (imgNum == true) {
                    draw("head1", this.x, this.y);
                } else {
                    draw("head2", this.x, this.y);
                }
            }
        } else {
            if (this.direction == true) {
                if (imgNum == true) {
                    draw("body2", this.x, this.y);
                } else {
                    draw("body1", this.x, this.y);
                }

            } else if (this.direction == false) {
                if (imgNum == true) {
                    draw("body1", this.x, this.y);
                } else {
                    draw("body2", this.x, this.y);
                }
            }
        }
    }

    /**
     * 敵敵を移動させる
     * @param {number} imgNum ヘ像番号
     * @description moveは、敵を移動させるメソッドです。
     *              clearMoveで、敵の現在の位置を消去し、
     *              x座標を1増減させることで敵を移動します。
     *              directionの値によって、敵の向きを決定します。
     *              imgNumの値によって、敵の画像を決定します。
     */
    move() {
        clearDraw(this.x, this.y, this.w, this.h);
        if (this.direction == true) {
            this.x += 20;
        } else {
            this.x -= 20;
        }
    }
    clearMove() {
        clearDraw(this.x, this.y, this.w, this.h);
        if (this.direction == true) {
            this.x -= 20;
        } else {
            this.x += 20;
        }
    }
    clear() {
        clearDraw(this.x, this.y, this.w, this.h);
    }
    /**
     * 敵敵の現在の位置を消去する
     * @description clearMoveは、敵の現在の位置を消去するメソッドです。
     *              ctx.fillStyleに"black"を指定し、ctx.fillRectで敵の現在の位置を描画することで敵を消去します。
     */

}

export class SummaryEnemy {

    constructor(enemyList, imgNum) {
        this.enemyList = enemyList;
        this.imgNum = imgNum;
        
        this.isMove = true;
    }
    /**
     * 敵敵を移動させる
     * @description summaryEnemyMoveは、敵を移動させるメソッドです。
     *              setIntervalで、500msごとに敵を移動させる。
     *              imgNumの値によって、敵の画像を決定します。
     *              checkCollisionで、敵と壁との衝突を確認します。
     */
    move() {
        if(this.enemyList.length==0){
            clearObjects(this);
        }
        for (let enemy of this.enemyList) {
            enemy.move();
        }
    }
    draw() {
        this.imgNum = !this.imgNum;
        for (let enemy of this.enemyList) {
            enemy.draw(this.imgNum);
        }
    }
    clear() {
        for (let enemy of this.enemyList) {
            enemy.clear();
        }
    }
    addEnemyNum(){
        for(let enemy of this.enemyList){
            enemy.enemyNum++;
        }
    }
    clearMove(){
        for (let enemy of this.enemyList) {
            enemy.clearMove();
        }
    }
}

export function clearEnemy(enemy, obj) {
    obj.clear();
    const list = obj.enemyList;
    const idx = list.indexOf(enemy);
    if (idx === -1) return;

    const wasHead = enemy.isHead;
    if(list.length<=1){
        clearObjects(obj);
        addObjects(new Mushroom(enemy.x, enemy.y));
        return;
    }

    // 前後チェーンに分ける
    const frontChain = list.slice(0, idx);   // 削除対象の前
    const backChain  = list.slice(idx + 1);  // 削除対象の後

    // 元の enemyList を前チェーンだけに更新
    obj.enemyList = frontChain;
    // 削除対象が head で後ろに敵がいる場合、新しい summaryEnemy を生成
    if (backChain.length > 0) {
        backChain[0].isHead = true;
        const newEnemy=new SummaryEnemy(backChain, obj.imgNum);
        newEnemy.addEnemyNum();
        addObjects(newEnemy);  // ← ここで生成
    }

    // 前チェーンの頭が消えた場合は先頭を head にする
    if (!obj.enemyList.some(e => e.isHead) && obj.enemyList.length > 0) {
        obj.enemyList[0].isHead = true;
    }

    // キノコ生成
    addObjects(new Mushroom(enemy.x, enemy.y));
}

