"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mouse = void 0;
const robotjs_1 = require("../../robotjs");
const vector_1 = __importDefault(require("./vector"));
class Mouse {
    move(a, b) {
        const [x, y] = vector_1.default.numberOrVector(a, b);
        (0, robotjs_1.moveMouse)(x, y);
    }
    click(a, b) {
        const [x, y] = vector_1.default.numberOrVector(a, b);
        (0, robotjs_1.moveMouse)(x, y);
        (0, robotjs_1.mouseClick)("left");
    }
}
exports.mouse = new Mouse();
