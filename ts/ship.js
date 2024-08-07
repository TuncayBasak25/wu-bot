"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ship = exports.Ship = void 0;
const robotjs_1 = require("../robotjs");
const vector_1 = __importDefault(require("./util/vector"));
const alien_1 = require("./alien");
var LaserAmmo;
(function (LaserAmmo) {
    LaserAmmo["x2"] = "1";
    LaserAmmo["x3"] = "3";
    LaserAmmo["x4"] = "a";
    LaserAmmo["abs"] = "2";
})(LaserAmmo || (LaserAmmo = {}));
class Ship {
    constructor() {
        this.healthLevel = 0;
        this.shieldLevel = 0;
        this.damage = 13000;
        this.speed = 495;
        this.moving = false;
        this.portal = false;
        this.tw = false;
        this.disconnected = false;
        this.promotion = alien_1.Promotion.normal;
        this.bonusBoxes = [];
        this.cargoBoxes = [];
        this.laserAmmo = LaserAmmo.x2;
        this.rocket = "nc";
        this.pos = new vector_1.default(0, 0);
    }
    tnc() {
        if (this.rocket === "nc")
            (0, robotjs_1.keyTap)("x");
        this.rocket = "tnc";
    }
    nc() {
        if (this.rocket === "tnc")
            (0, robotjs_1.keyTap)("w");
        this.rocket = "nc";
    }
    attack() {
        (0, robotjs_1.keyTap)(this.laserAmmo);
    }
    stopAttack() {
        (0, robotjs_1.keyTap)("control");
    }
    x2() { this.laserAmmo = LaserAmmo.x2; }
    x3() { this.laserAmmo = LaserAmmo.x3; }
    x4() { this.laserAmmo = LaserAmmo.x4; }
    abs() { this.laserAmmo = LaserAmmo.abs; }
    get health() {
        return this.healthLevel * 296000 / 100;
    }
    get shield() {
        return this.shieldLevel * (this.speed === 506 ? 307000 : 356000) / 100;
    }
}
exports.Ship = Ship;
exports.ship = new Ship();
