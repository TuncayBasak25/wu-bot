import robot, { getMousePos, getPixelColor, findColor as getPx, keyTap, mouseClick, getMousePos as mousePos, moveMouse } from "../robotjs";
import { Alien, AlienHex, Promotion } from "./alien";
import { hud } from "./param/hud";
import { mouse } from "./util/mouse";
import { ship } from "./ship";
import { sleep, until, when } from "./util/sleep";
import Vector from "./util/vector";
import { nav } from "./nav";
import { startScan } from "./scan";
import { switchConfig } from "./param/config";
import { alpha } from "./mission/alpha";
import { attackKite } from "./action/kite";
import { attack } from "./action/attack";
import { beta } from "./mission/beta";
import { gamma } from "./mission/gamma";
import { kratos } from "./mission/kratos";
import { buyX2, prepareAlpha, prepareBeta } from "./menu/starmission";
import { killJumpUntil } from "./mission/stage";
import { cycleMissionsUntilKratos } from "./mission/prepare.";


startScan();
//preventTWPopup();

const coordNumberTopLeft = new Vector(290, 807);
const coordNumberBotRight = new Vector(350, 818);

enum CoordDigit {
    zero = "256 2 64",
    one = "1024",
    two = "8 512 1024 1024 1024",
    three = "4 32",
    four = "128 128 1024",
    five = "1 1 1 128",
    six = "128 128",
    seven = "1 1 1 1 2 1",
    eight = "32 32 32",
    nine = "16 64 32"
}

async function test() {
    while (true) {
        const coords = new Vector(0, 0);
        let leftSide = true;
        const main_sequence = [];
        
        for (let x = coordNumberTopLeft.x; x < coordNumberBotRight.x; x++) {
            let line = 0;
            let count = 0;
            for (let y = coordNumberTopLeft.y; y < coordNumberBotRight.y; y++) {
                const pc = getPixelColor(x, y);
                if (pc == "48f5f3") {
                    if (line) line <<= 1;
                    else {
                        line++;

                        line <<= count;
                    }
                }
                else if (pc == "34b2b0" && getPixelColor(x, y-1) == "154747") line = -1;
                count++;
            }

            if (line) main_sequence.push(line);
        }

        const sequence: number[] = [];
        while (main_sequence.length > 0) {
            sequence.push(main_sequence.shift() as number);
            let digit: number | null = null;
            switch (sequence.length) {
                case 1: {
                    if (sequence[0] == 1024) digit = 1;
                    else if (sequence[0] == -1) {
                        leftSide = false;

                        sequence.length = 0;
                    }
                    break;
                }
                case 2: {
                    if (sequence[0] == 4 && sequence[1] == 32) digit = 3;
                    else if (sequence[0] == 128 && sequence[1] == 128 && (main_sequence.length == 0 || main_sequence[0] != 1024)) digit = 6;
                    break;
                }
                case 3: {
                    if (sequence[0] == 256 && sequence[1] == 2 && sequence[2] == 64) digit = 0;
                    else if (sequence[0] == 128 && sequence[1] == 128 && sequence[2] == 1024) digit = 4;
                    else if (sequence[0] == 32 && sequence[1] == 32 && sequence[2] == 32) digit = 8;
                    else if (sequence[0] == 16 && sequence[1] == 64 && sequence[2] == 32) digit = 9;

                    break;
                }
                case 4: {
                    if (sequence[0] == 1 && sequence[1] == 1 && sequence[2] == 1 && sequence[3] == 128) digit = 5;
                    break;
                }
                case 5: {
                    if (sequence[0] == 8 && sequence[1] == 512 && sequence[2] == 1024 && sequence[3] == 1024 && sequence[4] == 1024) digit = 2;
                    break;
                }
                case 6: {
                    if (sequence[0] == 1 && sequence[1] == 1 && sequence[2] == 1 && sequence[3] == 1 && sequence[4] == 2 && sequence[5] == 1) digit = 7;
                    break;
                }
            }

            if (digit != null) {
                if (leftSide) coords.mulX(10).addX(digit);
                else coords.mulY(10).addY(digit);

                sequence.length = 0;
            }
        }

        console.log(coords);
        
        
        await sleep(1);
    }
}

async function main()
{
    //await test();
    await showMouse()

    //await nav.calibrate(nav.u7Base);

    // await kratos()

    //await cycleMissionsUntilKratos();
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


//290 800
//350 820



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