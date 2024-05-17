"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.when = exports.until = exports.sleep = void 0;
function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}
exports.sleep = sleep;
function until(conditionFunction, maxTime = Infinity) {
    return __awaiter(this, void 0, void 0, function* () {
        const start = Date.now();
        while (!conditionFunction()) {
            if (Date.now() - start > maxTime)
                break;
            yield sleep(0);
        }
    });
}
exports.until = until;
function when(conditionFunction, maxTime = Infinity) {
    return __awaiter(this, void 0, void 0, function* () {
        const start = Date.now();
        while (conditionFunction()) {
            if (Date.now() - start > maxTime)
                break;
            yield sleep(0);
        }
    });
}
exports.when = when;
