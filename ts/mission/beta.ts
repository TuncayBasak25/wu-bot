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
    await buyX2();
    keyTap("w");

    await nav.starMission("beta");

    await killJumpUntil("xeon");
    
    await attackKite("xeon", 10);
    await killJumpUntil("bangoliour");

    keyTap("x");

    await attackKite("bangoliour", 20);
    await killJumpUntil("zavientos");

    keyTap("v");
    await attackKite("zavientos", 10);
    await killJumpUntil("magmius");

    await attackKite("magmius", 5);
    await killJumpUntil("bangoliour");

    keyTap("v");
    await attackKite("bangoliour", 4);
    await attackKite("zavientos", 2);
    await attackKite("magmius", 1);
    await killJumpUntil("vortex");

    
    await attackKite("vortex", 15);
    await killJumpUntil("plairon");
    
    await attackKite("bangoliour", 1);
    await attackKite("vortex", 1);
    await attackKite("raider", 1);
    
    await attackKite("magmius", 1);
    await attackKite("zavientos", 1);
    await attackKite("xeon", 1);

    await assureNextStage("attack", true, true);
}

