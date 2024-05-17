import { keyTap } from "../../robotjs";
import { attack } from "../action/attack";
import { attackKite } from "../action/kite";
import { repair } from "../action/repair";
import { Alien, AlienName } from "../alien";
import { buyX2 } from "../menu/starmission";
import { nav } from "../nav";
import { switchConfig } from "../param/config";
import { ship } from "../ship";
import { mouse } from "../util/mouse";
import { sleep, until, when } from "../util/sleep";
import { assureNextStage, killJumpUntil } from "./stage";


export async function alpha() {
    keyTap("h");
    keyTap("w");
    await buyX2();
    await nav.starMission("alpha");


    await killJumpUntil("zavientos");

    await attackKite("zavientos", 10);
    await killJumpUntil("magmius");

    await attackKite("magmius", 5);
    await killJumpUntil("bangoliour");

    await attackKite("bangoliour", 6);
    await attackKite("magmius", 1);
    await attackKite("zavientos", 2);
    await killJumpUntil("plairon");

    await attackKite("bangoliour", 1);
    await attackKite("vortex", 2);
    await attackKite("raider", 2);

    await attackKite("magmius", 1);
    await attackKite("zavientos", 1);
    await attackKite("xeon", 1);
    await assureNextStage("attack", true, true);

    keyTap("x");
}