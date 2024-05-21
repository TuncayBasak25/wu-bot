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


export async function alpha(skip = 0) {
    skip || keyTap("h");
    skip || keyTap("w");
    //skip || await buyX2();
    await nav.starMission("alpha");


    skip || await killJumpUntil("zavientos");

    skip || await attackKite(10);
    skip || await killJumpUntil("magmius");

    skip || await attackKite(5);
    skip || await killJumpUntil("bangoliour");

    skip || await attackKite(9);
    await killJumpUntil("bangoliour", "xeon");

    await attackKite(8);
    await assureNextStage("attack", true, true);

    keyTap("x");
}