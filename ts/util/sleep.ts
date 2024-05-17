export function sleep(ms: number) {
    return new Promise(r => setTimeout(r, ms));
}


export async function until(conditionFunction: () => boolean, maxTime: number = Infinity) {
    const start = Date.now();
    while (!conditionFunction()) {
        if (Date.now() - start > maxTime) break;
        await sleep(0);
    }
}

export async function when(conditionFunction: () => boolean, maxTime: number = Infinity) {
    const start = Date.now();
    while (conditionFunction()) {
        if (Date.now() - start > maxTime) break;
        await sleep(0);
    }
}

export async function doWhile(actionFunction: () => Promise<void>, conditionFunction: () => boolean) {
    while (conditionFunction()) {
        await actionFunction();
    }
}