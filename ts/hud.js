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
exports.hud = void 0;
const robotjs_1 = require("../robotjs");
const sleep_1 = require("./util/sleep");
let state = true;
function show() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!state) {
            state = !state;
            (0, robotjs_1.keyTap)("i");
            yield (0, sleep_1.sleep)(500);
        }
    });
}
function hide() {
    return __awaiter(this, void 0, void 0, function* () {
        if (state) {
            state = !state;
            (0, robotjs_1.keyTap)("i");
            yield (0, sleep_1.sleep)(500);
        }
    });
}
exports.hud = {
    state,
    show,
    hide
};
