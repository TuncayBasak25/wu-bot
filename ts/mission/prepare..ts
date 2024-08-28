import { getPixelColor, keyTap } from "../../robotjs";
import { nav } from "../nav";
import { mouse } from "../util/mouse";
import { sleep, until } from "../util/sleep";
import { alpha } from "./alpha";
import { beta } from "./beta";
import { gamma } from "./gamma";

import { File } from "explorer";
import { kratos } from "./kratos";


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

export async function cycleMissionsUntilKratos() {
    while (true) {
        await openGateMenu();

        mouse.move(600, 300);
        await until(() => getPixelColor(760, 300) === "873838" || getPixelColor(760, 300) === "692e2e");
        mouse.click(600, 300);
        await until(() => getPixelColor(1000, 400) === "effac3");

        let alphaReady = 0;
        let alphaReadible = 0;
        let betaReady = 0;
        let betaReadible = 0;
        let gammaReady = 0;
        let gammaReadible = 0;
        let kratosReady = 0;
        let kratosReadible = 0;

        if (getPixelColor(967, 831) == "48f5f3") alphaReady++;
        if (getPixelColor(825, 800) === "002d5f") alphaReadible++;

        mouse.click(600, 350);
        await until(() => getPixelColor(1000, 400) === "effac5");

        if (getPixelColor(967, 831) == "48f5f3") betaReady++;
        if (getPixelColor(825, 800) === "002d5f") betaReadible++;

        mouse.click(600, 380);
        await until(() => getPixelColor(1000, 400) === "effac7");

        if (getPixelColor(967, 831) == "48f5f3") gammaReady++;
        if (getPixelColor(825, 800) === "002d5f") gammaReadible++;

        mouse.click(600, 410);
        await until(() => getPixelColor(1000, 400) === "effac9");

        if (getPixelColor(967, 831) == "48f5f3") kratosReady++;
        if (getPixelColor(825, 800) === "002d5f") kratosReadible++;

        keyTap("escape");
        await sleep(1000);

        if (alphaReady) await alpha();
        if (alphaReadible) {
            await openGateMenu();
            await readyGate();
            await alpha();
        }

        if (betaReady) await beta();
        if (betaReadible) {
            await openGateMenu();

            mouse.click(600, 350);
            await until(() => getPixelColor(1000, 400) === "effac5");

            await readyGate();
            await beta();
        }

        if (gammaReady) await gamma();
        if (gammaReadible) {
            await openGateMenu();

            mouse.click(600, 380);
            await until(() => getPixelColor(1000, 400) === "effac7");

            await readyGate();
            await gamma();
        }

        if (kratosReady && kratosReadible) await kratos();
    }
}

async function handleReadyGate() {
    if (getPixelColor(825, 800) === "002d5f") {
        if (getPixelColor(967, 831) == "48f5f3") return true;

        mouse.click(825, 800);
        await sleep(1000);

        keyTap("escape");
        await sleep(1000);
    }

    return false;
}

export async function clickMissions() {

    mouse.click(nav.screenCenter);

    await openGateMenu();
    await setClickCount();

    while (true) {
        mouse.move(600, 300);
        await until(() => getPixelColor(760, 300) === "873838" || getPixelColor(760, 300) === "692e2e");
        mouse.click(600, 300);
        await until(() => getPixelColor(1000, 400) === "effac3");

        if (await handleReadyGate()) break;

        mouse.click(600, 350);
        await until(() => getPixelColor(1000, 400) === "effac5");

        if (await handleReadyGate()) break;

        mouse.click(600, 380);
        await until(() => getPixelColor(1000, 400) === "effac7");

        if (await handleReadyGate()) break;

        mouse.click(600, 410);
        await until(() => getPixelColor(1000, 400) === "effac9");

        if (await handleReadyGate()) break;

        mouse.click(1200, 800);
    }

    keyTap("escape");
    await sleep(1000);
}