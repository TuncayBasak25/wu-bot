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
exports.startScan = void 0;
const robotjs_1 = require("../robotjs");
const alien_1 = require("./alien");
const ship_1 = require("./ship");
const mouse_1 = require("./util/mouse");
const sleep_1 = require("./util/sleep");
const vector_1 = __importDefault(require("./util/vector"));
const queryList = [
    0xFF0000, 25, 1, //Aim
    alien_1.AlienHex.hydro, 2, 0,
    alien_1.AlienHex.jenta, 2, 0,
    alien_1.AlienHex.mali, 2, 0,
    alien_1.AlienHex.plairon, 2, 0,
    alien_1.AlienHex.raider, 2, 0,
    alien_1.AlienHex.vortex, 2, 0,
    alien_1.AlienHex.bangoliour, 2, 0,
    alien_1.AlienHex.motron, 2, 0,
    alien_1.AlienHex.xeon, 2, 0,
    alien_1.AlienHex.zavientos, 2, 0,
    alien_1.AlienHex.magmius, 2, 0,
    0xeedaf0, 5, 1, //Moving reactors
    0xEFFADA, 25, 1, //Portal
    0xFFFFFF, 300, 1, //TW window
    0xEE0FCC, 2, 0, //Bonus box
    0xEE0FCD, 2, 0 //Cargo box
];
// const measureList = [
//     0x3cac19, 910, 448, 1009, 451,
//     0x1b9dda, 910, 455, 1009, 458,
// ];
const healthList = [];
const shieldList = [];
const measureList = [
    0x3cac19, 910, 435, 1009, 438, //Health
    0x1b9dda, 910, 442, 1009, 445, //Shield
    0xE1B727, 910, 435, 1009, 438, //Extra Health
    0x205C0D, 910, 435, 1009, 438, //Extra Background
];
//1250, 410 rep red
let disconnectTimeout;
function startScan(cooldown = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = (0, robotjs_1.pixelScan)(0, 0, 1920, 1000, queryList.length / 3, ...queryList, measureList.length / 5, ...measureList);
        ship_1.ship.tw = response[0][14].length > 0;
        if (!ship_1.ship.tw && (response[1][0] || response[1][1] || response[1][2] || response[1][3])) {
            ship_1.ship.aim = response[0][0][0] && new vector_1.default(response[0][0][0].x, response[0][0][0].y);
            ship_1.ship.moving = response[0][12].length > 0;
            ship_1.ship.portal = response[0][13].length > 0;
            shieldList.push(response[1][1]);
            if (shieldList.length > 20)
                shieldList.shift();
            ship_1.ship.shieldLevel = shieldList.reduce((acc, cur) => acc + cur) / shieldList.length;
            if (!response[1][2] && !response[1][3]) {
                healthList.push(response[1][0]);
                if (healthList.length > 20)
                    healthList.shift();
                ship_1.ship.healthLevel = healthList.reduce((acc, cur) => acc + cur) / healthList.length;
            }
            else {
                ship_1.ship.healthLevel = 100;
            }
            if (ship_1.ship.disconnected) {
                ship_1.ship.disconnected = false;
            }
        }
        else if (!ship_1.ship.disconnected && (0, robotjs_1.getPixelColor)(759, 884) === "775300") {
            mouse_1.mouse.click(960, 880);
            ship_1.ship.disconnected = true;
            if (disconnectTimeout)
                clearTimeout(disconnectTimeout);
            disconnectTimeout = setTimeout(() => ship_1.ship.disconnected && process.exit(), 10000);
        }
        alien_1.Alien.list = [];
        for (let i = 0; i < alien_1.Alien.enum.length; i++) {
            for (const pos of response[0][i + 1]) {
                const alien = alien_1.Alien.enum[i]();
                alien.pos.set(pos);
                alien_1.Alien.list.push(alien);
            }
        }
        ship_1.ship.bonusBoxes = [];
        ship_1.ship.cargoBoxes = [];
        for (const bonusBoxPos of response[0][15])
            ship_1.ship.bonusBoxes.push(new vector_1.default().set(bonusBoxPos));
        for (const cargoBoxPos of response[0][16])
            ship_1.ship.cargoBoxes.push(new vector_1.default().set(cargoBoxPos));
        yield (0, sleep_1.sleep)(cooldown);
        yield startScan();
    });
}
exports.startScan = startScan;
