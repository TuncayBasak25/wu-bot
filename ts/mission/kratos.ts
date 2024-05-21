import { keyTap } from "../../robotjs";
import { attack } from "../action/attack";
import { attackKite } from "../action/kite";
import { repair } from "../action/repair";
import { buyX2 } from "../menu/starmission";
import { nav } from "../nav";
import { switchConfig } from "../param/config";
import { killJumpUntil } from "./stage";

export async function kratos() {
    keyTap("h");

    keyTap("w");

    await nav.starMission("kratos");

    await killJumpUntil("zavientos");

    await killJumpUntil("hydro");
    
    await killJumpUntil("bangoliour");
    
    await attackKite(18);

    await killJumpUntil("bangoliour");
    await attackKite(40);
    
    await killJumpUntil("vortex");

    await attackKite(17);
    
    await nav.quitStage();

    switchConfig("speed");
    keyTap("x");
}