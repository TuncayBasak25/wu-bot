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
exports.clickMissions = exports.doMissions = void 0;
const robotjs_1 = require("../../robotjs");
const nav_1 = require("../nav");
const mouse_1 = require("../util/mouse");
const sleep_1 = require("../util/sleep");
const alpha_1 = require("./alpha");
const beta_1 = require("./beta");
const gamma_1 = require("./gamma");
function openGateMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, robotjs_1.keyTap)("f6");
        yield (0, sleep_1.sleep)(1000);
    });
}
function readyGate() {
    return __awaiter(this, void 0, void 0, function* () {
        if ((0, robotjs_1.getPixelColor)(825, 800) === "002d5f") {
            mouse_1.mouse.click(825, 800);
            yield (0, sleep_1.sleep)(1000);
            (0, robotjs_1.keyTap)("escape");
            yield (0, sleep_1.sleep)(1000);
            (0, robotjs_1.keyTap)("escape");
            yield (0, sleep_1.sleep)(1000);
            return true;
        }
        return false;
    });
}
function setClickCount() {
    return __awaiter(this, void 0, void 0, function* () {
        mouse_1.mouse.click(1500, 540);
        yield (0, sleep_1.sleep)(1000);
        mouse_1.mouse.click(1500, 660);
        yield (0, sleep_1.sleep)(1000);
    });
}
function missionCycle() {
    return __awaiter(this, void 0, void 0, function* () {
        yield openGateMenu();
        mouse_1.mouse.move(600, 300);
        yield (0, sleep_1.until)(() => (0, robotjs_1.getPixelColor)(760, 300) === "873838" || (0, robotjs_1.getPixelColor)(760, 300) === "692e2e");
        mouse_1.mouse.click(600, 300);
        yield (0, sleep_1.until)(() => (0, robotjs_1.getPixelColor)(1000, 400) === "effac3");
        if ((0, robotjs_1.getPixelColor)(967, 830) == "131a2a") {
            yield (0, alpha_1.alpha)();
            return true;
        }
        if (yield readyGate()) {
            yield (0, alpha_1.alpha)();
            return true;
        }
        mouse_1.mouse.click(600, 350);
        yield (0, sleep_1.until)(() => (0, robotjs_1.getPixelColor)(1000, 400) === "effac5");
        if ((0, robotjs_1.getPixelColor)(967, 830) == "131a2a") {
            yield (0, beta_1.beta)();
            return true;
        }
        if (yield readyGate()) {
            yield (0, beta_1.beta)();
            return true;
        }
        mouse_1.mouse.click(600, 380);
        yield (0, sleep_1.until)(() => (0, robotjs_1.getPixelColor)(1000, 400) === "effac7");
        if ((0, robotjs_1.getPixelColor)(967, 830) == "131a2a") {
            yield (0, gamma_1.gamma)();
            return true;
        }
        if (yield readyGate()) {
            yield (0, gamma_1.gamma)();
            return true;
        }
        return false;
    });
}
function doMissions() {
    return __awaiter(this, void 0, void 0, function* () {
        while (yield missionCycle())
            yield (0, sleep_1.sleep)(0);
    });
}
exports.doMissions = doMissions;
function clickMissions() {
    return __awaiter(this, void 0, void 0, function* () {
        mouse_1.mouse.click(nav_1.nav.screenCenter);
        yield openGateMenu();
        yield setClickCount();
        while (true) {
            mouse_1.mouse.move(600, 300);
            yield (0, sleep_1.until)(() => (0, robotjs_1.getPixelColor)(760, 300) === "873838" || (0, robotjs_1.getPixelColor)(760, 300) === "692e2e");
            mouse_1.mouse.click(600, 300);
            yield (0, sleep_1.until)(() => (0, robotjs_1.getPixelColor)(1000, 400) === "effac3");
            if ((0, robotjs_1.getPixelColor)(825, 800) === "002d5f")
                break;
            mouse_1.mouse.click(600, 350);
            yield (0, sleep_1.until)(() => (0, robotjs_1.getPixelColor)(1000, 400) === "effac5");
            if ((0, robotjs_1.getPixelColor)(825, 800) === "002d5f")
                break;
            mouse_1.mouse.click(600, 380);
            yield (0, sleep_1.until)(() => (0, robotjs_1.getPixelColor)(1000, 400) === "effac7");
            if ((0, robotjs_1.getPixelColor)(825, 800) === "002d5f")
                break;
            mouse_1.mouse.click(1200, 800);
        }
    });
}
exports.clickMissions = clickMissions;
