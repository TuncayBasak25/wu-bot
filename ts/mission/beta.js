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
const kite_1 = require("../action/kite");
const nav_1 = require("../nav");
const config_1 = require("../param/config");
const stage_1 = require("./stage");
function beta() {
    return __awaiter(this, void 0, void 0, function* () {
        yield nav_1.nav.starMission("beta");
        yield (0, stage_1.killJumpUntil)("xeon");
        yield (0, kite_1.attackKite)(10);
        yield (0, stage_1.killJumpUntil)("bangoliour");
        yield (0, kite_1.attackKite)(20);
        yield (0, stage_1.killJumpUntil)("zavientos");
        yield (0, kite_1.attackKite)(10);
        yield (0, stage_1.killJumpUntil)("magmius");
        yield (0, kite_1.attackKite)(5);
        yield (0, stage_1.killJumpUntil)("bangoliour");
        yield (0, kite_1.attackKite)(7);
        yield (0, stage_1.killJumpUntil)("vortex");
        yield (0, kite_1.attackKite)(15);
        yield (0, stage_1.killJumpUntil)("xeon", "bangoliour");
        yield (0, kite_1.attackKite)(6);
        yield (0, stage_1.killJumpUntil)();
        yield (0, config_1.switchConfig)("speed");
    });
}
exports.beta = beta;
