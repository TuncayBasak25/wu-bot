import { keyTap } from "../../robotjs";
import { attack } from "../action/attack";
import { attackKite } from "../action/kite";
import { repair } from "../action/repair";
import { buyX2 } from "../menu/starmission";
import { nav } from "../nav";
import { killJumpUntil } from "./stage";

export async function kratos() {
    keyTap("h");

    keyTap("w");

    await nav.starMission("kratos");

    await killJumpUntil("zavientos");

    await killJumpUntil("hydro");
    
    await killJumpUntil("bangoliour");
    
    await attackKite("bangoliour", 16);
    await attackKite("zavientos", 2);

    await killJumpUntil("bangoliour");
    
    await attackKite("bangoliour", 20);
    await attackKite("raider", 20);
    
    await killJumpUntil("vortex");

    await attackKite("vortex", 15);
    
    await attackKite("magmius", 1);
    await attackKite("zavientos", 1);
    
    await nav.quitStage();

    keyTap("x");
}