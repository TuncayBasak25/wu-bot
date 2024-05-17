"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Box = void 0;
const vector_1 = __importDefault(require("./vector"));
class Box {
    constructor(startX, startY, endX, endY) {
        this.start = new vector_1.default();
        this.end = new vector_1.default();
        this.start.set(startX, startY);
        this.end.set(endX, endY);
    }
    isInside(a, b) {
        const [x, y] = vector_1.default.numberOrVector(a, b);
        return x >= this.start.x && y >= this.start.y && x <= this.end.x && y <= this.end.y;
    }
}
exports.Box = Box;
