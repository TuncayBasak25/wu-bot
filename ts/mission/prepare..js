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
exports.clickMissions = exports.cycleMissionsUntilKratos = void 0;
const robotjs_1 = require("../../robotjs");
const nav_1 = require("../nav");
const mouse_1 = require("../util/mouse");
const sleep_1 = require("../util/sleep");
const alpha_1 = require("./alpha");
const beta_1 = require("./beta");
const gamma_1 = require("./gamma");
const kratos_1 = require("./kratos");
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
function cycleMissionsUntilKratos() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            yield openGateMenu();
            mouse_1.mouse.move(600, 300);
            yield (0, sleep_1.until)(() => (0, robotjs_1.getPixelColor)(760, 300) === "873838" || (0, robotjs_1.getPixelColor)(760, 300) === "692e2e");
            mouse_1.mouse.click(600, 300);
            yield (0, sleep_1.until)(() => (0, robotjs_1.getPixelColor)(1000, 400) === "effac3");
            let alphaReady = 0;
            let alphaReadible = 0;
            let betaReady = 0;
            let betaReadible = 0;
            let gammaReady = 0;
            let gammaReadible = 0;
            let kratosReady = 0;
            let kratosReadible = 0;
            if ((0, robotjs_1.getPixelColor)(967, 831) == "48f5f3")
                alphaReady++;
            if ((0, robotjs_1.getPixelColor)(825, 800) === "002d5f")
                alphaReadible++;
            mouse_1.mouse.click(600, 350);
            yield (0, sleep_1.until)(() => (0, robotjs_1.getPixelColor)(1000, 400) === "effac5");
            if ((0, robotjs_1.getPixelColor)(967, 831) == "48f5f3")
                betaReady++;
            if ((0, robotjs_1.getPixelColor)(825, 800) === "002d5f")
                betaReadible++;
            mouse_1.mouse.click(600, 380);
            yield (0, sleep_1.until)(() => (0, robotjs_1.getPixelColor)(1000, 400) === "effac7");
            if ((0, robotjs_1.getPixelColor)(967, 831) == "48f5f3")
                gammaReady++;
            if ((0, robotjs_1.getPixelColor)(825, 800) === "002d5f")
                gammaReadible++;
            mouse_1.mouse.click(600, 410);
            yield (0, sleep_1.until)(() => (0, robotjs_1.getPixelColor)(1000, 400) === "effac9");
            if ((0, robotjs_1.getPixelColor)(967, 831) == "48f5f3")
                kratosReady++;
            if ((0, robotjs_1.getPixelColor)(825, 800) === "002d5f")
                kratosReadible++;
            (0, robotjs_1.keyTap)("escape");
            yield (0, sleep_1.sleep)(1000);
            if (alphaReady)
                yield (0, alpha_1.alpha)();
            if (alphaReadible) {
                yield openGateMenu();
                yield readyGate();
                yield (0, alpha_1.alpha)();
            }
            if (betaReady)
                yield (0, beta_1.beta)();
            if (betaReadible) {
                yield openGateMenu();
                mouse_1.mouse.click(600, 350);
                yield (0, sleep_1.until)(() => (0, robotjs_1.getPixelColor)(1000, 400) === "effac5");
                yield readyGate();
                yield (0, beta_1.beta)();
            }
            if (gammaReady)
                yield (0, gamma_1.gamma)();
            if (gammaReadible) {
                yield openGateMenu();
                mouse_1.mouse.click(600, 380);
                yield (0, sleep_1.until)(() => (0, robotjs_1.getPixelColor)(1000, 400) === "effac7");
                yield readyGate();
                yield (0, gamma_1.gamma)();
            }
            if (kratosReady && kratosReadible)
                yield (0, kratos_1.kratos)();
        }
    });
}
exports.cycleMissionsUntilKratos = cycleMissionsUntilKratos;
function handleReadyGate() {
    return __awaiter(this, void 0, void 0, function* () {
        if ((0, robotjs_1.getPixelColor)(825, 800) === "002d5f") {
            if ((0, robotjs_1.getPixelColor)(967, 831) == "48f5f3")
                return true;
            mouse_1.mouse.click(825, 800);
            yield (0, sleep_1.sleep)(1000);
            (0, robotjs_1.keyTap)("escape");
            yield (0, sleep_1.sleep)(1000);
        }
        return false;
    });
}
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
            if (yield handleReadyGate())
                break;
            mouse_1.mouse.click(600, 350);
            yield (0, sleep_1.until)(() => (0, robotjs_1.getPixelColor)(1000, 400) === "effac5");
            if (yield handleReadyGate())
                break;
            mouse_1.mouse.click(600, 380);
            yield (0, sleep_1.until)(() => (0, robotjs_1.getPixelColor)(1000, 400) === "effac7");
            if (yield handleReadyGate())
                break;
            mouse_1.mouse.click(600, 410);
            yield (0, sleep_1.until)(() => (0, robotjs_1.getPixelColor)(1000, 400) === "effac9");
            if (yield handleReadyGate())
                break;
            mouse_1.mouse.click(1200, 800);
        }
        (0, robotjs_1.keyTap)("escape");
        yield (0, sleep_1.sleep)(1000);
    });
}
exports.clickMissions = clickMissions;
