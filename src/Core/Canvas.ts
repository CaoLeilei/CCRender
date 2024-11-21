/**
 * Canvas management class
 * Handles canvas context and basic settings
 */
export class Canvas {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private width: number = 800;
  private height: number = 600;
  private pixelRatio: number;

  constructor(canvas: HTMLCanvasElement | string) {
    if (typeof canvas === 'string') {
      const element = document.getElementById(canvas);
      if (!element || !(element instanceof HTMLCanvasElement)) {
        throw new Error('Canvas element not found');
      }
      this.canvas = element;
    } else {
      this.canvas = canvas;
    }

    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get 2D context');
    }
    this.context = ctx;

    // Setup pixel ratio for high DPI displays
    this.pixelRatio = window.devicePixelRatio || 1;
    this.updateSize();

    // Handle resize
    window.addEventListener('resize', () => this.updateSize());
  }

  /**
   * Update canvas size based on display size and pixel ratio
   */
  private updateSize(): void {
    const displayWidth = Math.floor(this.canvas.clientWidth * this.pixelRatio);
    const displayHeight = Math.floor(this.canvas.clientHeight * this.pixelRatio);

    if (this.canvas.width !== displayWidth || this.canvas.height !== displayHeight) {
      this.canvas.width = displayWidth;
      this.canvas.height = displayHeight;
      this.width = displayWidth;
      this.height = displayHeight;

      // Scale context to account for pixel ratio
      this.context.scale(this.pixelRatio, this.pixelRatio);
    }
  }

  /**
   * Clear the entire canvas
   */
  public clear(): void {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  /**
   * Get the canvas rendering context
   */
  public getContext(): CanvasRenderingContext2D {
    return this.context;
  }

  /**
   * Get canvas dimensions
   */
  public getDimensions(): { width: number; height: number } {
    return {
      width: this.width / this.pixelRatio,
      height: this.height / this.pixelRatio
    };
  }

  /**
   * Set canvas dimensions
   */
  public setDimensions(width: number, height: number): void {
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.updateSize();
  }

  /**
   * Save the current canvas state
   */
  public save(): void {
    this.context.save();
  }

  /**
   * Restore the previous canvas state
   */
  public restore(): void {
    this.context.restore();
  }
}
