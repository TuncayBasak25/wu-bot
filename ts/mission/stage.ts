import { keyTap } from "../../robotjs";
import { attackKite } from "../action/kite";
import { repair } from "../action/repair";
import { Alien, AlienName } from "../alien";
import { nav } from "../nav";
import { switchConfig } from "../param/config";
import { outsideHud } from "../param/hud";
import { ship } from "../ship";
import { mouse } from "../util/mouse";
import { sleep, until, when } from "../util/sleep";
import Vector from "../util/vector";

export async function attack() {
    switchConfig("tank");

    if (ship.shieldLevel < 30 && Alien.one().name !== "vortex") {
        switchConfig("speed");

        const velocity = new Vector(ship.pos.x <= nav.center.x ? 5 : -5, ship.pos.y <= nav.center.y ? 5 : -5);

        while (Alien.one()) await nav.moveBy(velocity);

        await switchConfig("tank");
        await sleep(500);
        await nav.moveBy(velocity);

        while (true) {
            if (ship.shieldLevel > 90) break;

            if (Alien.one()) await nav.moveBy(velocity);

            await sleep(0);
        }

        while (!Alien.one()) await nav.moveBy(velocity.clone.div(-5));
    }

    if (Alien.all().filter(a => outsideHud(a.pos)).length > 0) {
        const target = Alien.all().filter(a => outsideHud(a.pos))
            .sort((a, b) => nav.screenCenter.pointDistance(a.pos) - nav.screenCenter.pointDistance(b.pos))[0];

        ship.x2();
        ship.nc();
        if (nav.map === "beta" && (target.name === "zavientos" || target.name === "magmius" || target.name === "bangoliour" || target.name === "vortex")) {
            ship.x3();
            ship.tnc();
        }
        if (nav.map === "gamma" && (target.name === "zavientos" || target.name === "magmius" || target.name === "bangoliour" || target.name === "vortex")) {
            ship.x4();
            ship.tnc();
        }

        if (target.name === "magmius" || target.name === "zavientos") {
            await attackKite(1);
        }
        else {
            mouse.click(target.pos);
            await when(() => !ship.aim, 1000);
            ship.attack();

            const assureAttack = setInterval(() => ship.attack(), 1000);


            await until(() => !ship.aim);

            clearInterval(assureAttack);
        }
    }
}

export async function killJumpUntil(...stoppingAlienList: AlienName[]) {
    const nextGate = stoppingAlienList.length === 0 ? nav.portals.endGate : nav.portals.nextStage;

    switchConfig("speed");
    await nav.goto(nextGate);
    
    await until(() => ship.portal || !!Alien.one());

    if (ship.portal) {
        switchConfig("tank");

        await until(() => ship.shieldLevel > 90 && ship.healthLevel > 90);

        if (stoppingAlienList.length === 0) return await nav.endGate();
        else await nav.nextStage();
    }
    else {
        while (Alien.one()) {
            if (stoppingAlienList.length > 0 && Alien.all(...stoppingAlienList).length > 0) return;
            
            await attack();

            await sleep(0);
        }
    }

    await killJumpUntil(...stoppingAlienList);
}