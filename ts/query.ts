import { screenScan } from "../robotjs";
import Vector from "./vector";

const l = [0xFF0000, 0xFF0000, 0xFF0000, 0xFF0000, 0xFF0000]

enum AlienHex {
    hydro = 0xaabbcc,
    jenta = 0xaabbcf,
    mali = 0xaabbd0,
    plairon = 0xaabbd1,
    xeon = 0xaabbd2,
    bangoliour = 0xaabbd3,
    zavientos = 0xaabbd4,
    magmius = 0xaabbd5,
    motron = 0xaabbd8,
    raider = 0xaabbdb,
    vortex = 0xaabbd9
}

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
}


export function getQueries(): { target: Vector | null, aliens: Vector[] } {
    const result: { target: Vector | null, aliens: Vector[] } = {
        target: null,
        aliens: []
    }

    const response = screenScan(0, 0, 1920, 1000, ...Object.values(Queries).reduce((acc, cur) => acc.concat(cur)));

    if (response[0].length > 0) {
        result.target = new Vector(response[0][0].x, response[0][0].y);
    }

    for (const point of response[1]) { result.aliens.push(point); return result; }
    for (const point of response[2]) { result.aliens.push(point); return result; }
    for (const point of response[3]) { result.aliens.push(point); return result; }
    for (const point of response[4]) { result.aliens.push(point); return result; }
    for (const point of response[10]) { result.aliens.push(point); return result; }
    for (const point of response[11]) { result.aliens.push(point); return result; }
    for (const point of response[6]) { result.aliens.push(point); return result; }
    for (const point of response[9]) { result.aliens.push(point); return result; }
    for (const point of response[5]) { result.aliens.push(point); return result; }
    for (const point of response[7]) { result.aliens.push(point); return result; }
    for (const point of response[8]) { result.aliens.push(point); return result;}

    return result;
}