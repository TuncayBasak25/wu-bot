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
exports.killJumpUntil = exports.attack = void 0;
const kite_1 = require("../action/kite");
const alien_1 = require("../alien");
const nav_1 = require("../nav");
const config_1 = require("../param/config");
const hud_1 = require("../param/hud");
const ship_1 = require("../ship");
const mouse_1 = require("../util/mouse");
const sleep_1 = require("../util/sleep");
const vector_1 = __importDefault(require("../util/vector"));
function attack() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, config_1.switchConfig)("tank");
        if (ship_1.ship.shieldLevel < 30 && alien_1.Alien.one().name !== "vortex") {
            (0, config_1.switchConfig)("speed");
            const velocity = new vector_1.default(ship_1.ship.pos.x <= nav_1.nav.center.x ? 5 : -5, ship_1.ship.pos.y <= nav_1.nav.center.y ? 5 : -5);
            while (alien_1.Alien.one())
                yield nav_1.nav.moveBy(velocity);
            yield (0, config_1.switchConfig)("tank");
            yield (0, sleep_1.sleep)(500);
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
            ship_1.ship.x2();
            ship_1.ship.nc();
            if (nav_1.nav.map === "beta" && (target.name === "zavientos" || target.name === "magmius" || target.name === "bangoliour" || target.name === "vortex")) {
                ship_1.ship.x4();
                ship_1.ship.tnc();
            }
            if (nav_1.nav.map === "gamma" && (target.name === "zavientos" || target.name === "magmius" || target.name === "bangoliour" || target.name === "vortex")) {
                ship_1.ship.x4();
                ship_1.ship.tnc();
            }
            if (target.name === "magmius" || target.name === "zavientos") {
                yield (0, kite_1.attackKite)(1);
            }
            else {
                mouse_1.mouse.click(target.pos);
                yield (0, sleep_1.when)(() => !ship_1.ship.aim, 1000);
                ship_1.ship.attack();
                const assureAttack = setInterval(() => ship_1.ship.attack(), 1000);
                yield (0, sleep_1.until)(() => !ship_1.ship.aim);
                clearInterval(assureAttack);
            }
        }
    });
}
exports.attack = attack;
function killJumpUntil(...stoppingAlienList) {
    return __awaiter(this, void 0, void 0, function* () {
        const nextGate = stoppingAlienList.length === 0 ? nav_1.nav.portals.endGate : nav_1.nav.portals.nextStage;
        (0, config_1.switchConfig)("speed");
        yield nav_1.nav.goto(nextGate);
        yield (0, sleep_1.until)(() => ship_1.ship.portal || !!alien_1.Alien.one());
        if (ship_1.ship.portal) {
            (0, config_1.switchConfig)("tank");
            yield (0, sleep_1.until)(() => ship_1.ship.shieldLevel > 90 && ship_1.ship.healthLevel > 90);
            if (stoppingAlienList.length === 0)
                return yield nav_1.nav.endGate();
            else
                yield nav_1.nav.nextStage();
        }
        else {
            while (alien_1.Alien.one()) {
                if (stoppingAlienList.length > 0 && alien_1.Alien.all(...stoppingAlienList).length > 0)
                    return;
                yield attack();
                yield (0, sleep_1.sleep)(0);
            }
        }
        yield killJumpUntil(...stoppingAlienList);
    });
}
exports.killJumpUntil = killJumpUntil;
