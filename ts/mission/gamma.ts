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
import { assureNextStage, killJumpUntil } from "./stage";


export async function gamma(skipWawe = 0) {
    // keyTap("h");
    // await buyX2(2);

    await nav.starMission("gamma");

    // await killJumpUntil("xeon");
    // await attackKite(10);

    // await killJumpUntil("bangoliour");
    // keyTap("v");
    // await attackKite(20);

    // await killJumpUntil("zavientos");
    // await attackKite(5);
    
    await killJumpUntil("magmius");

    switchConfig("speed");
    
    await nav.goto(nav.center.setY(0));
    await when(() => !Alien.one());
    
    await nav.goto(nav.center.setX(nav.botRight.x));
    await when(() => !Alien.one());
    
    await nav.goto(nav.center.setY(0));
    await when(() => !Alien.one());
    
    await nav.goto(nav.center.setX(nav.botRight.x));
    await when(() => !Alien.one());

    await nav.goto(nav.topRight);

    await when(() => !Alien.one());

    keyTap("v");
    await attackKite(5);
    await killJumpUntil("bangoliour");

    keyTap("v");
    await attackKite(5);

    await killJumpUntil("vortex");
    await attackKite(15);

    await killJumpUntil("xeon", "bangoliour");

    await attackKite(6);
    await assureNextStage("attack", true, true);
}


let keepConstantMove = false;
const lastCoin = nav.center;

async function constantMove() {
    while (keepConstantMove) {
        await when(() => ship.moving);

        nav.calibrate(ship.pos.farthestPoint(nav.botLeft, nav.botRight, nav.topLeft, nav.topRight));
    }
}

async function ultraVortexStage() {
    let vortexCount = 15;
    
    keyTap("v");
    while (vortexCount > 0) {
        switchConfig("tank");

        const start = Date.now();
        await when(() => Alien.all().filter(a => outsideHud(a.pos)).length === 0);
        if (Date.now() - start > 30000) break;


        while (ship.shieldLevel > 5) {
            if (ship.healthLevel < 60) keyTap("q");
            while (!ship.aim) {
                await when(() => Alien.all().filter(a => outsideHud(a.pos)).length === 0);
                mouse.click(nav.screenCenter.nearestPoint(...Alien.all().map(a => a.pos).filter(a => outsideHud(a))));
                await when(() => !ship.aim, 800);
            }

            const mrs = (vortexCount > 10) && setInterval(() => keyTap("z"), 1500);

            keyTap("2");
            await sleep(mrs ? 3000 : 5000);
            keyTap("s");
            keyTap("a");
            await until(() => !ship.aim);

            mrs && clearInterval(mrs);

            vortexCount--;
        }
        switchConfig("speed");

        keyTap("e");

        await until(() => ship.speed === 506);
        await nav.goto(ship.pos.farthestPoint(nav.botLeft.add(25, -25), nav.botRight.add(-25, -25), nav.topLeft.add(25, 25), nav.topRight.add(-25, 25)));

        switchConfig("tank");

        await nav.goto(ship.pos.farthestPoint(nav.botLeft, nav.botRight, nav.topLeft, nav.topRight));
    }
}