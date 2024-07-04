import { BaseCanvas } from "./BaseCanvas";

export interface CanvasOptions {
  width?: number;
  height?: number;
  styles?: any;
}

const CANVAS_DEFAULT_STYLES = {}

export class Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  width: number
  height: number

  style: any;
  constructor(canvas: HTMLCanvasElement, options: CanvasOptions) {
    this.canvas = canvas ? canvas : document.createElement('canvas');
    this.width = options.width || 800;
    this.height = options.height || 600;

    this.ctx = this.canvas.getContext('2d');
  }
}