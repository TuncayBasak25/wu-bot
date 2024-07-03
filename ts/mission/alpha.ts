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
import { killJumpUntil } from "./stage";


export async function alpha() {
    await buyX2();

    await nav.starMission("alpha");
    
    await killJumpUntil("bangoliour");
    await attackKite(20);
    
    await killJumpUntil("zavientos");
    
    await attackKite(10);
    await killJumpUntil("magmius");
    
    await attackKite(5);
    await killJumpUntil("bangoliour");
    
    await attackKite(9);
    await killJumpUntil("bangoliour", "xeon");
    
    await attackKite(8);
    await killJumpUntil();
    
    await switchConfig("speed");
}