import { join } from "path";
import { keyTap } from "../../robotjs";
import { Alien, AlienName } from "../alien";
import { nav } from "../nav";
import { actualConfig, switchConfig } from "../param/config";
import { hud, outsideHud } from "../param/hud";
import { ship } from "../ship";
import { mouse } from "../util/mouse";
import { sleep, until, when } from "../util/sleep";
import Vector from "../util/vector";

let xsens = true;
let ysens = false;

export async function attackKite(enemyCount: number) {
    
    let killedCount = 0;
    while (enemyCount > 0) {
        if (ship.healthLevel < 30) {
            switchConfig("speed");
            await until(() => actualConfig() === "speed");

            await nav.goto(ship.pos.farthestPoint(nav.botLeft, nav.botRight, nav.topLeft, nav.topRight));

            switchConfig("tank");

            await until(() => enemyCount > 1 && Alien.all().length > 1 || !!Alien.one());

        }
        if (ship.pos.x < nav.botRight.x * 0.2) xsens = false;
        else if (ship.pos.x > nav.botRight.x * 0.8) xsens = true;

        if (ship.pos.y < nav.botRight.y * 0.2) ysens = false;
        else if (ship.pos.y > nav.botRight.y * 0.8) ysens = true;


        while (Alien.one() && !Alien.all().reduce((acc, {pos}) => acc || (xsens ? pos.x > nav.screenCenter.x : pos.x < nav.screenCenter.x) && (ysens ? pos.y > nav.screenCenter.y : pos.y < nav.screenCenter.y)  ,false)) {
            switchConfig("speed");

            await nav.moveBy(xsens ? -5 : 5, ysens ? -2 : 2);
        }

        let target = Alien.hydro;
        while (!ship.aim) {
            const start = Date.now();
            while (Alien.all().map(a => a.pos).filter(a => outsideHud(a)).length === 0) {
                if (Date.now() - start >= 30000 && killedCount > 0) return;
                await sleep(0);
            }
            const alienInsideHud = Alien.all().filter(a => outsideHud(a.pos));
            const fastestAliens = alienInsideHud.sort((a,b) => b.speed - a.speed).filter(a => a.speed === alienInsideHud[0].speed);

            target = fastestAliens[0];

            mouse.click(nav.screenCenter.nearestPoint(...fastestAliens.map(a => a.pos)));

            await when(() => !ship.aim, 2000);
        }

        const alienName = ((nav.map === "gamma" || nav.map === "beta" && enemyCount < 3) ? "ultra::" : "") + ((nav.map === "beta" && enemyCount > 3 || nav.map === "alpha" && enemyCount < 3) ? "hyper::" : "") + target.name;
        if ((nav.map === "beta" || nav.map === "gamma") && (target.name === "magmius" || target.name=== "zavientos" || target.name=== "vortex")) ship.x4();
        else  ship.x2();
    
        ship.attack();

        if (await kite(target)) {
            enemyCount--;
            killedCount++;
        }
        else {
            console.log(`Let mid health for ${enemyCount} ${alienName}`);
        }
    }
    
    switchConfig("speed");
}


export async function kite(target: Alien) {
    const kitePos = nav.screenCenter.set(545, 0).rotate(-Math.PI/6).add(nav.screenCenter);

    const aimOffset = new Vector(64, 64);

    switch (target.name) {
        case "zavientos": aimOffset.set(90, 90); break;
        case "magmius": aimOffset.set(90, 90); break;
        case "xeon": aimOffset.set(90, 90); break;
    }

    if (!ship.aim) return false;

    ship.aim.add(aimOffset);

    const assureAttack = setInterval(() => ship.attack(), 3000);

    while (ship.aim && ship.healthLevel > 30) {
        if (ship.healthLevel < 50 && ship.shieldLevel > 60) keyTap("q");
        if (ship.healthLevel < 80) keyTap("v");

        if (ship.pos.x < 3) xsens = false;
        else if (ship.pos.x > nav.botRight.x - 3) xsens = true;
        if (ship.pos.y < 3) ysens = false;
        else if (ship.pos.y > nav.botRight.y - 3) ysens = true;


        const desiredEnemyPosition = new Vector(xsens ? kitePos.x : 1920 - kitePos.x, ysens ? 1080 - kitePos.y : kitePos.y);

        ship.aim.add(aimOffset);

        const delta = desiredEnemyPosition.clone.sub(ship.aim).mul(-1);
        
        const diff = ship.aim.pointDistance(desiredEnemyPosition);

        diff > 500 ? switchConfig("speed") : switchConfig("tank");

        delta.setNorme(Math.min(5, diff / 50 * (target.speed / ship.speed * 2.2)**2));
        
        delta.set(Math[xsens ? "min" : "max"](0, delta.x), Math[ysens ? "min" : "max"](0, delta.y))

        await nav.moveBy(delta);
    }

    clearInterval(assureAttack);

    if (ship.aim) {
        keyTap("control");
        return false;
    }

    return true;
}