export interface Bitmap {
  width: number
  height: number
  image: any
  byteWidth: number
  bitsPerPixel: number
  bytesPerPixel: number
  colorAt(x: number, y: number): string
}

export interface Screen {
  capture(x?: number, y?: number, width?: number, height?: number): Bitmap
}

export function setKeyboardDelay(ms: number) : void
export function keyTap(key: string, modifier?: string | string[]) : void
export function keyToggle(key: string, down: string, modifier?: string | string[]) : void
export function typeString(string: string) : void
export function typeStringDelayed(string: string, cpm: number) : void
export function setMouseDelay(delay: number) : void
export function updateScreenMetrics() : void
export function moveMouse(x: number, y: number) : void
export function moveMouseSmooth(x: number, y: number,speed?:number) : void
export function mouseClick(button?: string, double?: boolean) : void
export function mouseToggle(down?: string, button?: string) : void
export function dragMouse(x: number, y: number) : void
export function scrollMouse(x: number, y: number) : void
export function getMousePos(): { x: number, y: number }
export function getPixelColor(x: number, y: number): string
export function findColor(color:  number, origin_x: number, origin_y: number, width: number, height: number): {x: number, y: number}
export function scanColors(origin_x: number, origin_y: number, width: number, height: number, ...colors: number[]): any
export function screenScan(left: number, top: number, right: number, bot: number, ...query: number[]): any
export function test(...args: any[]): any
export function getScreenSize(): { width: number, height: number }

export var screen: Screen
