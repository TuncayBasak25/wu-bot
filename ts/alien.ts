import Vector from "./util/vector";

export enum AlienHex {
    hydro = 0xaabbcc,
    jenta = 0xaabbcf,
    mali = 0xaabbd0,

    plairon = 0xaabbd1,
    xeon = 0xaabbd2,

    bangoliour = 0xaabbd3,

    zavientos = 0xaabbd4,
    magmius = 0xaabbd5,
    motron = 0xaabbd8,
    raider = 0xaabbdb,
    vortex = 0xaabbd9
}

export enum Promotion {
    normal = 1,
    hyper = 2,
    ultra = 4
}

export type AlienName = "hydro" | "jenta" | "mali" | "plairon" | "xeon" | "bangoliour" | "zavientos" | "magmius" | "motron" | "raider" | "vortex";
export const AlienNameList: AlienName[] = ["hydro", "jenta", "mali", "plairon", "xeon", "bangoliour", "zavientos", "magmius", "motron", "raider", "vortex"];

export class Alien {
    static get hydro() { return new Alien(0xaabbcc, "hydro", 800, 560, 200, 50);}
    static get jenta() { return new Alien(0xaabbcf, "jenta", 3000, 2100, 290, 150);}
    static get mali() { return new Alien(0xaabbd0, "mali", 7000, 4900, 290, 300);}
    static get plairon() { return new Alien(0xaabbd1, "plairon", 16000, 11200, 125, 400);}
    static get xeon() { return new Alien(0xaabbd2, "xeon", 100000, 70000, 175, 1100);}
    static get bangoliour() { return new Alien(0xaabbd3, "bangoliour", 48000, 33600, 290, 1000);}
    static get zavientos() { return new Alien(0xaabbd4, "zavientos", 192000, 134400, 200, 2000);}
    static get magmius() { return new Alien(0xaabbd5, "magmius", 384000, 268800, 220, 3500);}
    static get motron() { return new Alien(0xaabbd8, "motron", 64000, 44800, 30, 400);}
    static get raider() { return new Alien(0xaabbdb, "raider", 20000, 14000, 260, 600);}
    static get vortex() { return new Alien(0xaabbd9, "vortex", 45000, 31500, 420, 1000);}

    static enum = [
        () => Alien.hydro,
        () => Alien.jenta,
        () => Alien.mali,
        () => Alien.plairon,
        () => Alien.raider,
        () => Alien.vortex,
        () => Alien.bangoliour,
        () => Alien.motron,
        () => Alien.xeon,
        () => Alien.zavientos,
        () => Alien.magmius,
    ];

    readonly pos = new Vector();

    static list: Alien[] = []; 
    static all(...alienNameList: AlienName[]) {
        if (alienNameList.length === 0) alienNameList = AlienNameList;
        return Alien.list.filter(a => alienNameList.includes(a.name));
    }
    static one(...alienNameList: AlienName[]) {
        if (alienNameList.length === 0) alienNameList = AlienNameList;
        return Alien.all(...alienNameList)[0];
    }

    private constructor(
        public color: number,

        public name: AlienName,
        public health: number,
        public shield: number,
        public speed: number,
        public damage: number
    ) {};

    get combinedHealth() {
        return this.health + this.shield;
    }

    promote(promotion: Promotion): this {
        this.health *= promotion;
        this.shield *= promotion;
        this.damage *= promotion;

        return this;
    }
}
