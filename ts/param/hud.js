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
exports.hud = exports.outsideHud = void 0;
const robotjs_1 = require("../../robotjs");
const box_1 = require("../util/box");
const sleep_1 = require("../util/sleep");
let state = true;
function show() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!state) {
            state = !state;
            (0, robotjs_1.keyTap)("i");
            yield (0, sleep_1.sleep)(100);
        }
    });
}
function hide() {
    return __awaiter(this, void 0, void 0, function* () {
        if (state) {
            state = !state;
            (0, robotjs_1.keyTap)("i");
            yield (0, sleep_1.sleep)(100);
        }
    });
}
const menuBox = new box_1.Box(873, 909, 1049, 1032);
const minimapBox = new box_1.Box(0, 800, 360, 1032);
const topMenuBox = new box_1.Box(850, 0, 1160, 80);
const lazerGameBox = new box_1.Box(1600, 590, 1920, 1080);
function outsideHud(point) {
    return !menuBox.isInside(point) && !minimapBox.isInside(point) && !topMenuBox.isInside(point) && !lazerGameBox.isInside(point);
}
exports.outsideHud = outsideHud;
exports.hud = {
    state,
    show,
    hide
};
