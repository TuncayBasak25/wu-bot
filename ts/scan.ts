import { getPixelColor, pixelScan } from "../robotjs";
import { Alien, AlienHex } from "./alien";
import { actualConfig } from "./param/config";
import { ship } from "./ship";
import { mouse } from "./util/mouse";
import { sleep } from "./util/sleep";
import Vector from "./util/vector";

const queryList = [
    0xFF0000, 25, 1,//Aim
    AlienHex.hydro, 2, 0,
    AlienHex.jenta, 2, 0,
    AlienHex.mali, 2, 0,
    AlienHex.plairon, 2, 0,
    AlienHex.raider, 2, 0,
    AlienHex.vortex, 2, 0,
    AlienHex.bangoliour, 2, 0,
    AlienHex.motron, 2, 0,
    AlienHex.xeon, 2, 0,
    AlienHex.zavientos, 2, 0,
    AlienHex.magmius, 2, 0,
    0xeedaf0, 5, 1,//Moving reactors
    0xEFFADA, 25, 1,//Portal
    0xFFFFFF, 300, 1, //TW window

    0xEE0FCC, 2, 0, //Bonus box
    0xEE0FCD, 2, 0 //Cargo box
]

// const measureList = [
//     0x3cac19, 910, 448, 1009, 451,
//     0x1b9dda, 910, 455, 1009, 458,
// ];

const healthList: number[] = [];
const shieldList: number[] = [];
const measureList = [
    0x3cac19, 910, 435, 1009, 438, //Health
    0x1b9dda, 910, 442, 1009, 445, //Shield
    0xE1B727, 910, 435, 1009, 438, //Extra Health
    0x205C0D, 910, 435, 1009, 438, //Extra Background
];

//1250, 410 rep red
let disconnectTimeout: NodeJS.Timeout;
export async function startScan(cooldown: number = 0) {
    const response = pixelScan(0, 0, 1920, 1000, queryList.length / 3, ...queryList, measureList.length / 5, ...measureList);

    const newShipPos = new Vector(response[2].x, response[2].y);

    console.log(newShipPos);
    

    ship.tw = response[0][14].length > 0;
    
    if (!ship.tw && (response[1][0] || response[1][1] || response[1][2] || response[1][3])) {
        ship.aim = response[0][0][0] && new Vector(response[0][0][0].x, response[0][0][0].y);

        ship.moving = response[0][12].length > 0;
        ship.portal = response[0][13].length > 0;

        shieldList.push(response[1][1]);
        if (shieldList.length > 20) shieldList.shift();
        ship.shieldLevel = shieldList.reduce((acc, cur) => acc + cur) / shieldList.length;

        if (!response[1][2] && !response[1][3]) {
            healthList.push(response[1][0]);
            if (healthList.length > 20) healthList.shift();
            ship.healthLevel = healthList.reduce((acc, cur) => acc + cur) / healthList.length;
        }
        else {
            ship.healthLevel = 100;
        }

        if (ship.disconnected) {
            ship.disconnected = false;
        }
    }
    else if (!ship.disconnected && getPixelColor(759, 884) === "775300") {
        mouse.click(960, 880);

        ship.disconnected = true;

        if (disconnectTimeout) clearTimeout(disconnectTimeout);

        disconnectTimeout = setTimeout(() => ship.disconnected && process.exit(), 10000);
    }

    Alien.list = [];

    for (let i = 0; i < Alien.enum.length; i++) {
        for (const pos of response[0][i + 1]) {
            const alien = Alien.enum[i]();
            alien.pos.set(pos);
            Alien.list.push(alien);
        }
    }

    ship.bonusBoxes = [];
    ship.cargoBoxes = [];

    for (const bonusBoxPos of response[0][15]) ship.bonusBoxes.push(new Vector().set(bonusBoxPos));
    for (const cargoBoxPos of response[0][16]) ship.cargoBoxes.push(new Vector().set(cargoBoxPos));

    await sleep(cooldown);

    await startScan();
}


