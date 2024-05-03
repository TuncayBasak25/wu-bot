"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ship = void 0;
const robotjs_1 = require("../robotjs");
const vector_1 = __importDefault(require("./vector"));
const sleep_1 = require("./sleep");
const query_1 = require("./query");
var Config;
(function (Config) {
    Config[Config["speed"] = 0] = "speed";
    Config[Config["tank"] = 1] = "tank";
})(Config || (Config = {}));
const minimapMaxX = 290;
const minimapMaxY = 180;
class Ship {
    constructor() {
        this.minimap = {
            max: new vector_1.default(minimapMaxX, minimapMaxY),
            center: new vector_1.default(minimapMaxX / 2, minimapMaxY / 2),
            topLeft: new vector_1.default(0, 0),
            topRight: new vector_1.default(minimapMaxX, 0),
            botRight: new vector_1.default(minimapMaxX, minimapMaxY),
            botLeft: new vector_1.default(0, minimapMaxY),
            nextStage: new vector_1.default(minimapMaxX / 2 * 0.95, minimapMaxY / 2),
            alpha: new vector_1.default(0.415 * minimapMaxX, 0.555 * minimapMaxY),
            beta: new vector_1.default((1 - 0.415) * minimapMaxX, 0.555 * minimapMaxY),
        };
        this.map = "alpha";
        this.pos = new vector_1.default(0, 0);
        this.config = Config.speed;
        this.hud = true;
        this.checkDelay = 50;
        this.healthFullCheckBuffer = 0;
        this.healthFullInterval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
            if ((0, robotjs_1.getPixelColor)(1008, 435) === "3cac19")
                this.healthFullCheckBuffer++;
            else
                this.healthFullCheckBuffer--;
            if (this.healthFullCheckBuffer > this.checkDelay)
                this.healthFullCheckBuffer = this.checkDelay;
            else if (this.healthFullCheckBuffer < -this.checkDelay)
                this.healthFullCheckBuffer = -this.checkDelay;
        }), 10);
        this.shieldFullCheckBuffer = 0;
        this.shieldFullInterval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
            if ((0, robotjs_1.getPixelColor)(1008, 445) === "1b9dda")
                this.shieldFullCheckBuffer++;
            else
                this.shieldFullCheckBuffer--;
            if (this.shieldFullCheckBuffer > this.checkDelay)
                this.shieldFullCheckBuffer = this.checkDelay;
            else if (this.shieldFullCheckBuffer < -this.checkDelay)
                this.shieldFullCheckBuffer = -this.checkDelay;
        }), 10);
        this.healthDownCheckBuffer = 0;
        this.healthDownInterval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
            if ((0, robotjs_1.getPixelColor)(940, 435) === "3cac19")
                this.healthDownCheckBuffer++;
            else
                this.healthDownCheckBuffer--;
            if (this.healthDownCheckBuffer > this.checkDelay)
                this.healthDownCheckBuffer = this.checkDelay;
            else if (this.healthDownCheckBuffer < -this.checkDelay)
                this.healthDownCheckBuffer = -this.checkDelay;
        }), 10);
        this.shieldDownCheckBuffer = 0;
        this.shieldDownInterval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
            if ((0, robotjs_1.getPixelColor)(940, 445) === "1b9dda")
                this.shieldDownCheckBuffer++;
            else
                this.shieldDownCheckBuffer--;
            if (this.shieldDownCheckBuffer > this.checkDelay)
                this.shieldDownCheckBuffer = this.checkDelay;
            else if (this.shieldDownCheckBuffer < -this.checkDelay)
                this.shieldDownCheckBuffer = -this.checkDelay;
        }), 10);
        this.shieldLowCheckBuffer = 0;
        this.shieldLowInterval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
            if ((0, robotjs_1.getPixelColor)(910, 445) === "1b9dda")
                this.shieldLowCheckBuffer++;
            else
                this.shieldLowCheckBuffer--;
            if (this.shieldLowCheckBuffer > this.checkDelay)
                this.shieldLowCheckBuffer = this.checkDelay;
            else if (this.shieldLowCheckBuffer < -this.checkDelay)
                this.shieldLowCheckBuffer = -this.checkDelay;
        }), 10);
    }
    tankConfig() {
        if (this.config === Config.speed) {
            this.config = Config.tank;
            (0, robotjs_1.keyTap)("c");
        }
    }
    speedConfig() {
        if (this.config === Config.tank) {
            this.config = Config.speed;
            (0, robotjs_1.keyTap)("c");
        }
    }
    showHud() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.hud) {
                this.hud = true;
                (0, robotjs_1.keyTap)("i");
                yield (0, sleep_1.sleep)(100);
            }
        });
    }
    hideHud() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.hud) {
                this.hud = false;
                (0, robotjs_1.keyTap)("i");
                yield (0, sleep_1.sleep)(100);
            }
        });
    }
    healthFull() {
        return this.healthFullCheckBuffer > 0;
    }
    shieldFull() {
        return this.shieldFullCheckBuffer > 0;
    }
    healthDown() {
        return this.healthDownCheckBuffer < 0;
    }
    shieldDown() {
        return this.shieldDownCheckBuffer < 0;
    }
    shieldLow() {
        return this.shieldLowCheckBuffer < 0;
    }
    goto(x, y) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.showHud();
            (0, robotjs_1.moveMouse)(50 + x, 840 + y);
            (0, robotjs_1.mouseClick)("left");
            yield (0, sleep_1.sleep)(this.pos.pointDistance(x, y) / 4 * (this.map === "u7" ? 425 : 675));
            this.pos.set(x, y);
        });
    }
    travel(x, y) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.goto(this.pos.x + x, this.pos.y + y);
        });
    }
    getFar(distance = 0) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.speedConfig();
            const target = (_a = [this.minimap.botLeft, this.minimap.botRight, this.minimap.topLeft, this.minimap.topRight]
                .sort((a, b) => a.pointDistance(this.pos) - b.pointDistance(this.pos)).pop()) === null || _a === void 0 ? void 0 : _a.clone();
            if (distance > 0 && distance < target.pointDistance(this.pos)) {
                const trans = target.clone().sub(this.pos);
                trans.setNorme(distance);
                target.set(this.pos).add(trans);
            }
            yield this.goto(...target.xy);
        });
    }
    nextStage() {
        return __awaiter(this, void 0, void 0, function* () {
            this.speedConfig();
            yield this.goto(...this.minimap.nextStage.xy);
            yield this.jump(5000);
        });
    }
    alpha() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.goto(...this.minimap.alpha.xy);
            yield this.jump(5000);
            this.pos.set(this.minimap.max).div(2);
            this.map = "alpha";
            yield this.attackMission(20, 100);
            yield this.nextStage();
            yield this.attackMission(25, 100);
            yield this.nextStage();
            yield this.attackMission(30, 100);
            yield this.nextStage();
            yield this.attackMission(31, 100);
            yield this.nextStage();
            yield this.attackMission(20, 100);
            yield this.nextStage();
            yield this.attackMission(10, 100);
            yield this.nextStage();
            yield this.attackMission(10, 100);
            yield this.nextStage();
            yield this.attackMission(18, 100);
            yield this.nextStage();
            yield this.attackMission(20, 100);
            yield this.nextStage();
            yield this.attackMission(10, 100);
            yield this.nextStage();
            yield this.attackMission(5, 150);
            yield this.nextStage();
            (0, robotjs_1.keyTap)("a");
            yield this.attackMission(9, 200);
            yield this.nextStage();
            (0, robotjs_1.keyTap)("&");
            yield this.attackMission(15, 100);
            yield this.nextStage();
            yield this.attackMission(15, 150);
            yield this.nextStage();
            (0, robotjs_1.keyTap)("a");
            yield this.attackMission(21, 200);
            yield this.nextStage();
            (0, robotjs_1.keyTap)("&");
            yield this.goto(...this.minimap.max.clone().div(2).xy);
            yield this.jump();
            this.pos.set(12, 12);
            this.map = "u7";
            console.log("End of zavi alpha");
        });
    }
    beta() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.goto(...this.minimap.beta.xy);
            yield this.jump(5000);
            this.pos.set(this.minimap.max).div(2);
            this.map = "beta";
            yield this.attackMission(20, 100);
            yield this.nextStage();
            yield this.attackMission(20, 100);
            yield this.nextStage();
            yield this.attackMission(20, 100);
            yield this.nextStage();
            yield this.attackMission(19, 100);
            yield this.nextStage();
            yield this.attackMission(20, 50);
            yield this.nextStage();
            yield this.attackMission(10, 25);
            yield this.nextStage();
            yield this.attackMission(10, 100);
            yield this.nextStage();
            yield this.attackMission(11, 100);
            yield this.nextStage();
            yield this.attackMission(20); //; await this.nextStage();
            //Too difficult for now
            yield this.goto(...this.minimap.max.clone().div(2).mulX(1.05).xy);
            yield this.jump();
            this.pos.set(12, 12);
            this.map = "u7";
            console.log("End of before zavi beta");
        });
    }
    gamma() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.goto(...this.minimap.beta.clone().sub(this.minimap.center).rotate(-Math.PI * 2 / 360 * 120).add(this.minimap.center).xy);
            yield this.jump(5000);
            this.pos.set(this.minimap.max).div(2);
            this.map = "beta";
            yield this.attackMission(20, 100);
            yield this.nextStage();
            yield this.attackMission(20, 100);
            yield this.nextStage();
            yield this.attackMission(20, 100);
            yield this.nextStage();
            yield this.attackMission(20, 50);
            yield this.nextStage();
            yield this.attackMission(10, 25); //; await this.nextStage();
            // await this.attackMission(10, 200); await this.nextStage();
            // await this.attackMission(16, 100); await this.nextStage();
            // await this.attackMission(20); await this.nextStage();
            //Too difficult for now
            yield this.goto(...this.minimap.max.clone().div(2).mulX(1.05).xy);
            yield this.jump();
            this.pos.set(12, 12);
            this.map = "u7";
            console.log("End of before zavi gamma");
        });
    }
    kratos() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.goto(...this.minimap.max.clone().div(2).xy);
            yield this.jump(5000);
            this.pos.set(this.minimap.max).div(2);
            this.map = "beta";
            yield this.attackMission(30, 100);
            yield this.nextStage();
            yield this.attackMission(20, 100);
            yield this.nextStage();
            yield this.attackMission(30, 100);
            yield this.nextStage();
            yield this.attackMission(16, 100);
            yield this.nextStage();
            yield this.attackMission(40, 100);
            yield this.nextStage();
            yield this.attackMission(18, 100);
            yield this.nextStage();
            yield this.attackMission(40);
            yield this.nextStage();
            yield this.attackMission(12, 100);
            yield this.nextStage();
            yield this.attackMission(17); //; await this.nextStage();
            //Too difficult for now
            yield this.goto(...this.minimap.max.clone().div(2).mulX(1.05).xy);
            yield this.jump();
            this.pos.set(12, 12);
            this.map = "u7";
            console.log("End of before last kratos");
        });
    }
    jump(delay = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, robotjs_1.keyTap)("j");
            yield (0, sleep_1.sleep)(delay);
        });
    }
    repairShip() {
        return __awaiter(this, void 0, void 0, function* () {
            this.tankConfig();
            yield (0, sleep_1.sleep)(5000);
            while (!this.shieldFull())
                yield (0, sleep_1.sleep)(1000);
            this.speedConfig();
            while (!this.shieldFull() && !this.healthFull())
                yield (0, sleep_1.sleep)(1000);
        });
    }
    attackMission(enemyCount = 1, repairDistance = 0, kiteSpeed = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.hideHud();
            this.tankConfig();
            let attack = false;
            let getFar = false;
            while (enemyCount > 0) {
                const { target, aliens } = (0, query_1.getQueries)();
                if (!target) {
                    if (attack) {
                        enemyCount--;
                        attack = false;
                        if (enemyCount > 0 && (getFar || this.shieldDown())) {
                            yield this.getFar(repairDistance);
                            this.tankConfig();
                            yield this.hideHud();
                            getFar = false;
                        }
                    }
                    else if (aliens.length > 0) {
                        (0, robotjs_1.moveMouse)(aliens[0].x, aliens[0].y);
                        (0, robotjs_1.mouseClick)("left");
                        yield (0, sleep_1.sleep)(1000);
                    }
                }
                else if (!attack) {
                    (0, robotjs_1.keyTap)("control");
                    attack = true;
                }
                else if (kiteSpeed > 0) {
                    yield this.travel(kiteSpeed, kiteSpeed);
                    if (this.pos.x >= this.minimap.max.x - 5 || this.pos.y >= this.minimap.max.y - 5 || this.pos.x <= 5 || this.pos.y <= 5) {
                        kiteSpeed *= -1;
                        yield this.travel(5 * kiteSpeed, 5 * kiteSpeed);
                    }
                }
                yield (0, sleep_1.sleep)(0);
                if (this.shieldLow()) {
                    this.speedConfig();
                    if (getFar) {
                        (0, robotjs_1.keyTap)("control");
                        attack = false;
                        yield this.getFar(repairDistance);
                        this.tankConfig();
                        yield this.hideHud();
                        getFar = false;
                    }
                    else {
                        getFar = true;
                        yield (0, sleep_1.sleep)(1000);
                    }
                }
            }
        });
    }
}
exports.Ship = Ship;
