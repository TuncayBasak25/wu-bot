import { keyTap } from "../../robotjs";
import { attack } from "../action/attack";
import { attackKite } from "../action/kite";
import { repair } from "../action/repair";
import { Alien, AlienName } from "../alien";
import { buyX2 } from "../menu/starmission";
import { nav } from "../nav";
import { switchConfig } from "../param/config";
import { hud, outsideHud } from "../param/hud";
import { ship } from "../ship";
import { mouse } from "../util/mouse";
import { doWhile, sleep, until, when } from "../util/sleep";
import { killJumpUntil } from "./stage";


export async function gamma(skipWawe = 0) {
    keyTap("h");
    // await buyX2(2);

    await nav.starMission("gamma");

    await killJumpUntil("xeon");
    await attackKite(10);

    await killJumpUntil("bangoliour");
    await attackKite(20);

    await killJumpUntil("zavientos");
    await attackKite(5);
    
    await killJumpUntil("magmius");
    switchConfig("speed");
    await nav.goto(nav.center.setY(0));
    await when(() => !Alien.one());
    await nav.goto(nav.center.setX(nav.botRight.x));
    await when(() => !Alien.one());
    await nav.goto(nav.topRight);
    await when(() => !Alien.one());
    await attackKite(5);

    await killJumpUntil("bangoliour");

    await attackKite(5);

    await killJumpUntil("vortex");
    await attackKite(15);

    await killJumpUntil("xeon", "bangoliour");

    await attackKite(6);
    await killJumpUntil();

    await switchConfig("speed");


}

