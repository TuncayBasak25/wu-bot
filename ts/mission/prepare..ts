import { getPixelColor, keyTap } from "../../robotjs";
import { nav } from "../nav";
import { mouse } from "../util/mouse";
import { sleep, until } from "../util/sleep";
import { alpha } from "./alpha";
import { beta } from "./beta";
import { gamma } from "./gamma";

import { File } from "explorer";


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

async function missionCycle() {
    await openGateMenu();

    mouse.move(600, 300);
    await until(() => getPixelColor(760, 300) === "873838" || getPixelColor(760, 300) === "692e2e");
    mouse.click(600, 300);
    await until(() => getPixelColor(1000, 400) === "effac3");

    if (getPixelColor(967, 830) == "131a2a") {
        await alpha();
        return true;
    }
    if (await readyGate()) {
        await alpha();
        return true;
    }

    mouse.click(600, 350);
    await until(() => getPixelColor(1000, 400) === "effac5");

    if (getPixelColor(967, 830) == "131a2a") {
        await beta();
        return true;
    }
    if (await readyGate()) {
        await beta();
        return true;
    }

    mouse.click(600, 380);
    await until(() => getPixelColor(1000, 400) === "effac7");

    if (getPixelColor(967, 830) == "131a2a") {
        await gamma();
        return true;
    }
    if (await readyGate()) {
        await gamma();
        return true;
    }

    return false;
}

export async function doMissions() {
    while (await missionCycle()) await sleep(0);
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

        if (getPixelColor(825, 800) === "002d5f") break;

        mouse.click(600, 350);
        await until(() => getPixelColor(1000, 400) === "effac5");

        if (getPixelColor(825, 800) === "002d5f") break;

        mouse.click(600, 380);
        await until(() => getPixelColor(1000, 400) === "effac7");

        if (getPixelColor(825, 800) === "002d5f") break;

        mouse.click(1200, 800);
    }
}