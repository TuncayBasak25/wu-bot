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
exports.kite = exports.attackKite = void 0;
const robotjs_1 = require("../../robotjs");
const alien_1 = require("../alien");
const nav_1 = require("../nav");
const config_1 = require("../param/config");
const hud_1 = require("../param/hud");
const ship_1 = require("../ship");
const mouse_1 = require("../util/mouse");
const sleep_1 = require("../util/sleep");
const vector_1 = __importDefault(require("../util/vector"));
let xsens = true;
let ysens = false;
function attackKite(enemyCount) {
    return __awaiter(this, void 0, void 0, function* () {
        let killedCount = 0;
        while (enemyCount > 0) {
            if (ship_1.ship.healthLevel < 50) {
                (0, robotjs_1.keyTap)("e");
                (0, config_1.switchConfig)("speed");
                yield (0, sleep_1.until)(() => (0, config_1.actualConfig)() === "speed");
                yield nav_1.nav.goto(ship_1.ship.pos.farthestPoint(nav_1.nav.botLeft, nav_1.nav.botRight, nav_1.nav.topLeft, nav_1.nav.topRight));
                (0, config_1.switchConfig)("tank");
                yield (0, sleep_1.until)(() => enemyCount > 1 && alien_1.Alien.all().length > 1 || !!alien_1.Alien.one());
            }
            let sideSwitch = false;
            if (ship_1.ship.pos.x < nav_1.nav.botRight.x * 0.2) {
                xsens = false;
                sideSwitch = true;
            }
            else if (ship_1.ship.pos.x > nav_1.nav.botRight.x * 0.8) {
                xsens = true;
                sideSwitch = true;
            }
            if (ship_1.ship.pos.y < nav_1.nav.botRight.y * 0.2) {
                ysens = false;
                sideSwitch = true;
            }
            else if (ship_1.ship.pos.y > nav_1.nav.botRight.y * 0.8) {
                ysens = true;
                sideSwitch = true;
            }
            while (sideSwitch && alien_1.Alien.one() && !alien_1.Alien.all().reduce((acc, { pos }) => acc || (xsens ? pos.x > nav_1.nav.screenCenter.x * 1.5 : pos.x < nav_1.nav.screenCenter.x * 0.5) && (ysens ? pos.y > nav_1.nav.screenCenter.y * 1.5 : pos.y < nav_1.nav.screenCenter.y * 0.5), false)) {
                (0, config_1.switchConfig)("speed");
                yield nav_1.nav.moveBy(xsens ? -10 : 10, ysens ? -3 : 3);
            }
            let target;
            while (!target) {
                const start = Date.now();
                while (alien_1.Alien.all().map(a => a.pos).filter(a => (0, hud_1.outsideHud)(a)).length === 0) {
                    if (Date.now() - start >= 30000 && killedCount > 0)
                        return;
                    yield (0, sleep_1.sleep)(0);
                }
                const alienInsideHud = alien_1.Alien.all().filter(a => (0, hud_1.outsideHud)(a.pos));
                const fastestAliens = alienInsideHud.sort((a, b) => b.speed - a.speed).filter(a => a.speed === alienInsideHud[0].speed);
                target = fastestAliens[0];
                mouse_1.mouse.click((new vector_1.default(xsens ? 0 : 1920, ysens ? 0 : 1080)).nearestPoint(...fastestAliens.map(a => a.pos)));
                yield (0, sleep_1.when)(() => !ship_1.ship.aim, 2000);
                if (!ship_1.ship.aim)
                    target = undefined;
            }
            if (["hydro", "jenta", "mali"].includes(target.name))
                ship_1.ship.x2();
            else
                ship_1.ship.x4();
            ship_1.ship.attack();
            if (yield kite(target)) {
                enemyCount--;
                killedCount++;
            }
            else {
                console.log(`Let mid health for ${enemyCount} ${target.name}`);
            }
        }
        (0, config_1.switchConfig)("speed");
    });
}
exports.attackKite = attackKite;
function kite(target) {
    return __awaiter(this, void 0, void 0, function* () {
        const kitePos = nav_1.nav.screenCenter.set(545, 0).rotate(-Math.PI / 6).add(nav_1.nav.screenCenter);
        const aimOffset = new vector_1.default(64, 64);
        switch (target.name) {
            case "zavientos":
                aimOffset.set(95, 90);
                break;
            case "magmius":
                aimOffset.set(95, 90);
                break;
            case "xeon":
                aimOffset.set(95, 90);
                break;
        }
        if (!ship_1.ship.aim)
            return false;
        ship_1.ship.aim.add(aimOffset);
        const assureAttack = setInterval(() => ship_1.ship.attack(), 3000);
        while (ship_1.ship.aim && ship_1.ship.healthLevel > 30) {
            if (ship_1.ship.healthLevel < 50)
                (0, robotjs_1.keyTap)("q");
            if (ship_1.ship.healthLevel < 80)
                (0, robotjs_1.keyTap)("v");
            if (ship_1.ship.pos.x < 3)
                xsens = false;
            else if (ship_1.ship.pos.x > nav_1.nav.botRight.x - 3)
                xsens = true;
            if (ship_1.ship.pos.y < 3)
                ysens = false;
            else if (ship_1.ship.pos.y > nav_1.nav.botRight.y - 3)
                ysens = true;
            const desiredEnemyPosition = new vector_1.default(xsens ? kitePos.x : 1920 - kitePos.x, ysens ? 1080 - kitePos.y : kitePos.y);
            ship_1.ship.aim.add(aimOffset);
            const delta = desiredEnemyPosition.clone.sub(ship_1.ship.aim).mul(-1);
            const diff = ship_1.ship.aim.pointDistance(desiredEnemyPosition);
            diff > 500 ? (0, config_1.switchConfig)("speed") : (0, config_1.switchConfig)("tank");
            delta.setNorme(Math.min(5, diff / 50 * (target.speed / ship_1.ship.speed * 2.2) ** 2));
            delta.set(Math[xsens ? "min" : "max"](0, delta.x), Math[ysens ? "min" : "max"](0, delta.y));
            yield nav_1.nav.moveBy(delta);
        }
        clearInterval(assureAttack);
        if (ship_1.ship.aim) {
            (0, robotjs_1.keyTap)("control");
            return false;
        }
        return true;
    });
}
exports.kite = kite;
