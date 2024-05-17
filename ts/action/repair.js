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
exports.repair = void 0;
const config_1 = require("../param/config");
const ship_1 = require("../ship");
const sleep_1 = require("../util/sleep");
function repair() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, config_1.switchConfig)("tank");
        yield (0, sleep_1.until)(() => ship_1.ship.shieldLevel === 100);
        yield (0, config_1.switchConfig)("speed");
        yield (0, sleep_1.until)(() => ship_1.ship.healthLevel === 100);
    });
}
exports.repair = repair;
