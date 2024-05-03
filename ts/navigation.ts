import robot, { moveMouse } from "../robotjs";

enum WindowState {
    COMBAT,
    MENU,
    MINIMAP
}


export class Navigation {
    private static windowState = WindowState.COMBAT;

    static combat() {
        if (this.windowState != WindowState.COMBAT) robot.keyTap("escape");
    }

    static menu() {
        if (this.windowState != WindowState.COMBAT) robot.keyTap("escape");

        robot.moveMouse(1860, 260);
        robot.mouseClick();
    }

    static minimap() {
        if (this.windowState != WindowState.COMBAT) robot.keyTap("escape");

        robot.moveMouse(1800, 125);
        robot.mouseClick();
    }
}