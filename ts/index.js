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
const mouse_1 = require("./util/mouse");
const ship_1 = require("./ship");
const sleep_1 = require("./util/sleep");
const nav_1 = require("./nav");
const scan_1 = require("./scan");
const beta_1 = require("./mission/beta");
const kratos_1 = require("./mission/kratos");
(0, scan_1.startScan)();
preventTWPopup();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        //await showMouse()
        yield nav_1.nav.calibrate(nav_1.nav.u7Base);
        // await alpha();
        // await prepareAlpha();
        // await alpha();
        yield (0, beta_1.beta)();
        // await prepareBeta();
        // await beta();
        // await gamma();
        yield (0, kratos_1.kratos)();
        process.exit();
        // cycleMissions();
    });
}
main();
function preventTWPopup() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, sleep_1.sleep)(1000);
        while (true) {
            yield (0, sleep_1.sleep)(1000);
            if (ship_1.ship.tw) {
                yield (0, sleep_1.sleep)(1000);
                if (ship_1.ship.tw) {
                    mouse_1.mouse.click(1120, 580);
                }
            }
            //if (ship.tw) mouse.click(1500, 240)
        }
    });
}
//10.000 x delta for click total norme
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
        let x = 960;
        let y = 445;
        while ((0, robotjs_1.getPixelColor)(x, y) === "1b9dda")
            x--;
        x++;
        while ((0, robotjs_1.getPixelColor)(x, y) === "1b9dda")
            y--;
        y++;
        console.log(`Start: (${x}, ${y})`);
        while ((0, robotjs_1.getPixelColor)(x, y) === "1b9dda")
            x++;
        x--;
        while ((0, robotjs_1.getPixelColor)(x, y) === "1b9dda")
            y++;
        y--;
        console.log(`End: (${x}, ${y})`);
    });
}
