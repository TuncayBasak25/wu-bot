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
exports.killJumpUntil = exports.assureNextStage = exports.notEndOfStage = void 0;
const robotjs_1 = require("../../robotjs");
const attack_1 = require("../action/attack");
const kite_1 = require("../action/kite");
const alien_1 = require("../alien");
const nav_1 = require("../nav");
const config_1 = require("../param/config");
const hud_1 = require("../param/hud");
const ship_1 = require("../ship");
const mouse_1 = require("../util/mouse");
const sleep_1 = require("../util/sleep");
const vector_1 = __importDefault(require("../util/vector"));
function notEndOfStage(endOfGate = false) {
    return __awaiter(this, void 0, void 0, function* () {
        yield nav_1.nav.goto(endOfGate ? nav_1.nav.portals.endGate : nav_1.nav.portals.nextStage);
        yield (0, sleep_1.until)(() => ship_1.ship.portal, 1000);
        return !ship_1.ship.portal;
    });
}
exports.notEndOfStage = notEndOfStage;
function assureNextStage(killingWay, jump = true, endOfGate = false) {
    return __awaiter(this, void 0, void 0, function* () {
        while (yield notEndOfStage(endOfGate)) {
            yield (0, sleep_1.when)(() => !alien_1.Alien.one());
            killingWay === "attack" ? yield (0, attack_1.attack)(1) : yield (0, kite_1.attackKite)(1);
        }
        if (jump) {
            endOfGate ? yield nav_1.nav.endGate() : (0, robotjs_1.keyTap)("j");
        }
    });
}
exports.assureNextStage = assureNextStage;
function killJumpUntil(...stoppingAlienList) {
    return __awaiter(this, void 0, void 0, function* () {
        ship_1.ship.x2();
        while (true) {
            while (true) {
                if (ship_1.ship.pos.pointDistance(nav_1.nav.portals.nextStage) > 20)
                    (0, config_1.switchConfig)("speed");
                let moving = true;
                nav_1.nav.calibrate(nav_1.nav.portals.nextStage).then(() => moving = false);
                // await sleep(5000);
                yield (0, sleep_1.when)(() => moving && !alien_1.Alien.one());
                if (ship_1.ship.portal)
                    break;
                while (alien_1.Alien.one()) {
                    if (alien_1.Alien.all(...stoppingAlienList).length > 0)
                        return;
                    (0, config_1.switchConfig)("tank");
                    if (ship_1.ship.shieldLevel < 30 && alien_1.Alien.one().name !== "vortex") {
                        (0, config_1.switchConfig)("speed");
                        const velocity = new vector_1.default(ship_1.ship.pos.x <= nav_1.nav.center.x ? 5 : -5, ship_1.ship.pos.y <= nav_1.nav.center.y ? 5 : -5);
                        while (alien_1.Alien.one())
                            yield nav_1.nav.moveBy(velocity);
                        (0, config_1.switchConfig)("tank");
                        yield nav_1.nav.moveBy(velocity);
                        while (true) {
                            if (ship_1.ship.shieldLevel > 90)
                                break;
                            if (alien_1.Alien.one())
                                yield nav_1.nav.moveBy(velocity);
                            yield (0, sleep_1.sleep)(0);
                        }
                        while (!alien_1.Alien.one())
                            yield nav_1.nav.moveBy(velocity.clone.div(-5));
                    }
                    if (alien_1.Alien.all().filter(a => (0, hud_1.outsideHud)(a.pos)).length > 0) {
                        const target = alien_1.Alien.all().filter(a => (0, hud_1.outsideHud)(a.pos))
                            .sort((a, b) => nav_1.nav.screenCenter.pointDistance(a.pos) - nav_1.nav.screenCenter.pointDistance(b.pos))[0];
                        if (target.name === "magmius" || target.name === "zavientos") {
                            yield (0, kite_1.attackKite)(1);
                        }
                        else {
                            mouse_1.mouse.click(target.pos);
                            yield (0, sleep_1.when)(() => !ship_1.ship.aim, 1000);
                            ship_1.ship.attack();
                            const assureAttack = setInterval(() => ship_1.ship.attack(), 3000);
                            yield (0, sleep_1.until)(() => !ship_1.ship.aim);
                            clearInterval(assureAttack);
                        }
                    }
                    yield (0, sleep_1.sleep)(0);
                }
                yield (0, sleep_1.sleep)(0);
            }
            (0, config_1.switchConfig)("tank");
            yield (0, sleep_1.until)(() => ship_1.ship.shieldLevel > 90 && ship_1.ship.healthLevel > 90);
            (0, robotjs_1.keyTap)("j");
            yield (0, sleep_1.sleep)(6000);
        }
    });
}
exports.killJumpUntil = killJumpUntil;
