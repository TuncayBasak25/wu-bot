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
exports.actualConfig = exports.switchConfig = void 0;
const robotjs_1 = require("../../robotjs");
const ship_1 = require("../ship");
const sleep_1 = require("../util/sleep");
let state = "speed";
let targetState = "speed";
function configChecker() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            if (state !== targetState) {
                state = targetState;
                ship_1.ship.speed = state === "speed" ? 506 : 330;
                if (targetState == "speed" && (0, robotjs_1.getPixelColor)(1018, 442) != "ffffff" || targetState == "tank" && (0, robotjs_1.getPixelColor)(900, 442) != "ffffff") {
                    (0, robotjs_1.keyTap)("c");
                    yield (0, sleep_1.sleep)(5500);
                }
            }
            yield (0, sleep_1.sleep)(0);
        }
    });
}
configChecker();
function switchConfig(targetConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        targetState = targetConfig;
        yield (0, sleep_1.until)(() => targetState === state);
    });
}
exports.switchConfig = switchConfig;
function actualConfig() {
    return state;
}
exports.actualConfig = actualConfig;
