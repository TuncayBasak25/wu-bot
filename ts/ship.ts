import { getPixelColor, keyTap, mouseClick, moveMouse } from "../robotjs";
import Vector from "./util/vector";
import { sleep } from "./util/sleep";
import { Promotion } from "./alien";


enum LaserAmmo {
    x2 = "1",
    x3 = "3",
    x4 = "a",
    abs = "2",
}


export class Ship {
    healthLevel = 0;
    shieldLevel = 0;

    damage = 13000;

    speed = 506;
    moving = false;

    portal = false;
    tw = false;
    disconnected = false;

    promotion = Promotion.normal;
    aim?: Vector;

    bonusBoxes: Vector[] = [];
    cargoBoxes: Vector[] = [];


    laserAmmo: LaserAmmo = LaserAmmo.x2;
    attack() {
        keyTap(this.laserAmmo);
    }

    stopAttack() {
        keyTap("control");
    }

    x2() { this.laserAmmo = LaserAmmo.x2; }
    x3() { this.laserAmmo = LaserAmmo.x3; }
    x4() { this.laserAmmo = LaserAmmo.x4; }
    abs() { this.laserAmmo = LaserAmmo.abs; }
    

    readonly pos = new Vector(0, 0);


    get health() {
        return this.healthLevel * 296000 / 100;
    }
    get shield() {
        return this.shieldLevel * (this.speed === 506 ? 307000 : 356000) / 100;
    }
}


export const ship = new Ship();