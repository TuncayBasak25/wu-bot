import { mouseClick, moveMouse } from "../../robotjs";
import Vector from "./vector";

class Mouse {

    move(x: number, y: number): void;
    move(target: Vector): void;
    move(a: Vector | number, b?: number) {
        const [x, y] = Vector.numberOrVector(a, b);

        moveMouse(x, y);
    }

    click(x: number, y: number): void;
    click(target: Vector): void;
    click(a: Vector | number, b?: number) {
        const [x, y] = Vector.numberOrVector(a, b);

        moveMouse(x, y);
        mouseClick("left");
    }
}

export const mouse = new Mouse();