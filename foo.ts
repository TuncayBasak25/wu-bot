export async function index(enemyCount = Infinity, maxIdle = 30000) {
    while (true) {
        hud.hide();
        switchConfig("tank");

        await when(() => Alien.list.length === 0, maxIdle);

        if (Alien.list.length === 0) {
            switchConfig("speed");
            await hud.show();
            return;
        }

        const enemyDps = Alien.list.reduce((acc, cur) => acc + cur.damage * ship.promotion, 0); console.log(enemyDps);

        const enemyHealth = Alien.list[0].combinedHealth * ship.promotion; console.log(enemyHealth / ship.damage);


        const shield = ship.shield * 307000 / 100; console.log(shield / enemyDps * 2);


        //Time it takes to kill each other
        if (enemyHealth / ship.damage > shield / enemyDps * 2) {
            switchConfig("speed");
            await hud.show();
            nav.topLeft.pointDistance(ship.pos) > nav.botRight.pointDistance(ship.pos) ? nav.goto(nav.topLeft) : nav.goto(nav.botRight);

            await sleep(Alien.list[0].speed * 40);
            switchConfig("tank");
            await sleep(1000);

            await until(() => ship.shield > 75);

            mouse.click(nav.screenCenter.add(-75, 75));

            await when(() => Alien.list.length === 0, maxIdle);

            hud.hide();
        }

        mouse.click(Alien.list[0].pos);

        await when(() => !ship.aim, 1000);

        keyTap("control");

        await until(() => !ship.aim);

        enemyCount--;

        if (enemyCount === 0) {
            switchConfig("speed");
            await hud.show();
            return;
        }
    }
}