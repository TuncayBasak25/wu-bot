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
exports.kratos = void 0;
const kite_1 = require("../action/kite");
const alien_1 = require("../alien");
const nav_1 = require("../nav");
const ship_1 = require("../ship");
const sleep_1 = require("../util/sleep");
const stage_1 = require("./stage");
function quitOnPortal() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            if (ship_1.ship.portal)
                process.exit();
            yield (0, sleep_1.sleep)(0);
        }
    });
}
function kratos() {
    return __awaiter(this, void 0, void 0, function* () {
        yield nav_1.nav.starMission("kratos");
        yield (0, stage_1.killJumpUntil)("zavientos");
        yield (0, stage_1.killJumpUntil)("hydro");
        yield (0, stage_1.killJumpUntil)("bangoliour");
        yield (0, kite_1.attackKite)(18);
        yield (0, stage_1.killJumpUntil)("bangoliour");
        yield (0, kite_1.attackKite)(40);
        yield (0, stage_1.killJumpUntil)("vortex");
        yield (0, kite_1.attackKite)(17);
        quitOnPortal();
        while (true) {
            yield nav_1.nav.goto(nav_1.nav.portals.nextStage);
            while (!alien_1.Alien.one())
                yield (0, sleep_1.sleep)(0);
            yield (0, stage_1.attack)();
        }
    });
}
exports.kratos = kratos;
