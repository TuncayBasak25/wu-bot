import { keyTap } from "../robotjs";
import { mouse } from "./util/mouse";
import { ship } from "./ship";
import { sleep, when } from "./util/sleep";
import Vector, { Point } from "./util/vector";

type StarMission = "alpha" | "beta" | "gamma" | "kratos";

type VegaMap = "u7" | "u6" | "u5";

type Map = StarMission | VegaMap;

class Nav {
    map: Map = "u7";
    mapSpeedConstant = 105;

    moving = false;

    async starMission(starMission: StarMission) {
        switch (starMission) {
            case "alpha": {
                await this.goto(this.portals.alpha);
                this.map = "alpha";
                break;
            }
            case "beta": {
                await this.goto(this.portals.beta);
                this.map = "beta";
                break;
            }
            case "gamma": {
                await this.goto(this.portals.gamma);
                this.map = "gamma";
                break;
            }
            case "kratos": {
                await this.goto(this.portals.kratos);
                this.map = "kratos";
                break;
            }
        }

        ship.pos.set(this.center);
        this.mapSpeedConstant = 155;

        keyTap("j");
        await sleep(5000);
    }

    async nextStage() {
        await this.goto(this.portals.nextStage);

        keyTap("j");
        await sleep(5000);
    }

    async quitStage() {
        await this.goto(this.portals.quitStage);

        this.map = "u7";
        ship.pos.set(this.u7Base);
        this.mapSpeedConstant = 105;

        keyTap("j");
        await sleep(5000);
    }

    async endGate() {
        await this.goto(this.portals.endGate);

        this.map = "u7";
        ship.pos.set(this.u7Base);
        this.mapSpeedConstant = 105;

        keyTap("j");
        await sleep(5000);
    }

    //Goto position awaiting on reactors
    async calibrate(target: Vector) {
        if (!target.insideBox(this.topLeft, this.botRight)) {
            throw new Error("Minimap out of bound!");
        }

        ship.pos.set(target);

        mouse.click(target.clone.add(this.minimapOffset));

        await when(() => !ship.moving, 1000);

        await when(() => ship.moving);
    }


    async goto(target: Vector) {
        const distance = ship.pos.pointDistance(target);

        ship.pos.set(target);

        mouse.click(target.add(this.minimapOffset));

        this.moving = true;
        await sleep(506 / ship.speed * this.mapSpeedConstant * distance);
        this.moving = false;
    }

    async moveBy(deltaX: number, deltaY: number): Promise<void>;
    async moveBy(delta: Vector): Promise<void>;
    async moveBy(a: number | Vector, b?: number) {
        const [x, y] = Vector.numberOrVector(a, b);

        const target = ship.pos.clone.add(x, y);

        await this.goto(target);
    }


    get topLeft() { return new Vector(0, 0) }
    get topRight() { return new Vector(290, 0) }
    get botLeft() { return new Vector(0, 180) }
    get botRight() { return new Vector(290, 180) }

    get max() { return this.botRight }
    get center() { return this.botRight.div(2) }

    get screenCenter() { return new Vector(960, 520) }

    get minimapOffset() { return new Vector(50, 840) }

    get u7Base() { return new Vector(12, 12) }

    get portals() {
        return {
            alpha: this.center.addY(-30).rotateOver(this.center, 2 * Math.PI / 3 * 2),
            beta: this.center.addY(-30).rotateOver(this.center, 2 * Math.PI / 3),
            gamma: this.center.addY(-30),
            kratos: this.center,

            nextStage: this.center.mulX(0.9),
            quitStage: this.center.mulX(1.1),
            endGate: this.center,
        }
    }
}

export const nav = new Nav();