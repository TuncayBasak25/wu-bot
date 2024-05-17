import { keyTap } from "../../robotjs";
import { ship } from "../ship";
import { sleep, until } from "../util/sleep";

type Config = "speed" | "tank";

let state: Config = "speed";
let targetState: Config = "speed";


async function configChecker() {
    while (true) {
        if (state !== targetState) {
            state = targetState;

            ship.speed = state === "speed" ? 506 : 330;

            keyTap("c");

            await sleep(5000);
        }

        await sleep(100);
    }
}

configChecker();

export async function switchConfig(targetConfig: Config) {
    targetState = targetConfig;
}

export function actualConfig() {
    return state;
}