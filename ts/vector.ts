export type Point = {
    x: number,
    y: number
}

export default class Vector {
    protected $x: number;
    protected $y: number;


    public constructor(x: number = 0, y: number = 0) {
        this.$x = x;
        this.$y = y;
    }

    public setToInteger(): this {
        Object.defineProperty(this, 'x', { get: () => Math.round(this.$x) });
        Object.defineProperty(this, 'y', { get: () => Math.round(this.$y) });

        return this;
    }

    public get x(): number {
        return this.$x;
    }
    public get y(): number {
        return this.$y;
    }
    public get xy(): [number, number] {
        return [this.$x, this.$y];
    }

    public setX(x: number): this {
        this.$x = x;
        return this;
    }

    public setY(y: number): this {
        this.$y = y;
        return this;
    }

    public set(x: number, y: number): this;
    public set(vector: Point): this
    public set(a: number | Point, b?: number): this {
        const [x, y]: [x: number, y: number] = Vector.numberOrVector(a, b);

        if (this.x === x && this.y === y) return this;

        this.setX(x);
        this.setY(y);

        return this;
    }

    public clone(): Vector {
        return new Vector(this.x, this.y);
    }



    /**
     * Use this to convert { x: number, y: number } or (number, number) to [x: number, y: number].
     * @param {Point} { x, y }
     * @param numberOrUndefined 
     * @returns [x: number, y: number]
     */


    public static numberOrVector(numberOrVector: number | Point, numberOrUndefined?: number): [number, number] {
        if (typeof numberOrVector === 'number' && typeof numberOrUndefined === 'number') {
            return [numberOrVector, numberOrUndefined];
        }
        if (typeof (numberOrVector as Point)?.x === 'number' && typeof (numberOrVector as Point)?.y === 'number') {
            return [(numberOrVector as Point).x, (numberOrVector as Point).y];
        }
        throw new Error('Expected Vector or ({ x, y }) or (number, number) expected!');
    }


    //Methods that returns a scalar or boolean value
    public isEqual(x: number, y: number): boolean;
    public isEqual(vector: Point): boolean;
    public isEqual(a: number | Point, b?: number): boolean {
        const [x, y]: [x: number, y: number] = Vector.numberOrVector(a, b);
        return (this.x === x) && (this.y === y);
    }

    public isNull(): boolean {
        return (this.x === 0) && (this.y === 0);
    }

    public pointDistance(x: number, y: number): number;
    public pointDistance(vector: Point): number;
    public pointDistance(a: number | Point, b?: number): number {
        const [x, y]: [x: number, y: number] = Vector.numberOrVector(a, b);
        return ((this.x - x) ** 2 + (this.y - y) ** 2) ** 0.5;
    }

    public pointDirection(x: number, y: number): number;
    public pointDirection(vector: Point): number;
    public pointDirection(a: number | Point, b?: number): number {
        const [x, y]: [x: number, y: number] = Vector.numberOrVector(a, b);
        return Math.atan2(y - this.y, x - this.x);
    }

    public floor(): this {
        this.setX(Math.floor(this.x));
        this.setY(Math.floor(this.y));

        return this;
    }

    public ceil(): this {
        this.setX(Math.ceil(this.x));
        this.setY(Math.ceil(this.y));

        return this;
    }

    public round(): this {
        this.setX(Math.round(this.x));
        this.setY(Math.round(this.y));

        return this;
    }

    public roundTo(value: number): this {
        this.setX(Math.round(this.x / value) * value);
        this.setY(Math.round(this.y / value) * value);

        return this;
    }

    public minValue(): number {
        return Math.min(this.x, this.y);
    }

    public maxValue(): number {
        return Math.max(this.x, this.y);
    }







    //Methods relating direction and norme

    public rotate(angle: number): this {
        if (!angle) {
            return this;
        }
        this.setDirection(this.direction + angle);
        return this;
    }

    public rotateOver(origin: Point, angle: number): this {
        if (!angle) {
            return this;
        }
        this.sub(origin);
        this.rotate(angle);
        this.add(origin);
        return this;
    }

    public scale(val: number): this {
        if (val === 1) {
            return this;
        }
        this.setNorme(this.norme * val);
        return this;
    }

    public scalar(other?: Point): number {
        other = other || this;
        return (this.x * other.x + this.y * other.y);
    }

    public get norme(): number {
        return (this.x ** 2 + this.y ** 2) ** 0.5;
    }

    public setNorme(newNorme: number): this {
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

    public get direction(): number {
        return Math.atan2(this.y, this.x);
    }

    public setDirection(angle: number): this {
        const { norme } = this;
        if (!angle) {
            return this;
        }

        this.setX(Math.cos(angle) * norme);
        this.setY(Math.sin(angle) * norme);

        return this;
    }




    //Basic math operations

    public addX(val: number): this {
        if (!val) return this;

        return this.setX(this.x + val)
    }
    public addY(val: number): this {
        if (!val) return this;
        return this.setY(this.y + val)

    }

    public subX(val: number): this {
        if (!val) return this;

        return this.setX(this.x - val)
    }
    public subY(val: number): this {
        if (!val) return this;

        return this.setY(this.y - val)
    }

    public mulX(val: number): this {
        if (val === 1) return this;

        return this.setX(this.x * val)
    }
    public mulY(val: number): this {
        if (val === 1) return this;

        return this.setY(this.y * val)
    }

    public divX(val: number): this {
        if (val === 1) return this;

        return this.setX(this.x / val)
    }
    public divY(val: number): this {
        if (val === 1) return this;

        return this.setY(this.y / val)
    }


    public add(x: number, y: number): this;
    public add(vector: Point): this;
    public add(a: number | Point, b?: number): this {
        const [x, y]: [x: number, y: number] = Vector.numberOrVector(a, b);

        if (!x && !y) return this;
        this.setX(this.x + x);
        this.setY(this.y + y);

        return this;
    }

    public sub(x: number, y: number): this;
    public sub(vector: Point): this;
    public sub(a: number | Point, b?: number): this {
        const [x, y]: [x: number, y: number] = Vector.numberOrVector(a, b);

        if (!x && !y) return this;
        this.setX(this.x - x);
        this.setY(this.y - y);

        return this;
    }

    public mul(factor: number): this;
    public mul(vector: Point): this; //Complex number multiplication
    public mul(factorOrVector: number | Point): this {
        if (typeof factorOrVector === 'number') {
            if (factorOrVector === 1) return this;
            this.setX(this.x * factorOrVector);
            this.setY(this.y * factorOrVector);
        }
        else {
            this.setX((this.x * factorOrVector.x) - (this.y * factorOrVector.y));
            this.setY((this.x * factorOrVector.y) + (this.y * factorOrVector.x));
        }

        return this;
    }

    public div(factor: number): this;
    public div(vector: Point): this; //Complex number division
    public div(factorOrVector: number | Point): this {
        if (typeof factorOrVector === 'number') {
            if (factorOrVector === 1) return this;
            this.setX(this.x / factorOrVector);
            this.setY(this.y / factorOrVector);
        }
        else {
            this.setX((this.x / factorOrVector.x) - (this.y / factorOrVector.y));
            this.setY((this.x / factorOrVector.y) + (this.y / factorOrVector.x));
        }

        return this;
    }

    public mulXY({ x, y }: Point): this {
        this.mulX(x).mulY(y);
        return this;
    }

    public divXY({ x, y }: Point): this {
        this.divX(x).divY(y);
        return this;
    }
}