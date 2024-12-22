import { keyTap } from "../../robotjs";
import { attackKite } from "../action/kite";
import { repair } from "../action/repair";
import { Alien } from "../alien";
import { nav } from "../nav";
import { switchConfig } from "../param/config";
import { ship } from "../ship";
import { sleep, until, when } from "../util/sleep";
import { attack, killJumpUntil } from "./stage";

async function quitOnPortal() {
    while (true) {
        if (ship.portal) process.exit();

        await sleep(0);
    }
}

export async function kratos() {
    await nav.starMission("kratos");

    await killJumpUntil("zavientos");

    await killJumpUntil("hydro");
    
    await killJumpUntil("bangoliour");
    
    await attackKite(18);

    await killJumpUntil("bangoliour");
    await attackKite(40);
    
    await killJumpUntil("vortex");

    await attackKite(17);

    quitOnPortal();

    while (true) {
        await nav.goto(nav.portals.nextStage);

        while (!Alien.one()) await sleep(0);

        await attack();
    }
}