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
Object.defineProperty(exports, "__esModule", { value: true });
exports.gamma = void 0;
const robotjs_1 = require("../../robotjs");
const kite_1 = require("../action/kite");
const alien_1 = require("../alien");
const starmission_1 = require("../menu/starmission");
const nav_1 = require("../nav");
const config_1 = require("../param/config");
const hud_1 = require("../param/hud");
const ship_1 = require("../ship");
const mouse_1 = require("../util/mouse");
const sleep_1 = require("../util/sleep");
const stage_1 = require("./stage");
function gamma(skipWawe = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, robotjs_1.keyTap)("h");
        yield (0, starmission_1.buyX2)(2);
        yield nav_1.nav.starMission("gamma");
        yield (0, stage_1.killJumpUntil)("xeon");
        yield (0, kite_1.attackKite)("xeon", 10);
        yield (0, stage_1.killJumpUntil)("bangoliour");
        (0, robotjs_1.keyTap)("v");
        yield (0, kite_1.attackKite)("bangoliour", 20);
        yield (0, stage_1.killJumpUntil)("zavientos");
        yield (0, kite_1.attackKite)("zavientos", 5);
        yield (0, stage_1.killJumpUntil)("magmius");
        yield nav_1.nav.goto(nav_1.nav.center.setY(0));
        yield (0, sleep_1.when)(() => !alien_1.Alien.one());
        yield nav_1.nav.goto(nav_1.nav.center.setX(nav_1.nav.botRight.x));
        yield (0, sleep_1.when)(() => !alien_1.Alien.one());
        yield nav_1.nav.goto(nav_1.nav.center.setY(0));
        yield (0, sleep_1.when)(() => !alien_1.Alien.one());
        yield nav_1.nav.goto(nav_1.nav.center.setX(nav_1.nav.botRight.x));
        yield (0, sleep_1.when)(() => !alien_1.Alien.one());
        yield nav_1.nav.goto(nav_1.nav.topRight);
        yield (0, sleep_1.when)(() => !alien_1.Alien.one());
        (0, robotjs_1.keyTap)("v");
        yield (0, kite_1.attackKite)("magmius", 5);
        yield (0, stage_1.killJumpUntil)("bangoliour");
        (0, robotjs_1.keyTap)("v");
        yield (0, kite_1.attackKite)("bangoliour", 2);
        yield (0, kite_1.attackKite)("zavientos", 2);
        yield (0, kite_1.attackKite)("magmius", 1);
        yield (0, stage_1.killJumpUntil)("vortex");
        yield ultraVortexStage();
        yield (0, stage_1.killJumpUntil)("plairon");
        yield (0, kite_1.attackKite)("bangoliour", 1);
        yield (0, kite_1.attackKite)("vortex", 1);
        yield (0, kite_1.attackKite)("raider", 1);
        yield (0, kite_1.attackKite)("magmius", 1);
        yield (0, kite_1.attackKite)("zavientos", 1);
        yield (0, kite_1.attackKite)("xeon", 1);
        yield (0, stage_1.assureNextStage)("attack", true, true);
    });
}
exports.gamma = gamma;
let keepConstantMove = false;
const lastCoin = nav_1.nav.center;
function constantMove() {
    return __awaiter(this, void 0, void 0, function* () {
        while (keepConstantMove) {
            yield (0, sleep_1.when)(() => ship_1.ship.moving);
            nav_1.nav.calibrate(ship_1.ship.pos.farthestPoint(nav_1.nav.botLeft, nav_1.nav.botRight, nav_1.nav.topLeft, nav_1.nav.topRight));
        }
    });
}
function ultraVortexStage() {
    return __awaiter(this, void 0, void 0, function* () {
        let vortexCount = 15;
        (0, robotjs_1.keyTap)("v");
        while (vortexCount > 0) {
            (0, config_1.switchConfig)("tank");
            const start = Date.now();
            yield (0, sleep_1.when)(() => alien_1.Alien.all().filter(a => (0, hud_1.outsideHud)(a.pos)).length === 0);
            if (Date.now() - start > 30000)
                break;
            while (ship_1.ship.shieldLevel > 20) {
                if (ship_1.ship.healthLevel < 60)
                    (0, robotjs_1.keyTap)("q");
                while (!ship_1.ship.aim) {
                    yield (0, sleep_1.when)(() => alien_1.Alien.all().filter(a => (0, hud_1.outsideHud)(a.pos)).length === 0);
                    mouse_1.mouse.click(nav_1.nav.screenCenter.nearestPoint(...alien_1.Alien.all().map(a => a.pos).filter(a => (0, hud_1.outsideHud)(a))));
                    yield (0, sleep_1.when)(() => !ship_1.ship.aim, 800);
                }
                const mrs = (vortexCount > 10) && setInterval(() => (0, robotjs_1.keyTap)("z"), 1500);
                (0, robotjs_1.keyTap)("2");
                yield (0, sleep_1.sleep)(mrs ? 3000 : 5000);
                (0, robotjs_1.keyTap)("s");
                (0, robotjs_1.keyTap)("a");
                yield (0, sleep_1.until)(() => !ship_1.ship.aim);
                mrs && clearInterval(mrs);
                vortexCount--;
            }
            (0, config_1.switchConfig)("speed");
            (0, robotjs_1.keyTap)("e");
            yield (0, sleep_1.until)(() => ship_1.ship.speed === 506);
            yield nav_1.nav.goto(ship_1.ship.pos.farthestPoint(nav_1.nav.botLeft, nav_1.nav.botRight, nav_1.nav.topLeft, nav_1.nav.topRight));
        }
    });
}
