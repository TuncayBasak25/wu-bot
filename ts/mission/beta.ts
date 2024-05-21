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
import { assureNextStage, killJumpUntil } from "./stage";


export async function beta() {
    keyTap("h");
    //await buyX2();
    keyTap("w");

    await nav.starMission("beta");

    await killJumpUntil("xeon");
    
    await attackKite(10);
    await killJumpUntil("bangoliour");

    keyTap("x");

    await attackKite(20);
    await killJumpUntil("zavientos");

    keyTap("v");
    await attackKite(10);
    await killJumpUntil("magmius");

    await attackKite(5);
    await killJumpUntil("bangoliour");

    keyTap("v");
    await attackKite(7);
    await killJumpUntil("vortex");

    
    await attackKite(15);
    await killJumpUntil("xeon", "bangoliour");
    
    await attackKite(6);

    await assureNextStage("attack", true, true);
}

