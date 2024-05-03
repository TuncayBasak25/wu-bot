import robot, { getMousePos, getPixelColor, findColor as getPx, keyTap, mouseClick, getMousePos as mousePos, moveMouse, scanColors, screenScan } from "../robotjs";
import { Navigation } from "./navigation";
import { getQueries } from "./query";
import { Ship } from "./ship";
import { sleep } from "./sleep";




async function main() {
        
    //showMouse();
    //await sleep(3000000);
    

    
    const ship = new Ship();
    ship.map = "u7";
    await ship.goto(12, 12);

    // await ship.alpha();

    // moveMouse(950, 1000);
    // mouseClick();
    // await sleep(1000);
    // moveMouse(460, 560);
    // mouseClick();
    // await sleep(1000);
    // moveMouse(1000, 800);
    // mouseClick();
    // await sleep(1000);
    // keyTap("escape");
    // await sleep(1000);
    // keyTap("escape");
    // await sleep(1000);

    // await ship.alpha();
    
    // await ship.kratos();

    //await ship.beta();
    
    //await ship.gamma();


}
main();



async function showMouse() {
    const last = getMousePos();
    while (true) {
        const pos = getMousePos();

        if (pos.x !== last.x || pos.y !== last.y) {
            console.log(`Mouse(${pos.x}, ${pos.y}): color(${getPixelColor(pos.x, pos.y)} : ${getPixelColor(pos.x + 1, pos.y)} : ${getPixelColor(pos.x + 2, pos.y)} : ${getPixelColor(pos.x + 3, pos.y)})`);


            last.x = pos.x;
            last.y = pos.y;
        }

        await sleep(500);
    }
}