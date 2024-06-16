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
exports.nav = void 0;
const robotjs_1 = require("../robotjs");
const mouse_1 = require("./util/mouse");
const ship_1 = require("./ship");
const sleep_1 = require("./util/sleep");
const vector_1 = __importDefault(require("./util/vector"));
class Nav {
    constructor() {
        this.map = "u7";
        this.mapSpeedConstant = 105;
        this.moving = false;
    }
    starMission(starMission) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (starMission) {
                case "alpha": {
                    yield this.goto(this.portals.alpha);
                    this.map = "alpha";
                    break;
                }
                case "beta": {
                    yield this.goto(this.portals.beta);
                    this.map = "beta";
                    break;
                }
                case "gamma": {
                    yield this.goto(this.portals.gamma);
                    this.map = "gamma";
                    break;
                }
                case "kratos": {
                    yield this.goto(this.portals.kratos);
                    this.map = "kratos";
                    break;
                }
            }
            ship_1.ship.pos.set(this.center);
            this.mapSpeedConstant = 155;
            (0, robotjs_1.keyTap)("j");
            yield (0, sleep_1.sleep)(5000);
        });
    }
    nextStage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.goto(this.portals.nextStage);
            (0, robotjs_1.keyTap)("j");
            yield (0, sleep_1.sleep)(5000);
        });
    }
    quitStage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.goto(this.portals.quitStage);
            this.map = "u7";
            ship_1.ship.pos.set(this.u7Base);
            this.mapSpeedConstant = 105;
            (0, robotjs_1.keyTap)("j");
            yield (0, sleep_1.sleep)(5000);
        });
    }
    endGate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.goto(this.portals.endGate);
            this.map = "u7";
            ship_1.ship.pos.set(this.u7Base);
            this.mapSpeedConstant = 105;
            (0, robotjs_1.keyTap)("j");
            yield (0, sleep_1.sleep)(5000);
        });
    }
    //Goto position awaiting on reactors
    calibrate(target) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!target.insideBox(this.topLeft, this.botRight)) {
                throw new Error("Minimap out of bound!");
            }
            ship_1.ship.pos.set(target);
            mouse_1.mouse.click(target.clone.add(this.minimapOffset));
            yield (0, sleep_1.when)(() => !ship_1.ship.moving, 1000);
            yield (0, sleep_1.when)(() => ship_1.ship.moving);
        });
    }
    goto(target) {
        return __awaiter(this, void 0, void 0, function* () {
            if (target.x < 0)
                target.setX(0);
            else if (target.x > exports.nav.botRight.x)
                target.setX(exports.nav.botRight.x);
            if (target.y < 0)
                target.setY(0);
            else if (target.y > exports.nav.botRight.y)
                target.setY(exports.nav.botRight.y);
            const distance = ship_1.ship.pos.pointDistance(target);
            ship_1.ship.pos.set(target);
            mouse_1.mouse.click(target.add(this.minimapOffset));
            this.moving = true;
            yield (0, sleep_1.sleep)(506 / ship_1.ship.speed * this.mapSpeedConstant * distance);
            this.moving = false;
        });
    }
    moveBy(a, b) {
        return __awaiter(this, void 0, void 0, function* () {
            const [x, y] = vector_1.default.numberOrVector(a, b);
            const target = ship_1.ship.pos.clone.add(x, y);
            yield this.goto(target);
        });
    }
    get topLeft() { return new vector_1.default(0, 0); }
    get topRight() { return new vector_1.default(290, 0); }
    get botLeft() { return new vector_1.default(0, 180); }
    get botRight() { return new vector_1.default(290, 180); }
    get max() { return this.botRight; }
    get center() { return this.botRight.div(2); }
    get screenCenter() { return new vector_1.default(960, 520); }
    get minimapOffset() { return new vector_1.default(50, 840); }
    get u7Base() { return new vector_1.default(12, 12); }
    get portals() {
        return {
            alpha: this.center.addY(-30).rotateOver(this.center, 2 * Math.PI / 3 * 2),
            beta: this.center.addY(-30).rotateOver(this.center, 2 * Math.PI / 3),
            gamma: this.center.addY(-30),
            kratos: this.center,
            nextStage: this.center.mulX(0.9),
            quitStage: this.center.mulX(1.1),
            endGate: this.center,
        };
    }
}
exports.nav = new Nav();
