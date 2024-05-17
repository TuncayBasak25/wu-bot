import Vector, { Point } from "./vector";

export class Box {
    start = new Vector();
    end = new Vector();

    constructor(startX: number,startY: number, endX: number, endY: number) {
        this.start.set(startX, startY);
        this.end.set(endX, endY);
    }

    public isInside(x: number, y: number): boolean;
    public isInside(vector: Point): boolean;
    public isInside(a: number | Point, b?: number) {
        const [x, y]: [x: number, y: number] = Vector.numberOrVector(a, b);

        return x >= this.start.x && y >= this.start.y && x <= this.end.x && y <= this.end.y;
    }
}