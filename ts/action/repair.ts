import { switchConfig } from "../param/config";
import { ship } from "../ship";
import { until } from "../util/sleep";

export async function repair() {
    switchConfig("tank");

    await until(() => ship.shieldLevel === 100);

    await switchConfig("speed");

    await until(() => ship.healthLevel === 100);
}