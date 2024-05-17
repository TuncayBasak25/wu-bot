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
function attackKite(targetName, enemyCount, returnTopLeftCount = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        const alienName = ((nav_1.nav.map === "gamma" || nav_1.nav.map === "beta" && enemyCount < 3) ? "ultra::" : "") + ((nav_1.nav.map === "beta" && enemyCount > 3 || nav_1.nav.map === "alpha" && enemyCount < 3) ? "hyper::" : "") + targetName;
        if (["ultra::magmius", "ultra::zavientos", "hyper::vortex", "ultra::vortex"].includes(alienName))
            ship_1.ship.x4();
        else
            ship_1.ship.x2();
        const target = alien_1.Alien[targetName];
        let killedCount = 0;
        while (enemyCount > 0) {
            if (ship_1.ship.healthLevel < 30) {
                (0, config_1.switchConfig)("speed");
                yield (0, sleep_1.until)(() => (0, config_1.actualConfig)() === "speed");
                const coinPoint = ship_1.ship.pos.farthestPoint(nav_1.nav.botLeft, nav_1.nav.botRight, nav_1.nav.topLeft, nav_1.nav.topRight);
                yield nav_1.nav.goto(coinPoint);
                (0, config_1.switchConfig)("tank");
                yield (0, sleep_1.until)(() => enemyCount > 1 && alien_1.Alien.all().length > 1 || !!alien_1.Alien.one());
            }
            if (ship_1.ship.pos.x < nav_1.nav.botRight.x * 0.2)
                xsens = false;
            else if (ship_1.ship.pos.x > nav_1.nav.botRight.x * 0.8)
                xsens = true;
            if (ship_1.ship.pos.y < nav_1.nav.botRight.y * 0.2)
                ysens = false;
            else if (ship_1.ship.pos.y > nav_1.nav.botRight.y * 0.8)
                ysens = true;
            while (alien_1.Alien.one() && !alien_1.Alien.all().reduce((acc, { pos }) => acc || (xsens ? pos.x > nav_1.nav.screenCenter.x : pos.x < nav_1.nav.screenCenter.x) && (ysens ? pos.y > nav_1.nav.screenCenter.y : pos.y < nav_1.nav.screenCenter.y), false)) {
                (0, config_1.switchConfig)("speed");
                yield nav_1.nav.moveBy(xsens ? -5 : 5, ysens ? -2 : 2);
            }
            while (!ship_1.ship.aim) {
                const start = Date.now();
                while (alien_1.Alien.all(targetName).map(a => a.pos).filter(a => (0, hud_1.outsideHud)(a)).length === 0) {
                    if (Date.now() - start >= 30000 && killedCount > 0)
                        return;
                    yield (0, sleep_1.sleep)(0);
                }
                mouse_1.mouse.click(nav_1.nav.screenCenter.nearestPoint(...alien_1.Alien.all(targetName).map(a => a.pos).filter(a => (0, hud_1.outsideHud)(a))));
                yield (0, sleep_1.when)(() => !ship_1.ship.aim, 2000);
            }
            ship_1.ship.attack();
            if (yield kite(targetName)) {
                enemyCount--;
                killedCount++;
            }
            else {
                console.log(`Let mid health for ${enemyCount} ${alienName}`);
            }
        }
        (0, config_1.switchConfig)("speed");
    });
}
exports.attackKite = attackKite;
function kite(targetName) {
    return __awaiter(this, void 0, void 0, function* () {
        const kitePos = nav_1.nav.screenCenter.set(545, 0).rotate(-Math.PI / 6).add(nav_1.nav.screenCenter);
        const aimOffset = new vector_1.default(64, 64);
        switch (targetName) {
            case "zavientos":
                aimOffset.set(90, 90);
                break;
            case "magmius":
                aimOffset.set(90, 90);
                break;
            case "xeon":
                aimOffset.set(90, 90);
                break;
        }
        if (!ship_1.ship.aim)
            return false;
        ship_1.ship.aim.add(aimOffset);
        const target = alien_1.Alien[targetName];
        const assureAttack = setInterval(() => ship_1.ship.attack(), 3000);
        while (ship_1.ship.aim && ship_1.ship.healthLevel > 30) {
            if (ship_1.ship.healthLevel < 60 && ship_1.ship.shieldLevel > 60)
                (0, robotjs_1.keyTap)("q");
            if (ship_1.ship.healthLevel < 40)
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
