import { attackKite } from "../action/kite";
import { nav } from "../nav";
import { switchConfig } from "../param/config";
import { killJumpUntil } from "./stage";


export async function alpha() {
    await nav.starMission("alpha");
    
    await killJumpUntil("bangoliour");
    await attackKite(20);
    
    await killJumpUntil("zavientos");
    
    await attackKite(10);
    await killJumpUntil("magmius");
    
    await attackKite(5);
    await killJumpUntil("bangoliour");
    
    await attackKite(9);
    await killJumpUntil("bangoliour", "xeon");
    
    await attackKite(8);
    await killJumpUntil();
    
    await switchConfig("speed");
}