import { keyTap } from "../../robotjs";
import { attack } from "../action/attack";
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

export async function notEndOfStage(endOfGate = false) {
    await nav.goto(endOfGate ? nav.portals.endGate : nav.portals.nextStage);

    await until(() => ship.portal, 1000);

    return !ship.portal;
}


export async function assureNextStage(killingWay: "attack" | "kite", jump = true, endOfGate = false) {
    while (await notEndOfStage(endOfGate)) {
        await when(() => !Alien.one());

        killingWay === "attack" ? await attack(1) : await attackKite(Alien.one().name, 1);
    }

    if (jump) {
        endOfGate ? await nav.endGate() : keyTap("j");
    }
    
}

export async function killJumpUntil(stoppingAlien: AlienName, kiteThem = false) {
    ship.x2();
    while (true) {
        while (true) {
            if (ship.pos.pointDistance(nav.portals.nextStage) > 20) switchConfig("speed");
            
            let moving = true;
            nav.calibrate(nav.portals.nextStage).then(() => moving = false);

            await sleep(5000);

            await when(() => moving && !Alien.one());

            if (ship.portal) break;


            while (Alien.one()) {
                if (Alien.one(stoppingAlien)) return;
                switchConfig("tank");
                
                if (ship.shieldLevel < 30 && Alien.one().name !== "vortex") {
                    switchConfig("speed");
                    
                    const velocity = new Vector(ship.pos.x <= nav.center.x ? 5 : -5, ship.pos.y <= nav.center.y ? 5 : -5);
                    
                    while (Alien.one()) await nav.moveBy(velocity);
                    
                    switchConfig("tank");
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

                    if (kiteThem && (target.name === "magmius" || target.name === "zavientos")) {
                        await attackKite(target.name, 1);
                    }
                    else {
                        mouse.click(target.pos);
                        await when(() => !ship.aim, 1000);
                        ship.attack();

                        const assureAttack = setInterval(() => ship.attack(), 3000);


                        await until(() => !ship.aim);

                        clearInterval(assureAttack);
                    }
                    

                }

                await sleep(0);
            }

            await sleep(0);
        }
        switchConfig("tank");

        await until(() => ship.shieldLevel > 90 && ship.healthLevel > 90);

        keyTap("j");
        await sleep(6000);
    }
}