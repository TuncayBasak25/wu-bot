import { keyTap } from "../../robotjs";
import { mouse } from "../util/mouse";
import { sleep } from "../util/sleep";


let menuOpen = false;
export async function openMenu() {
    mouse.click(950, 1000);

    await sleep(1000);
}

export async function openGates() {
    await openMenu();

    mouse.click(460, 560);
    await sleep(1000);
}

export async function prepareAlpha() {
    await openGates();

    mouse.click(1000, 800);
    await sleep(1000);

    keyTap("escape");
    await sleep(1000);
    keyTap("escape");
    await sleep(1000);
}

export async function prepareBeta() {
    await openGates();

    mouse.click(650, 340);
    await sleep(1000);

    mouse.click(1000, 800);
    await sleep(1000);

    keyTap("escape");
    await sleep(1000);
    keyTap("escape");
    await sleep(1000);
}

export async function buyX2(pack = 1) {
    await openMenu();

    mouse.click(460, 420);
    await sleep(1000);

    mouse.click(750, 220);
    await sleep(1000);

    mouse.click(750, 720);
    await sleep(1000);

    while (pack-- > 0) {
        mouse.click(1400, 580);
        await sleep(1000);

        keyTap("enter");
        keyTap("enter");
    }

    keyTap("escape");

    await sleep(1000);
}