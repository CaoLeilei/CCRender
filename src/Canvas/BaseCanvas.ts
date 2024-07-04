
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

  /**
   * 返回当前canvas对象中的ctx，用于外面内容的绘制
   * @returns
   */
  getCxt(): CanvasRenderingContext2D | null {
    return this.ctx;
  }

  render() {
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  renderAll() {
    this.render();
  }

  clearAll() {}
}