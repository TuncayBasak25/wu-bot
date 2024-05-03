import { getPixelColor, keyTap, mouseClick, moveMouse } from "../robotjs";
import Vector from "./vector";
import { sleep } from "./sleep";
import { getQueries } from "./query";




enum Config {
    speed,
    tank
}

const minimapMaxX = 290;
const minimapMaxY = 180;

export class Ship {
    readonly minimap =  {
        max: new Vector(minimapMaxX, minimapMaxY),
        center: new Vector(minimapMaxX/2, minimapMaxY/2),

        topLeft: new Vector(0, 0),
        topRight: new Vector(minimapMaxX, 0),
        botRight: new Vector(minimapMaxX, minimapMaxY),
        botLeft: new Vector(0, minimapMaxY),

        nextStage: new Vector(minimapMaxX/2 * 0.95, minimapMaxY/2),

        alpha: new Vector(0.415 * minimapMaxX, 0.555 * minimapMaxY),
        beta: new Vector((1 - 0.415) * minimapMaxX, 0.555 * minimapMaxY),
    }

    map: "alpha" | "beta" | "u7" = "alpha";

    readonly pos = new Vector(0, 0);
    config = Config.speed;
    hud = true;


    tankConfig() {
        if (this.config === Config.speed) {
            this.config = Config.tank;
            keyTap("c");
        }
    }

    speedConfig() {
        if (this.config === Config.tank) {
            this.config = Config.speed;
            keyTap("c");
        }
    }

    async showHud() {
        if (!this.hud) {
            this.hud = true;

            keyTap("i");

            await sleep(100);
        }
    }

    async hideHud() {
        if (this.hud) {
            this.hud = false;

            keyTap("i");

            await sleep(100);
        }
    }

    private checkDelay = 50;
    private healthFullCheckBuffer = 0;
    private healthFullInterval = setInterval(async () => {
        if (getPixelColor(1008, 435) === "3cac19") this.healthFullCheckBuffer++;
        else this.healthFullCheckBuffer--;

        if (this.healthFullCheckBuffer > this.checkDelay) this.healthFullCheckBuffer = this.checkDelay;
        else if (this.healthFullCheckBuffer < -this.checkDelay) this.healthFullCheckBuffer = -this.checkDelay;

    }, 10);
    healthFull() {
        return this.healthFullCheckBuffer > 0;
    }

    private shieldFullCheckBuffer = 0;
    private shieldFullInterval = setInterval(async () => {
        if (getPixelColor(1008, 445) === "1b9dda") this.shieldFullCheckBuffer++;
        else this.shieldFullCheckBuffer--;

        if (this.shieldFullCheckBuffer > this.checkDelay) this.shieldFullCheckBuffer = this.checkDelay;
        else if (this.shieldFullCheckBuffer < -this.checkDelay) this.shieldFullCheckBuffer = -this.checkDelay;

    }, 10);
    shieldFull() {
        return this.shieldFullCheckBuffer > 0;
    }

    private healthDownCheckBuffer = 0;
    private healthDownInterval = setInterval(async () => {
        if (getPixelColor(940, 435) === "3cac19") this.healthDownCheckBuffer++;
        else this.healthDownCheckBuffer--;

        if (this.healthDownCheckBuffer > this.checkDelay) this.healthDownCheckBuffer = this.checkDelay;
        else if (this.healthDownCheckBuffer < -this.checkDelay) this.healthDownCheckBuffer = -this.checkDelay;

    }, 10);
    healthDown() {
        return this.healthDownCheckBuffer < 0;
    }

    private shieldDownCheckBuffer = 0;
    private shieldDownInterval = setInterval(async () => {
        if (getPixelColor(940, 445) === "1b9dda") this.shieldDownCheckBuffer++;
        else this.shieldDownCheckBuffer--;

        if (this.shieldDownCheckBuffer > this.checkDelay) this.shieldDownCheckBuffer = this.checkDelay;
        else if (this.shieldDownCheckBuffer < -this.checkDelay) this.shieldDownCheckBuffer = -this.checkDelay;

    }, 10);
    shieldDown() {
        return this.shieldDownCheckBuffer < 0;
    }

    private shieldLowCheckBuffer = 0;
    private shieldLowInterval = setInterval(async () => {
        if (getPixelColor(910, 445) === "1b9dda") this.shieldLowCheckBuffer++;
        else this.shieldLowCheckBuffer--;

        if (this.shieldLowCheckBuffer > this.checkDelay) this.shieldLowCheckBuffer = this.checkDelay;
        else if (this.shieldLowCheckBuffer < -this.checkDelay) this.shieldLowCheckBuffer = -this.checkDelay;

    }, 10);
    shieldLow() {
        return this.shieldLowCheckBuffer < 0;
    }
    

    

    async goto(x: number, y: number) {
        await this.showHud();

        moveMouse(50 + x, 840 + y);
        mouseClick("left");
        
        await sleep(this.pos.pointDistance(x, y) / 4 * (this.map === "u7" ? 425 : 675));
        
        this.pos.set(x, y);
    }

    async travel(x: number, y: number) {
        await this.goto(this.pos.x + x, this.pos.y + y);
    }

    async getFar(distance: number = 0) {
        this.speedConfig();

        const target = [this.minimap.botLeft, this.minimap.botRight, this.minimap.topLeft, this.minimap.topRight]
            .sort((a, b) => a.pointDistance(this.pos) - b.pointDistance(this.pos)).pop()?.clone() as Vector;

        if (distance > 0 && distance < target.pointDistance(this.pos)) {
            const trans = target.clone().sub(this.pos);

            trans.setNorme(distance);

            target.set(this.pos).add(trans);
        }

        await this.goto(...target.xy);
    }

    async nextStage() {
        this.speedConfig();
        await this.goto(...this.minimap.nextStage.xy);

        await this.jump(5000);
    }
    
    async alpha() {
        await this.goto(...this.minimap.alpha.xy);
        await this.jump(5000);
        this.pos.set(this.minimap.max).div(2);
        this.map = "alpha";

        await this.attackMission(20, 100); await this.nextStage();
        await this.attackMission(25, 100); await this.nextStage();
        await this.attackMission(30, 100); await this.nextStage();
        await this.attackMission(31, 100); await this.nextStage();

        await this.attackMission(20, 100); await this.nextStage();
        await this.attackMission(10, 100); await this.nextStage();
        await this.attackMission(10, 100); await this.nextStage();
        await this.attackMission(18, 100); await this.nextStage();

        await this.attackMission(20, 100); await this.nextStage();
        await this.attackMission(10, 100); await this.nextStage();
        await this.attackMission(5, 150); await this.nextStage();
        keyTap("a")
        await this.attackMission(9, 200); await this.nextStage();
        keyTap("&")

        await this.attackMission(15, 100); await this.nextStage();
        await this.attackMission(15, 150); await this.nextStage();
        keyTap("a")
        await this.attackMission(21, 200); await this.nextStage();
        keyTap("&")

        await this.goto(...this.minimap.max.clone().div(2).xy);
        await this.jump();
        this.pos.set(12, 12);
        this.map = "u7";
        console.log("End of zavi alpha");
    }

    async beta() {
        await this.goto(...this.minimap.beta.xy);
        await this.jump(5000);
        this.pos.set(this.minimap.max).div(2);
        this.map = "beta";

        await this.attackMission(20, 100); await this.nextStage();
        await this.attackMission(20, 100); await this.nextStage();
        await this.attackMission(20, 100); await this.nextStage();
        await this.attackMission(19, 100); await this.nextStage();

        await this.attackMission(20, 50); await this.nextStage();
        await this.attackMission(10, 25); await this.nextStage();
        await this.attackMission(10, 100); await this.nextStage();
        await this.attackMission(11, 100); await this.nextStage();

        await this.attackMission(20)//; await this.nextStage();

        //Too difficult for now

        await this.goto(...this.minimap.max.clone().div(2).mulX(1.05).xy);
        await this.jump();
        this.pos.set(12, 12);
        this.map = "u7";
        console.log("End of before zavi beta");

    }

    async gamma() {
        await this.goto(...this.minimap.beta.clone().sub(this.minimap.center).rotate(-Math.PI * 2 / 360 * 120).add(this.minimap.center).xy);
        await this.jump(5000);
        this.pos.set(this.minimap.max).div(2);
        this.map = "beta";

        await this.attackMission(20, 100); await this.nextStage();
        await this.attackMission(20, 100); await this.nextStage();
        await this.attackMission(20, 100); await this.nextStage();

        await this.attackMission(20, 50); await this.nextStage();
        await this.attackMission(10, 25)//; await this.nextStage();
        // await this.attackMission(10, 200); await this.nextStage();
        // await this.attackMission(16, 100); await this.nextStage();

        // await this.attackMission(20); await this.nextStage();

        //Too difficult for now

        await this.goto(...this.minimap.max.clone().div(2).mulX(1.05).xy);
        await this.jump();
        this.pos.set(12, 12);
        this.map = "u7";
        console.log("End of before zavi gamma");

    }

    async kratos() {
        await this.goto(...this.minimap.max.clone().div(2).xy);
        await this.jump(5000);
        this.pos.set(this.minimap.max).div(2);
        this.map = "beta";


        await this.attackMission(30, 100); await this.nextStage();
        await this.attackMission(20, 100); await this.nextStage();
        await this.attackMission(30, 100); await this.nextStage();
        await this.attackMission(16, 100); await this.nextStage();
        await this.attackMission(40, 100); await this.nextStage();
        await this.attackMission(18, 100); await this.nextStage();
        await this.attackMission(40); await this.nextStage();
        await this.attackMission(12, 100); await this.nextStage();
        await this.attackMission(17)//; await this.nextStage();

        //Too difficult for now

        await this.goto(...this.minimap.max.clone().div(2).mulX(1.05).xy);
        await this.jump();
        this.pos.set(12, 12);
        this.map = "u7";
        console.log("End of before last kratos");
        
    }

    async jump(delay: number = 0) {
        keyTap("j");
        await sleep(delay);
    }

    async repairShip() {
        this.tankConfig();

        await sleep(5000);

        while (!this.shieldFull()) await sleep(1000);

        this.speedConfig();
        while (!this.shieldFull() && !this.healthFull()) await sleep(1000);
    }

    async attackMission(enemyCount = 1, repairDistance = 0, kiteSpeed = 0) {
        await this.hideHud();
        this.tankConfig();

        let attack = false;
        let getFar = false;
        while (enemyCount > 0) {
            const { target, aliens } = getQueries();

            if (!target) {
                if (attack) {
                    enemyCount--;
                    attack = false;

                    if (enemyCount > 0 && (getFar || this.shieldDown())) {
                        await this.getFar(repairDistance);

                        this.tankConfig();
                        await this.hideHud();

                        getFar = false;
                    }
                }
                else if (aliens.length > 0) {
                    moveMouse(aliens[0].x, aliens[0].y);
                    mouseClick("left");
                    await sleep(1000);
                }
            }
            else if (!attack) {
                keyTap("control");
                attack = true;
            }
            else if (kiteSpeed > 0) {              
                await this.travel(kiteSpeed, kiteSpeed);
                if (this.pos.x >= this.minimap.max.x-5 || this.pos.y >= this.minimap.max.y-5 || this.pos.x <= 5 || this.pos.y <= 5) {
                    kiteSpeed *= -1;
                    await this.travel(5*kiteSpeed, 5*kiteSpeed);
                }
            }

            await sleep(0);
            
            if (this.shieldLow()) {
                this.speedConfig();

                if (getFar) {
                    keyTap("control");
                    attack = false;
                    await this.getFar(repairDistance);
                    
                    this.tankConfig();
                    await this.hideHud();
                    getFar = false;
                }
                else {
                    getFar = true;
                    await sleep(1000);
                }
            }
        }
    }
}