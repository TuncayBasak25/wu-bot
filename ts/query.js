"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueries = void 0;
const robotjs_1 = require("../robotjs");
const vector_1 = __importDefault(require("./vector"));
const l = [0xFF0000, 0xFF0000, 0xFF0000, 0xFF0000, 0xFF0000];
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
})(AlienHex || (AlienHex = {}));
const Queries = {
    TARGET: [25, 1, ...l, ...l, ...l, ...l, ...l],
    hydro: [2, 1, AlienHex.hydro, AlienHex.hydro],
    jenta: [2, 1, AlienHex.jenta, AlienHex.jenta],
    mali: [2, 1, AlienHex.mali, AlienHex.mali],
    plairon: [2, 1, AlienHex.plairon, AlienHex.plairon],
    xeon: [2, 1, AlienHex.xeon, AlienHex.xeon],
    bangoliour: [2, 1, AlienHex.bangoliour, AlienHex.bangoliour],
    zavientos: [2, 1, AlienHex.zavientos, AlienHex.zavientos],
    magmius: [2, 1, AlienHex.magmius, AlienHex.magmius],
    motron: [2, 1, AlienHex.motron, AlienHex.motron],
    raider: [2, 1, AlienHex.raider, AlienHex.raider],
    vortex: [2, 1, AlienHex.vortex, AlienHex.vortex],
};
function getQueries() {
    const result = {
        target: null,
        aliens: []
    };
    const response = (0, robotjs_1.screenScan)(0, 0, 1920, 1000, ...Object.values(Queries).reduce((acc, cur) => acc.concat(cur)));
    if (response[0].length > 0) {
        result.target = new vector_1.default(response[0][0].x, response[0][0].y);
    }
    for (const point of response[1]) {
        result.aliens.push(point);
        return result;
    }
    for (const point of response[2]) {
        result.aliens.push(point);
        return result;
    }
    for (const point of response[3]) {
        result.aliens.push(point);
        return result;
    }
    for (const point of response[4]) {
        result.aliens.push(point);
        return result;
    }
    for (const point of response[10]) {
        result.aliens.push(point);
        return result;
    }
    for (const point of response[11]) {
        result.aliens.push(point);
        return result;
    }
    for (const point of response[6]) {
        result.aliens.push(point);
        return result;
    }
    for (const point of response[9]) {
        result.aliens.push(point);
        return result;
    }
    for (const point of response[5]) {
        result.aliens.push(point);
        return result;
    }
    for (const point of response[7]) {
        result.aliens.push(point);
        return result;
    }
    for (const point of response[8]) {
        result.aliens.push(point);
        return result;
    }
    return result;
}
exports.getQueries = getQueries;
