"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alien = exports.AlienNameList = exports.Promotion = exports.AlienHex = void 0;
const vector_1 = __importDefault(require("./util/vector"));
var AlienHex;
(function (AlienHex) {
    AlienHex[AlienHex["hydro"] = 11189196] = "hydro";
    AlienHex[AlienHex["jenta"] = 11189199] = "jenta";
    AlienHex[AlienHex["mali"] = 11189200] = "mali";
    AlienHex[AlienHex["plairon"] = 11189201] = "plairon";
    AlienHex[AlienHex["xeon"] = 11189202] = "xeon";
    AlienHex[AlienHex["bangoliour"] = 11189203] = "bangoliour";
    AlienHex[AlienHex["zavientos"] = 11189204] = "zavientos";
    AlienHex[AlienHex["magmius"] = 11189205] = "magmius";
    AlienHex[AlienHex["motron"] = 11189208] = "motron";
    AlienHex[AlienHex["raider"] = 11189211] = "raider";
    AlienHex[AlienHex["vortex"] = 11189209] = "vortex";
})(AlienHex || (exports.AlienHex = AlienHex = {}));
var Promotion;
(function (Promotion) {
    Promotion[Promotion["normal"] = 1] = "normal";
    Promotion[Promotion["hyper"] = 2] = "hyper";
    Promotion[Promotion["ultra"] = 4] = "ultra";
})(Promotion || (exports.Promotion = Promotion = {}));
exports.AlienNameList = ["hydro", "jenta", "mali", "plairon", "xeon", "bangoliour", "zavientos", "magmius", "motron", "raider", "vortex"];
class Alien {
    static get hydro() { return new Alien(0xaabbcc, "hydro", 800, 560, 200, 50); }
    static get jenta() { return new Alien(0xaabbcf, "jenta", 3000, 2100, 290, 150); }
    static get mali() { return new Alien(0xaabbd0, "mali", 7000, 4900, 290, 300); }
    static get plairon() { return new Alien(0xaabbd1, "plairon", 16000, 11200, 125, 400); }
    static get xeon() { return new Alien(0xaabbd2, "xeon", 100000, 70000, 175, 1100); }
    static get bangoliour() { return new Alien(0xaabbd3, "bangoliour", 48000, 33600, 290, 1000); }
    static get zavientos() { return new Alien(0xaabbd4, "zavientos", 192000, 134400, 200, 2000); }
    static get magmius() { return new Alien(0xaabbd5, "magmius", 384000, 268800, 220, 3500); }
    static get motron() { return new Alien(0xaabbd8, "motron", 64000, 44800, 30, 400); }
    static get raider() { return new Alien(0xaabbdb, "raider", 20000, 14000, 260, 600); }
    static get vortex() { return new Alien(0xaabbd9, "vortex", 45000, 31500, 420, 1000); }
    static all(...alienNameList) {
        if (alienNameList.length === 0)
            alienNameList = exports.AlienNameList;
        return Alien.list.filter(a => alienNameList.includes(a.name));
    }
    static one(...alienNameList) {
        if (alienNameList.length === 0)
            alienNameList = exports.AlienNameList;
        return Alien.all(...alienNameList)[0];
    }
    constructor(color, name, health, shield, speed, damage) {
        this.color = color;
        this.name = name;
        this.health = health;
        this.shield = shield;
        this.speed = speed;
        this.damage = damage;
        this.pos = new vector_1.default();
    }
    ;
    get combinedHealth() {
        return this.health + this.shield;
    }
    promote(promotion) {
        this.health *= promotion;
        this.shield *= promotion;
        this.damage *= promotion;
        return this;
    }
}
exports.Alien = Alien;
Alien.enum = [
    () => Alien.hydro,
    () => Alien.jenta,
    () => Alien.mali,
    () => Alien.plairon,
    () => Alien.raider,
    () => Alien.vortex,
    () => Alien.bangoliour,
    () => Alien.motron,
    () => Alien.xeon,
    () => Alien.zavientos,
    () => Alien.magmius,
];
Alien.list = [];
