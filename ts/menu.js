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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menu = exports.waitColorNot = exports.waitColor = void 0;
const robotjs_1 = require("../robotjs");
const alpha_1 = require("./mission/alpha");
const beta_1 = require("./mission/beta");
const gamma_1 = require("./mission/gamma");
const kratos_1 = require("./mission/kratos");
const nav_1 = require("./nav");
const mouse_1 = require("./util/mouse");
const sleep_1 = require("./util/sleep");
const vector_1 = __importDefault(require("./util/vector"));
function waitColor(x, y, color, action = () => { }) {
    return __awaiter(this, void 0, void 0, function* () {
        if ((0, robotjs_1.getPixelColor)(x, y) == color)
            return;
        action();
        let count = 0;
        while (true) {
            if ((0, robotjs_1.getPixelColor)(x, y) == color)
                break;
            yield (0, sleep_1.sleep)(10);
            count++;
            if (count == 100) {
                action();
                count = 0;
            }
        }
    });
}
exports.waitColor = waitColor;
function waitColorNot(x, y, color, action = () => { }) {
    return __awaiter(this, void 0, void 0, function* () {
        if ((0, robotjs_1.getPixelColor)(x, y) != color)
            return;
        action();
        let count = 0;
        while (true) {
            if ((0, robotjs_1.getPixelColor)(x, y) != color)
                break;
            yield (0, sleep_1.sleep)(10);
            count++;
            if (count == 100) {
                action();
                count = 0;
            }
        }
    });
}
exports.waitColorNot = waitColorNot;
function clickConfirm(x, y) {
    return __awaiter(this, void 0, void 0, function* () {
        yield waitColorNot(450, 260, "d4af37", () => mouse_1.mouse.click(x, y));
        yield waitColor(450, 260, "d4af37", () => (0, robotjs_1.keyTap)("escape"));
    });
}
class gate {
    static open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield menu.open();
            yield waitColor(950, 350, "effada", () => (0, robotjs_1.keyTap)("f6"));
        });
    }
    static setClickCount(count) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = [1, 2, 5, 10, 50, 100, 250].indexOf(count);
            if (index == -1)
                throw Error(`Idk how you pass a ${count} to a function that accepts only: 1 | 2 | 5 | 10 | 50 | 100 | 250`);
            yield this.open();
            yield waitColor(1480, 553, "3f5a86", () => mouse_1.mouse.click(1500, 540));
            yield (0, sleep_1.sleep)(1000);
            mouse_1.mouse.click(1500, 630);
            yield (0, sleep_1.sleep)(1000);
        });
    }
    static click() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.open();
            mouse_1.mouse.click(1200, 800);
        });
    }
    static clickGates() {
        return __awaiter(this, void 0, void 0, function* () {
            mouse_1.mouse.click(nav_1.nav.screenCenter);
            yield this.setClickCount(10);
            while (true) {
                if (yield this.alpha.isDouble())
                    break;
                if (yield this.beta.isDouble())
                    break;
                if (yield this.gamma.isDouble())
                    break;
                if (yield this.kratos.isDouble())
                    break;
                yield this.click();
            }
            yield menu.close();
        });
    }
    static loopUntilKratos() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                if (yield this.alpha.do())
                    continue;
                if (yield this.beta.do())
                    continue;
                if (yield this.gamma.do())
                    continue;
                if (yield this.kratos.do())
                    continue;
                yield this.clickGates();
            }
        });
    }
    constructor(color, buttonPos, program) {
        this.color = color;
        this.buttonPos = buttonPos;
        this.program = program;
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield gate.open();
            yield waitColor(1000, 400, this.color, () => mouse_1.mouse.click(this.buttonPos));
        });
    }
    do() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.prepare()))
                return false;
            yield menu.close();
            yield this.program();
            return true;
        });
    }
    prepare() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.isReady())
                return true;
            if (!(yield this.isReadible()))
                return false;
            yield clickConfirm(1000, 800);
            return true;
        });
    }
    isReady() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.open();
            return (0, robotjs_1.getPixelColor)(967, 831) == "48f5f3";
        });
    }
    isReadible() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.open();
            return (0, robotjs_1.getPixelColor)(825, 800) == "002d5f";
        });
    }
    isDouble() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.open();
            return ((yield this.isReady()) && (yield this.isReadible()));
        });
    }
}
gate.alpha = new gate("effac3", new vector_1.default(600, 300), alpha_1.alpha);
gate.beta = new gate("effac5", new vector_1.default(600, 350), beta_1.beta);
gate.gamma = new gate("effac7", new vector_1.default(600, 380), gamma_1.gamma);
gate.kratos = new gate("effac9", new vector_1.default(600, 410), kratos_1.kratos);
class menu {
    static open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitColor(450, 260, "d4af37", () => (0, robotjs_1.keyTap)("f1"));
        });
    }
    static close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitColorNot(450, 260, "d4af37", () => (0, robotjs_1.keyTap)("escape"));
        });
    }
}
exports.menu = menu;
menu.gate = gate;
function buy(pack = 10) {
    return __awaiter(this, void 0, void 0, function* () {
        yield waitColor(450, 260, "effada", () => (0, robotjs_1.keyTap)("f3"));
        yield waitColor(605, 385, "133338", () => mouse_1.mouse.click(460, 420));
        yield waitColor(700, 400, "fc5f63", () => mouse_1.mouse.click(750, 220));
        yield waitColor(561, 796, "d12121", () => mouse_1.mouse.click(600, 700));
        while (pack-- > 0) {
            mouse_1.mouse.click(1400, 580);
            (0, robotjs_1.keyTap)("enter");
            (0, robotjs_1.keyTap)("enter");
        }
        (0, robotjs_1.keyTap)("escape");
        yield (0, sleep_1.sleep)(1000);
    });
}
