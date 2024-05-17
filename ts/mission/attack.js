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
exports.attack = exports.index = void 0;
const alien_1 = require("../alien");
function index(enemyCount = Infinity, maxIdle = 30000) {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            hud.hide();
            switchConfig("tank");
            yield when(() => alien_1.Alien.list.length === 0, maxIdle);
            if (alien_1.Alien.list.length === 0) {
                switchConfig("speed");
                yield hud.show();
                return;
            }
            const enemyDps = alien_1.Alien.list.reduce((acc, cur) => acc + cur.damage * ship.promotion, 0);
            console.log(enemyDps);
            const enemyHealth = alien_1.Alien.list[0].combinedHealth * ship.promotion;
            console.log(enemyHealth / ship.damage);
            const shield = ship.shield * 307000 / 100;
            console.log(shield / enemyDps * 2);
            //Time it takes to kill each other
            if (enemyHealth / ship.damage > shield / enemyDps * 2) {
                switchConfig("speed");
                yield hud.show();
                nav.topLeft.pointDistance(ship.pos) > nav.botRight.pointDistance(ship.pos) ? nav.goto(nav.topLeft) : nav.goto(nav.botRight);
                yield sleep(alien_1.Alien.list[0].speed * 40);
                switchConfig("tank");
                yield sleep(1000);
                yield until(() => ship.shield > 75);
                mouse.click(nav.screenCenter.add(-75, 75));
                yield when(() => alien_1.Alien.list.length === 0, maxIdle);
                hud.hide();
            }
            mouse.click(alien_1.Alien.list[0].pos);
            yield when(() => !ship.aim, 1000);
            keyTap("control");
            yield until(() => !ship.aim);
            enemyCount--;
            if (enemyCount === 0) {
                switchConfig("speed");
                yield hud.show();
                return;
            }
        }
    });
}
exports.index = index;
function attack(enemyList) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.attack = attack;
