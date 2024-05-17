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
const robotjs_1 = require("../../robotjs");
const kite_1 = require("../action/kite");
const nav_1 = require("../nav");
const stage_1 = require("./stage");
function kratos() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, robotjs_1.keyTap)("h");
        (0, robotjs_1.keyTap)("w");
        yield nav_1.nav.starMission("kratos");
        yield (0, stage_1.killJumpUntil)("zavientos");
        yield (0, stage_1.killJumpUntil)("hydro");
        yield (0, stage_1.killJumpUntil)("bangoliour");
        yield (0, kite_1.attackKite)("bangoliour", 16);
        yield (0, kite_1.attackKite)("zavientos", 2);
        yield (0, stage_1.killJumpUntil)("bangoliour");
        yield (0, kite_1.attackKite)("bangoliour", 20);
        yield (0, kite_1.attackKite)("raider", 20);
        yield (0, stage_1.killJumpUntil)("vortex");
        yield (0, kite_1.attackKite)("vortex", 15);
        yield (0, kite_1.attackKite)("magmius", 1);
        yield (0, kite_1.attackKite)("zavientos", 1);
        yield nav_1.nav.quitStage();
        (0, robotjs_1.keyTap)("x");
    });
}
exports.kratos = kratos;
