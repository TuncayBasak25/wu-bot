import { keyTap } from "../../robotjs";
import { Box } from "../util/box";
import { sleep } from "../util/sleep";
import Vector from "../util/vector";


let state = true;

async function show() {
    if (!state) {
        state = !state;
        keyTap("i");

        await sleep(100);
    }
}

async function hide() {
    if (state) {
        state = !state;
        keyTap("i");

        await sleep(100);
    }
}

const menuBox = new Box(873, 909, 1049, 1032)
const minimapBox = new Box(0, 800, 360, 1032)
const topMenuBox = new Box(850, 0, 1160, 80)
const lazerGameBox = new Box(1600, 590, 1920, 1080);

export function outsideHud(point: Vector) {
    return !menuBox.isInside(point) && !minimapBox.isInside(point) && !topMenuBox.isInside(point) && !lazerGameBox.isInside(point);
}

export const hud = {
    state,
    show,
    hide
};