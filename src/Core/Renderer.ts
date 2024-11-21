import { Canvas } from './Canvas';
import { Shape } from '../Shapes/Shape';

export class Renderer {
  private canvas: Canvas;
  private shapes: Shape[] = [];
  private animationFrameId: number | null = null;
  private isAnimating: boolean = false;

  constructor(canvasElement: HTMLCanvasElement | string) {
    this.canvas = new Canvas(canvasElement);
  }

  /**
   * Add a shape to the renderer
   */
  public add(shape: Shape): void {
    this.shapes.push(shape);
  }

  /**
   * Remove a shape from the renderer
   */
  public remove(shape: Shape): void {
    const index = this.shapes.indexOf(shape);
    if (index !== -1) {
      this.shapes.splice(index, 1);
    }
  }

  /**
   * Clear all shapes
   */
  public clear(): void {
    this.shapes = [];
    this.canvas.clear();
  }

  /**
   * Render all shapes
   */
  public render(): void {
    const ctx = this.canvas.getContext();
    
    // Clear the canvas
    this.canvas.clear();

    // Draw all shapes
    for (const shape of this.shapes) {
      shape.draw(ctx);
    }
  }

  /**
   * Start animation loop
   */
  public startAnimation(callback: (deltaTime: number) => void): void {
    if (this.isAnimating) return;

    this.isAnimating = true;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      if (!this.isAnimating) return;

      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Call the animation callback
      callback(deltaTime);

      // Render the frame
      this.render();

      // Schedule the next frame
      this.animationFrameId = requestAnimationFrame(animate);
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  /**
   * Stop animation loop
   */
  public stopAnimation(): void {
    this.isAnimating = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Find shape at point
   */
  public getShapeAtPoint(x: number, y: number): Shape | null {
    // Search in reverse order (top to bottom)
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i];
      if (shape.containsPoint(x, y)) {
        return shape;
      }
    }
    return null;
  }

  /**
   * Get canvas dimensions
   */
  public getDimensions(): { width: number; height: number } {
    return this.canvas.getDimensions();
  }

  /**
   * Set canvas dimensions
   */
  public setDimensions(width: number, height: number): void {
    this.canvas.setDimensions(width, height);
  }

  /**
   * Get all shapes
   */
  public getShapes(): Shape[] {
    return [...this.shapes];
  }
}
