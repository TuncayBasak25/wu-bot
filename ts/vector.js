"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Vector {
    constructor(x = 0, y = 0) {
        this.$x = x;
        this.$y = y;
    }
    setToInteger() {
        Object.defineProperty(this, 'x', { get: () => Math.round(this.$x) });
        Object.defineProperty(this, 'y', { get: () => Math.round(this.$y) });
        return this;
    }
    get x() {
        return this.$x;
    }
    get y() {
        return this.$y;
    }
    get xy() {
        return [this.$x, this.$y];
    }
    setX(x) {
        this.$x = x;
        return this;
    }
    setY(y) {
        this.$y = y;
        return this;
    }
    set(a, b) {
        const [x, y] = Vector.numberOrVector(a, b);
        if (this.x === x && this.y === y)
            return this;
        this.setX(x);
        this.setY(y);
        return this;
    }
    get clone() {
        return new Vector(this.x, this.y);
    }
    static numberOrVector(numberOrVector, numberOrUndefined) {
        if (typeof numberOrVector === 'number' && typeof numberOrUndefined === 'number') {
            return [numberOrVector, numberOrUndefined];
        }
        if (typeof (numberOrVector === null || numberOrVector === void 0 ? void 0 : numberOrVector.x) === 'number' && typeof (numberOrVector === null || numberOrVector === void 0 ? void 0 : numberOrVector.y) === 'number') {
            return [numberOrVector.x, numberOrVector.y];
        }
        throw new Error('Expected Vector or ({ x, y }) or (number, number) expected!');
    }
    static consumeNumberOrVectorArray(args) {
        const a = args.shift();
        if (!a) {
            throw new Error("Unvalid number of arguments!");
        }
        if (a instanceof Vector)
            return [a.x, a.y];
        const b = args.shift();
        if (!b) {
            throw new Error("Unvalid number of arguments!");
        }
        if (typeof b !== "number") {
            throw new Error(`Unvalid arguments for vector member provided ${typeof a}`);
        }
        return [a, b];
    }
    isEqual(a, b) {
        const [x, y] = Vector.numberOrVector(a, b);
        return (this.x === x) && (this.y === y);
    }
    isNull() {
        return (this.x === 0) && (this.y === 0);
    }
    pointDistance(a, b) {
        const [x, y] = Vector.numberOrVector(a, b);
        return ((this.x - x) ** 2 + (this.y - y) ** 2) ** 0.5;
    }
    pointDirection(a, b) {
        const [x, y] = Vector.numberOrVector(a, b);
        return Math.atan2(y - this.y, x - this.x);
    }
    floor() {
        this.setX(Math.floor(this.x));
        this.setY(Math.floor(this.y));
        return this;
    }
    ceil() {
        this.setX(Math.ceil(this.x));
        this.setY(Math.ceil(this.y));
        return this;
    }
    round() {
        this.setX(Math.round(this.x));
        this.setY(Math.round(this.y));
        return this;
    }
    roundTo(value) {
        this.setX(Math.round(this.x / value) * value);
        this.setY(Math.round(this.y / value) * value);
        return this;
    }
    minValue() {
        return Math.min(this.x, this.y);
    }
    maxValue() {
        return Math.max(this.x, this.y);
    }
    //Methods relating direction and norme
    rotate(angle) {
        if (!angle) {
            return this;
        }
        this.setDirection(this.direction + angle);
        return this;
    }
    rotateOver(origin, angle) {
        if (!angle) {
            return this;
        }
        this.sub(origin);
        this.rotate(angle);
        this.add(origin);
        return this;
    }
    scale(val) {
        if (val === 1) {
            return this;
        }
        this.setNorme(this.norme * val);
        return this;
    }
    scalar(other) {
        other = other || this;
        return (this.x * other.x + this.y * other.y);
    }
    get norme() {
        return (this.x ** 2 + this.y ** 2) ** 0.5;
    }
    setNorme(newNorme) {
        const { norme } = this;
        if (norme === newNorme) {
            return this;
        }
        if (norme === 0) {
            this.setX(newNorme);
            return this;
        }
        this.mul(newNorme / norme);
        return this;
    }
    get direction() {
        return Math.atan2(this.y, this.x);
    }
    setDirection(angle) {
        const { norme } = this;
        if (!angle) {
            return this;
        }
        this.setX(Math.cos(angle) * norme);
        this.setY(Math.sin(angle) * norme);
        return this;
    }
    //Basic math operations
    addX(val) {
        if (!val)
            return this;
        return this.setX(this.x + val);
    }
    addY(val) {
        if (!val)
            return this;
        return this.setY(this.y + val);
    }
    subX(val) {
        if (!val)
            return this;
        return this.setX(this.x - val);
    }
    subY(val) {
        if (!val)
            return this;
        return this.setY(this.y - val);
    }
    mulX(val) {
        if (val === 1)
            return this;
        return this.setX(this.x * val);
    }
    mulY(val) {
        if (val === 1)
            return this;
        return this.setY(this.y * val);
    }
    divX(val) {
        if (val === 1)
            return this;
        return this.setX(this.x / val);
    }
    divY(val) {
        if (val === 1)
            return this;
        return this.setY(this.y / val);
    }
    add(a, b) {
        const [x, y] = Vector.numberOrVector(a, b);
        if (!x && !y)
            return this;
        this.setX(this.x + x);
        this.setY(this.y + y);
        return this;
    }
    sub(a, b) {
        const [x, y] = Vector.numberOrVector(a, b);
        if (!x && !y)
            return this;
        this.setX(this.x - x);
        this.setY(this.y - y);
        return this;
    }
    mul(factorOrVector) {
        if (typeof factorOrVector === 'number') {
            if (factorOrVector === 1)
                return this;
            this.setX(this.x * factorOrVector);
            this.setY(this.y * factorOrVector);
        }
        else {
            this.setX((this.x * factorOrVector.x) - (this.y * factorOrVector.y));
            this.setY((this.x * factorOrVector.y) + (this.y * factorOrVector.x));
        }
        return this;
    }
    div(factorOrVector) {
        if (typeof factorOrVector === 'number') {
            if (factorOrVector === 1)
                return this;
            this.setX(this.x / factorOrVector);
            this.setY(this.y / factorOrVector);
        }
        else {
            this.setX((this.x / factorOrVector.x) - (this.y / factorOrVector.y));
            this.setY((this.x / factorOrVector.y) + (this.y / factorOrVector.x));
        }
        return this;
    }
    mulXY(x, y) {
        this.mulX(x).mulY(y);
        return this;
    }
    divXY(x, y) {
        this.divX(x).divY(y);
        return this;
    }
    insideBox(...args) {
        const [minX, minY] = Vector.consumeNumberOrVectorArray(args);
        const [maxX, maxY] = Vector.consumeNumberOrVectorArray(args);
        return this.x >= minX && this.x <= maxX && this.y >= minY && this.y <= maxY;
    }
}
exports.default = Vector;
