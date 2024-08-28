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
const robotjs_1 = require("../robotjs");
const mouse_1 = require("./util/mouse");
const ship_1 = require("./ship");
const sleep_1 = require("./util/sleep");
const vector_1 = __importDefault(require("./util/vector"));
const scan_1 = require("./scan");
(0, scan_1.startScan)();
//preventTWPopup();
const coordNumberTopLeft = new vector_1.default(290, 807);
const coordNumberBotRight = new vector_1.default(350, 818);
var CoordDigit;
(function (CoordDigit) {
    CoordDigit["zero"] = "256 2 64";
    CoordDigit["one"] = "1024";
    CoordDigit["two"] = "8 512 1024 1024 1024";
    CoordDigit["three"] = "4 32";
    CoordDigit["four"] = "128 128 1024";
    CoordDigit["five"] = "1 1 1 128";
    CoordDigit["six"] = "128 128";
    CoordDigit["seven"] = "1 1 1 1 2 1";
    CoordDigit["eight"] = "32 32 32";
    CoordDigit["nine"] = "16 64 32";
})(CoordDigit || (CoordDigit = {}));
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            const coords = new vector_1.default(0, 0);
            let leftSide = true;
            const main_sequence = [];
            for (let x = coordNumberTopLeft.x; x < coordNumberBotRight.x; x++) {
                let line = 0;
                let count = 0;
                for (let y = coordNumberTopLeft.y; y < coordNumberBotRight.y; y++) {
                    const pc = (0, robotjs_1.getPixelColor)(x, y);
                    if (pc == "48f5f3") {
                        if (line)
                            line <<= 1;
                        else {
                            line++;
                            line <<= count;
                        }
                    }
                    else if (pc == "34b2b0" && (0, robotjs_1.getPixelColor)(x, y - 1) == "154747")
                        line = -1;
                    count++;
                }
                if (line)
                    main_sequence.push(line);
            }
            const sequence = [];
            while (main_sequence.length > 0) {
                sequence.push(main_sequence.shift());
                let digit = null;
                switch (sequence.length) {
                    case 1: {
                        if (sequence[0] == 1024)
                            digit = 1;
                        else if (sequence[0] == -1) {
                            leftSide = false;
                            sequence.length = 0;
                        }
                        break;
                    }
                    case 2: {
                        if (sequence[0] == 4 && sequence[1] == 32)
                            digit = 3;
                        else if (sequence[0] == 128 && sequence[1] == 128 && (main_sequence.length == 0 || main_sequence[0] != 1024))
                            digit = 6;
                        break;
                    }
                    case 3: {
                        if (sequence[0] == 256 && sequence[1] == 2 && sequence[2] == 64)
                            digit = 0;
                        else if (sequence[0] == 128 && sequence[1] == 128 && sequence[2] == 1024)
                            digit = 4;
                        else if (sequence[0] == 32 && sequence[1] == 32 && sequence[2] == 32)
                            digit = 8;
                        else if (sequence[0] == 16 && sequence[1] == 64 && sequence[2] == 32)
                            digit = 9;
                        break;
                    }
                    case 4: {
                        if (sequence[0] == 1 && sequence[1] == 1 && sequence[2] == 1 && sequence[3] == 128)
                            digit = 5;
                        break;
                    }
                    case 5: {
                        if (sequence[0] == 8 && sequence[1] == 512 && sequence[2] == 1024 && sequence[3] == 1024 && sequence[4] == 1024)
                            digit = 2;
                        break;
                    }
                    case 6: {
                        if (sequence[0] == 1 && sequence[1] == 1 && sequence[2] == 1 && sequence[3] == 1 && sequence[4] == 2 && sequence[5] == 1)
                            digit = 7;
                        break;
                    }
                }
                if (digit != null) {
                    if (leftSide)
                        coords.mulX(10).addX(digit);
                    else
                        coords.mulY(10).addY(digit);
                    sequence.length = 0;
                }
            }
            console.log(coords);
            yield (0, sleep_1.sleep)(1);
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        //await test();
        //await showMouse()
        //await nav.calibrate(nav.u7Base);
        // await kratos()
        //await cycleMissionsUntilKratos();
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
//290 800
//350 820
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
