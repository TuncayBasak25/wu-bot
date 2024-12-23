import { getPixelColor, keyTap } from "../robotjs";
import { alpha } from "./mission/alpha";
import { beta } from "./mission/beta";
import { gamma } from "./mission/gamma";
import { kratos } from "./mission/kratos";
import { nav } from "./nav";
import { mouse } from "./util/mouse";
import { sleep } from "./util/sleep";
import Vector from "./util/vector";

export async function waitColor(x: number, y: number, color: string, action: () => void = () => {}) {
	if (getPixelColor(x, y) == color)
		return;
	action();
	let count = 0;
	while (true) {
		if (getPixelColor(x, y) == color)
			break;
		await sleep(10);
		count++;
		if (count == 100)
		{
			action();
			count = 0;
		}
	}
}

export async function waitColorNot(x: number, y: number, color: string, action: () => void = () => {}) {
	if (getPixelColor(x, y) != color)
		return;
	action();
	let count = 0;
	while (true) {
		if (getPixelColor(x, y) != color)
			break;
		await sleep(10);
		count++;
		if (count == 100)
		{
			action();
			count = 0;
		}
	}
}

async function clickConfirm(x: number, y: number) {
	await waitColorNot(450, 260, "d4af37", () => mouse.click(x, y));
	await waitColor(450, 260, "d4af37", () => keyTap("escape"));
}

class gate {
	static alpha = new gate("effac3", new Vector(600, 300), alpha);
	static beta = new gate("effac5", new Vector(600, 350), beta);
	static gamma = new gate("effac7", new Vector(600, 380), gamma);
	static kratos = new gate("effac9", new Vector(600, 410), kratos);

	static async open() {
		await menu.open();
		await waitColor(950, 350, "effada", () => keyTap("f6"));
	}

	static async isOpen() {
		await waitColor(950, 350, "effada", () => {});
	}

	static async setClickCount(count: 1 | 2 | 5 | 10 | 50 | 100 | 250) {
		const index = [1, 2, 5, 10, 50, 100, 250].indexOf(count);
		if (index == -1)
			throw Error(`Idk how you pass a ${count} to a function that accepts only: 1 | 2 | 5 | 10 | 50 | 100 | 250`);
		await this.open();
		
		await waitColor(1480, 553, "3f5a86", () => mouse.click(1500, 540));
		await sleep(1000);
		mouse.click(1500, 630);
		await sleep(1000);
	}

	static async click() {
		await this.open();
		mouse.click(1200, 800);
		await this.isOpen();
	}

	static async clickGates() {
		mouse.click(nav.screenCenter);

		await this.setClickCount(10);
		while (true) {
			if (await this.alpha.isDouble())
				break;
			if (await this.beta.isDouble())
				break;
			if (await this.gamma.isDouble())
				break;
			if (await this.kratos.isDouble())
				break;
			await this.click();
		}
		await menu.close();
	}

	static async loopUntilKratos() {
		while (true) {
			if (await this.alpha.do())
				continue;
			if (await this.beta.do())
				continue;
			if (await this.gamma.do())
				continue;
			if (await this.kratos.do())
				continue;
			await this.clickGates();
		}
	}

	private constructor(readonly color: string, readonly buttonPos: Vector, readonly program: () => Promise<void>) {}

	async open() {
		await gate.open();
		await waitColor(1000, 400, this.color, () => mouse.click(this.buttonPos));
	}

	async do() {
		if (!await this.prepare())
			return false;
		await menu.close();
		await this.program();
		return true;
	}

	async prepare() {
		const readible = await this.isReadible();
		if (await this.isReady() && readible)
			return true;
		if (!readible)
			return false;
		await clickConfirm(1000, 800);
		await waitColor(1000, 400, this.color, () => {})
		return true;
	}

	async isReady() {
		await this.open();
		
		return getPixelColor(967, 831) == "48f5f3";
	}

	async isReadible() {
		await this.open();
		return getPixelColor(825, 800) == "002d5f";
	}

	async isDouble() {
		await this.open();
		return (await this.isReady() && await this.prepare());
	}
}

export class menu {
	static gate = gate;

	static async open() {
		await waitColor(450, 260, "d4af37", () => keyTap("f1"));
	}

	static async close() {
		await waitColorNot(450, 260, "d4af37", () => keyTap("escape"));
	}
}

async function buy(pack = 10) {
	await waitColor(450, 260, "effada", () => keyTap("f3"));
	await waitColor(605, 385, "133338", () => mouse.click(460, 420));
	await waitColor(700, 400, "fc5f63", () => mouse.click(750, 220));
	await waitColor(561, 796, "d12121", () => mouse.click(600, 700));
	while (pack-- > 0) {
		mouse.click(1400, 580);

		keyTap("enter");
		keyTap("enter");
	}

	keyTap("escape");

	await sleep(1000);
}
