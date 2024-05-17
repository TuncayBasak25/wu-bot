"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.Config = void 0;
const robotjs_1 = require("../robotjs");
const ship_1 = require("./ship");
var Config;
(function (Config) {
    Config[Config["speed"] = 0] = "speed";
    Config[Config["tank"] = 1] = "tank";
})(Config || (exports.Config = Config = {}));
let state = Config.speed;
function tank() {
    if (state === Config.speed) {
        state = Config.tank;
        ship_1.ship.speed = 330;
        (0, robotjs_1.keyTap)("c");
    }
}
function speed() {
    if (state === Config.tank) {
        state = Config.speed;
        ship_1.ship.speed = 506;
        (0, robotjs_1.keyTap)("c");
    }
}
exports.config = {
    state,
    tank,
    speed
};
