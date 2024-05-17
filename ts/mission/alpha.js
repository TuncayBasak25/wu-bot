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
exports.alpha = void 0;
const robotjs_1 = require("../../robotjs");
const kite_1 = require("../action/kite");
const starmission_1 = require("../menu/starmission");
const nav_1 = require("../nav");
const stage_1 = require("./stage");
function alpha() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, robotjs_1.keyTap)("h");
        (0, robotjs_1.keyTap)("w");
        yield (0, starmission_1.buyX2)();
        yield nav_1.nav.starMission("alpha");
        yield (0, stage_1.killJumpUntil)("zavientos");
        yield (0, kite_1.attackKite)("zavientos", 10);
        yield (0, stage_1.killJumpUntil)("magmius");
        yield (0, kite_1.attackKite)("magmius", 5);
        yield (0, stage_1.killJumpUntil)("bangoliour");
        yield (0, kite_1.attackKite)("bangoliour", 6);
        yield (0, kite_1.attackKite)("magmius", 1);
        yield (0, kite_1.attackKite)("zavientos", 2);
        yield (0, stage_1.killJumpUntil)("plairon");
        yield (0, kite_1.attackKite)("bangoliour", 1);
        yield (0, kite_1.attackKite)("vortex", 2);
        yield (0, kite_1.attackKite)("raider", 2);
        yield (0, kite_1.attackKite)("magmius", 1);
        yield (0, kite_1.attackKite)("zavientos", 1);
        yield (0, kite_1.attackKite)("xeon", 1);
        yield (0, stage_1.assureNextStage)("attack", true, true);
        (0, robotjs_1.keyTap)("x");
    });
}
exports.alpha = alpha;
