import { keyTap } from "../../robotjs";
import { attack } from "../action/attack";
import { attackKite } from "../action/kite";
import { repair } from "../action/repair";
import { Alien, AlienName } from "../alien";
import { buyX2 } from "../menu/starmission";
import { nav } from "../nav";
import { switchConfig } from "../param/config";
import { ship } from "../ship";
import { doWhile, sleep, until, when } from "../util/sleep";
import { killJumpUntil } from "./stage";


export async function beta() {
    keyTap("h");

    await nav.starMission("beta");

    await killJumpUntil("xeon");
    
    await attackKite(10);
    await killJumpUntil("bangoliour");

    await attackKite(20);
    await killJumpUntil("zavientos");

    await attackKite(10);
    await killJumpUntil("magmius");

    await attackKite(5);
    await killJumpUntil("bangoliour");

    await attackKite(7);
    await killJumpUntil("vortex");

    
    await attackKite(15);
    await killJumpUntil("xeon", "bangoliour");
    
    await attackKite(6);

    await killJumpUntil();

    await switchConfig("speed");
}

