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
const robotjs_1 = require("../robotjs");
const ship_1 = require("./ship");
const sleep_1 = require("./sleep");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        //showMouse();
        //await sleep(3000000);
        const ship = new ship_1.Ship();
        ship.map = "u7";
        yield ship.goto(12, 12);
        yield ship.alpha();
        (0, robotjs_1.moveMouse)(950, 1000);
        (0, robotjs_1.mouseClick)();
        yield (0, sleep_1.sleep)(1000);
        (0, robotjs_1.moveMouse)(460, 560);
        (0, robotjs_1.mouseClick)();
        yield (0, sleep_1.sleep)(1000);
        (0, robotjs_1.moveMouse)(1000, 800);
        (0, robotjs_1.mouseClick)();
        yield (0, sleep_1.sleep)(1000);
        (0, robotjs_1.keyTap)("escape");
        yield (0, sleep_1.sleep)(1000);
        (0, robotjs_1.keyTap)("escape");
        yield (0, sleep_1.sleep)(1000);
        yield ship.alpha();
        yield ship.kratos();
        yield ship.beta();
        //await ship.gamma();
    });
}
main();
function showMouse() {
    return __awaiter(this, void 0, void 0, function* () {
        const last = (0, robotjs_1.getMousePos)();
        while (true) {
            const pos = (0, robotjs_1.getMousePos)();
            if (pos.x !== last.x || pos.y !== last.y) {
                console.log(`Mouse(${pos.x}, ${pos.y}): color(${(0, robotjs_1.getPixelColor)(pos.x, pos.y)} : ${(0, robotjs_1.getPixelColor)(pos.x + 1, pos.y)} : ${(0, robotjs_1.getPixelColor)(pos.x + 2, pos.y)} : ${(0, robotjs_1.getPixelColor)(pos.x + 3, pos.y)})`);
                last.x = pos.x;
                last.y = pos.y;
            }
            yield (0, sleep_1.sleep)(500);
        }
    });
}
