import robot, { getMousePos, getPixelColor, findColor as getPx, keyTap, mouseClick, getMousePos as mousePos, moveMouse } from "../robotjs";
import { hud } from "./param/hud";
import { mouse } from "./util/mouse";
import { ship } from "./ship";
import { sleep, until, when } from "./util/sleep";
import Vector from "./util/vector";
import { nav } from "./nav";
import { startScan } from "./scan";

import { menu } from "./menu";


startScan();
preventTWPopup();

async function main()
{
    mouse.click(nav.screenCenter);
    await menu.gate.loopUntilKratos();
}
main();


async function preventTWPopup() {
    await sleep(1000);

    while (true) {
        await sleep(1000);
        if (ship.tw) {
            await sleep(1000);

            if (ship.tw) {
                mouse.click(1120, 580);
            }
        }
        //if (ship.tw) mouse.click(1500, 240)
    }
}


//10.000 x delta for click total norme




async function showMouse() {
    const last = getMousePos();
    while (true) {
        const pos = getMousePos();

        if (pos.x !== last.x || pos.y !== last.y) {
            console.log(`Mouse(${pos.x}, ${pos.y}): color(${getPixelColor(pos.x, pos.y)} : ${getPixelColor(pos.x + 1, pos.y)} : ${getPixelColor(pos.x + 2, pos.y)} : ${getPixelColor(pos.x + 3, pos.y)})`);


            last.x = pos.x;
            last.y = pos.y;
        }

        await sleep(500);
    }

    let x = 960;
    let y = 445;

    while (getPixelColor(x, y) === "1b9dda") x--;
    x++;
    while (getPixelColor(x, y) === "1b9dda") y--;
    y++;

    console.log(`Start: (${x}, ${y})`);

    while (getPixelColor(x, y) === "1b9dda") x++;
    x--;
    while (getPixelColor(x, y) === "1b9dda") y++;
    y--;

    console.log(`End: (${x}, ${y})`);
}