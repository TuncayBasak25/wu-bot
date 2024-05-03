"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navigation = void 0;
const robotjs_1 = __importDefault(require("../robotjs"));
var WindowState;
(function (WindowState) {
    WindowState[WindowState["COMBAT"] = 0] = "COMBAT";
    WindowState[WindowState["MENU"] = 1] = "MENU";
    WindowState[WindowState["MINIMAP"] = 2] = "MINIMAP";
})(WindowState || (WindowState = {}));
class Navigation {
    static combat() {
        if (this.windowState != WindowState.COMBAT)
            robotjs_1.default.keyTap("escape");
    }
    static menu() {
        if (this.windowState != WindowState.COMBAT)
            robotjs_1.default.keyTap("escape");
        robotjs_1.default.moveMouse(1860, 260);
        robotjs_1.default.mouseClick();
    }
    static minimap() {
        if (this.windowState != WindowState.COMBAT)
            robotjs_1.default.keyTap("escape");
        robotjs_1.default.moveMouse(1800, 125);
        robotjs_1.default.mouseClick();
    }
}
exports.Navigation = Navigation;
Navigation.windowState = WindowState.COMBAT;
