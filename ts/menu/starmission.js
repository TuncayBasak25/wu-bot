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
exports.buyX2 = exports.prepareBeta = exports.prepareAlpha = exports.openGates = exports.openMenu = void 0;
const robotjs_1 = require("../../robotjs");
const mouse_1 = require("../util/mouse");
const sleep_1 = require("../util/sleep");
let menuOpen = false;
function openMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        mouse_1.mouse.click(950, 1000);
        yield (0, sleep_1.sleep)(1000);
    });
}
exports.openMenu = openMenu;
function openGates() {
    return __awaiter(this, void 0, void 0, function* () {
        yield openMenu();
        mouse_1.mouse.click(460, 560);
        yield (0, sleep_1.sleep)(1000);
    });
}
exports.openGates = openGates;
function prepareAlpha() {
    return __awaiter(this, void 0, void 0, function* () {
        yield openGates();
        mouse_1.mouse.click(1000, 800);
        yield (0, sleep_1.sleep)(1000);
        (0, robotjs_1.keyTap)("escape");
        yield (0, sleep_1.sleep)(1000);
        (0, robotjs_1.keyTap)("escape");
        yield (0, sleep_1.sleep)(1000);
    });
}
exports.prepareAlpha = prepareAlpha;
function prepareBeta() {
    return __awaiter(this, void 0, void 0, function* () {
        yield openGates();
        mouse_1.mouse.click(650, 340);
        yield (0, sleep_1.sleep)(1000);
        mouse_1.mouse.click(1000, 800);
        yield (0, sleep_1.sleep)(1000);
        (0, robotjs_1.keyTap)("escape");
        yield (0, sleep_1.sleep)(1000);
        (0, robotjs_1.keyTap)("escape");
        yield (0, sleep_1.sleep)(1000);
    });
}
exports.prepareBeta = prepareBeta;
function buyX2(pack = 1) {
    return __awaiter(this, void 0, void 0, function* () {
        yield openMenu();
        mouse_1.mouse.click(460, 420);
        yield (0, sleep_1.sleep)(1000);
        mouse_1.mouse.click(750, 220);
        yield (0, sleep_1.sleep)(1000);
        mouse_1.mouse.click(750, 720);
        yield (0, sleep_1.sleep)(1000);
        while (pack-- > 0) {
            mouse_1.mouse.click(1400, 580);
            yield (0, sleep_1.sleep)(1000);
            (0, robotjs_1.keyTap)("enter");
            (0, robotjs_1.keyTap)("enter");
        }
        (0, robotjs_1.keyTap)("escape");
        yield (0, sleep_1.sleep)(1000);
    });
}
exports.buyX2 = buyX2;
