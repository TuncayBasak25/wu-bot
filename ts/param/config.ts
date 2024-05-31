import { getPixelColor, keyTap } from "../../robotjs";
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

            if (targetState == "speed" && getPixelColor(1018, 442) != "ffffff" || targetState == "tank" && getPixelColor(900, 442) != "ffffff") {    
                keyTap("c");
    
                await sleep(5500);
            }
        }

        await sleep(0);
    }
}

configChecker();

export async function switchConfig(targetConfig: Config) {
    targetState = targetConfig;
}

export function actualConfig() {
    return state;
}