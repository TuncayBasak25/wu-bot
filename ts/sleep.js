"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}
exports.sleep = sleep;
