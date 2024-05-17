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
exports.attack = void 0;
const alien_1 = require("../alien");
const nav_1 = require("../nav");
const config_1 = require("../param/config");
const hud_1 = require("../param/hud");
const ship_1 = require("../ship");
const mouse_1 = require("../util/mouse");
const sleep_1 = require("../util/sleep");
const vector_1 = __importDefault(require("../util/vector"));
function attack(targetCount, ...targetNameList) {
    return __awaiter(this, void 0, void 0, function* () {
        hud_1.hud.hide();
        (0, config_1.switchConfig)("tank");
        if (targetNameList.length === 0)
            targetNameList = alien_1.AlienNameList;
        while (targetCount > 0) {
            if (ship_1.ship.shieldLevel < 30) {
                (0, config_1.switchConfig)("speed");
                yield hud_1.hud.show();
                const velocity = new vector_1.default(ship_1.ship.pos.x <= nav_1.nav.center.x ? 5 : -5, ship_1.ship.pos.y <= nav_1.nav.center.y ? 5 : -5);
                let count = 0;
                while (alien_1.Alien.one()) {
                    count++;
                    yield nav_1.nav.moveBy(velocity);
                }
                while (count-- > 0)
                    yield nav_1.nav.moveBy(velocity);
                (0, config_1.switchConfig)("tank");
                yield hud_1.hud.hide();
            }
            while (!ship_1.ship.aim) {
                yield (0, sleep_1.when)(() => !alien_1.Alien.one(...targetNameList));
                mouse_1.mouse.click(nav_1.nav.screenCenter.nearestPoint(...alien_1.Alien.all(...targetNameList).map(a => a.pos)));
                yield (0, sleep_1.when)(() => !ship_1.ship.aim, 2000);
            }
            yield (0, sleep_1.sleep)(100);
            ship_1.ship.attack();
            yield (0, sleep_1.until)(() => !ship_1.ship.aim);
            targetCount--;
        }
        hud_1.hud.show();
        (0, config_1.switchConfig)("speed");
    });
}
exports.attack = attack;
