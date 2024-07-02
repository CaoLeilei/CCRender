
export interface BaseCanvasOptions {
  width: number;
  height: number;
}

export class BaseCanvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  constructor(canvas: HTMLCanvasElement, options: BaseCanvasOptions) {
    this.canvas = canvas ? canvas : document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
  }
}