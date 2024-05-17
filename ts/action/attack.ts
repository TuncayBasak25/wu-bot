import { keyTap } from "../../robotjs";
import { Alien, AlienName, AlienNameList } from "../alien";
import { nav } from "../nav";
import { switchConfig } from "../param/config";
import { hud } from "../param/hud";
import { ship } from "../ship";
import { mouse } from "../util/mouse";
import { sleep, until, when } from "../util/sleep";
import Vector from "../util/vector";






export async function attack(targetCount: number, ...targetNameList: AlienName[]) {
    hud.hide();
    switchConfig("tank");

    if (targetNameList.length === 0) targetNameList = AlienNameList;

    while (targetCount > 0) {
        if (ship.shieldLevel < 30) {
            switchConfig("speed");
            await hud.show();

            const velocity = new Vector(ship.pos.x <= nav.center.x ? 5 : -5, ship.pos.y <= nav.center.y ? 5 : -5);

            let count = 0;
            while (Alien.one()) {
                count++;
                await nav.moveBy(velocity);
            }

            while (count-- > 0) await nav.moveBy(velocity);

            switchConfig("tank");
            await hud.hide();
        }
        while (!ship.aim) {
            await when(() => !Alien.one(...targetNameList));
            mouse.click(nav.screenCenter.nearestPoint(...Alien.all(...targetNameList).map(a => a.pos)));

            await when(() => !ship.aim, 2000);
        }

        await sleep(100);

        ship.attack();

        await until(() => !ship.aim);
        

        targetCount--;
    }

    hud.show();
    switchConfig("speed");
}