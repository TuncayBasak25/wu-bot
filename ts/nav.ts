import { keyTap } from "../robotjs";
import { mouse } from "./util/mouse";
import { ship } from "./ship";
import { sleep, until, when } from "./util/sleep";
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
        keyTap("h");
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

    private target = new Vector(12, 12);
    private async move() {
        while (true) {
            await until(() => this.moving);

            mouse.click(this.target.clone.add(this.minimapOffset));

            const startDiff = this.target.clone.sub(ship.pos);

            do {
                const start = Date.now();
                await sleep(0);
                const deltaT = Date.now() - start;

                ship.pos.add(startDiff.clone.setNorme(ship.speed * deltaT / this.mapSpeedConstant / 506));
            } while (this.target.clone.sub(ship.pos).scalar(startDiff) > 0.95);

            ship.pos.set(this.target);

            this.moving = false;
        }
    }

    async goto(target: Vector) {
        if (target.x < 0) target.setX(0);
        else if (target.x > nav.botRight.x) target.setX(nav.botRight.x);
        if (target.y < 0) target.setY(0);
        else if (target.y > nav.botRight.y) target.setY(nav.botRight.y);

        this.target.set(target);

        this.moving = true;

        await when(() => this.moving);
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

(nav as any).move();