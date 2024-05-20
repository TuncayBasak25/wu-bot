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
exports.beta = void 0;
const robotjs_1 = require("../../robotjs");
const kite_1 = require("../action/kite");
const starmission_1 = require("../menu/starmission");
const nav_1 = require("../nav");
const stage_1 = require("./stage");
function beta() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, robotjs_1.keyTap)("h");
        yield (0, starmission_1.buyX2)();
        (0, robotjs_1.keyTap)("w");
        yield nav_1.nav.starMission("beta");
        yield (0, stage_1.killJumpUntil)("xeon");
        yield (0, kite_1.attackKite)(10);
        yield (0, stage_1.killJumpUntil)("bangoliour");
        (0, robotjs_1.keyTap)("x");
        yield (0, kite_1.attackKite)(20);
        yield (0, stage_1.killJumpUntil)("zavientos");
        (0, robotjs_1.keyTap)("v");
        yield (0, kite_1.attackKite)(10);
        yield (0, stage_1.killJumpUntil)("magmius");
        yield (0, kite_1.attackKite)(5);
        yield (0, stage_1.killJumpUntil)("bangoliour");
        (0, robotjs_1.keyTap)("v");
        yield (0, kite_1.attackKite)(7);
        yield (0, stage_1.killJumpUntil)("vortex");
        yield (0, kite_1.attackKite)(15);
        yield (0, stage_1.killJumpUntil)("xeon", "bangoliour");
        yield (0, kite_1.attackKite)(6);
        yield (0, stage_1.assureNextStage)("attack", true, true);
    });
}
exports.beta = beta;
