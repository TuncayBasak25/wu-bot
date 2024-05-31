import { getPixelColor, keyTap } from "../../robotjs";
import { nav } from "../nav";
import { mouse } from "../util/mouse";
import { sleep, until } from "../util/sleep";
import { alpha } from "./alpha";
import { beta } from "./beta";
import { gamma } from "./gamma";

import { File } from "explorer";

const gatestate = {
    alpha: 0,
    beta: 0,
    gamma: 0,

    alphaDone: 0,
    gammaDone: 0,
    betaDone: 0
}
//const gateStateFile = new File(process.cwd() + "/gateState");

//gateStateFile.content = JSON.stringify(gatestate);



async function openGateMenu() {
    keyTap("f6");
    await sleep(1000);
}

async function readyGate() {
    if (getPixelColor(825, 800) === "002d5f") {
        mouse.click(825, 800);
        await sleep(1000);


        keyTap("escape");
        await sleep(1000);
        keyTap("escape");
        await sleep(1000);


        return true;
    }

    return false; 
}

async function setClickCount() {
    mouse.click(1500, 540);
    await sleep(1000);

    mouse.click(1500, 660);
    await sleep(1000);
}



let sigorta = 0;
let platine = 0;
export async function cycleMissions() {

    mouse.click(nav.screenCenter);

    while (true) {
        if (gatestate.gamma) {
            await gamma();

            gatestate.gamma--;
            gatestate.gammaDone--;
        }
        if (gatestate.beta) {
            await beta();

            gatestate.beta--;
            gatestate.betaDone--;
        }
        if (gatestate.alpha) {
            await alpha();

            gatestate.alpha--;
            gatestate.alphaDone--;
        }

        console.log(`Gamma done ${gatestate.gammaDone}\nBeta done ${gatestate.betaDone}\nAlpha done ${gatestate.alphaDone}`);
        
        await openGateMenu();
        await setClickCount();
        
        while (!gatestate.alpha && !gatestate.beta && !gatestate.gamma) {
            mouse.move(600, 300);
            await until(() => getPixelColor(760, 300) === "873838" || getPixelColor(760, 300) === "692e2e");
            mouse.click(600, 300);
            await until(() => getPixelColor(1000, 400) === "effac3");

            if (await readyGate()) {
                gatestate.alpha++;
                break;
            }

            mouse.click(600, 350);
            await until(() => getPixelColor(1000, 400) === "effac5");

            if (await readyGate()) {
                gatestate.beta++;
                break;
            }

            mouse.click(600, 380);
            await until(() => getPixelColor(1000, 400) === "effac7");

            if (await readyGate()) {
                gatestate.gamma++;
                break;
            }

            //if (sigorta > 50) process.exit();//Si il click plus de 250000;

            sigorta++;
            mouse.click(1200, 800);
            platine += 5000;

            
        }
        console.log(`Total platine used: ${platine}`);
    }
}