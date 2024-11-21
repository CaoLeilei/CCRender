import { EventEmitter } from '../Events/EventEmitter';
import { Shape } from '../Shapes/Shape';

export interface LayerOptions {
  id?: string;
  visible?: boolean;
  opacity?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export class Layer extends EventEmitter {
  protected id: string;
  protected visible: boolean;
  protected opacity: number;
  protected x: number;
  protected y: number;
  protected width: number;
  protected height: number;
  protected shapes: Shape[] = [];

  constructor(options: LayerOptions = {}) {
    super();
    this.id = options.id ?? Math.random().toString(36).substr(2, 9);
    this.visible = options.visible ?? true;
    this.opacity = options.opacity ?? 1;
    this.x = options.x ?? 0;
    this.y = options.y ?? 0;
    this.width = options.width ?? 0;
    this.height = options.height ?? 0;
  }

  /**
   * Add a shape to the layer
   */
  public add(shape: Shape): void {
    this.shapes.push(shape);
    this.emit('shapeadded', { shape });
  }

  /**
   * Remove a shape from the layer
   */
  public remove(shape: Shape): void {
    const index = this.shapes.indexOf(shape);
    if (index !== -1) {
      this.shapes.splice(index, 1);
      this.emit('shaperemoved', { shape });
    }
  }

  /**
   * Draw the layer and its shapes
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    if (!this.visible) return;

    ctx.save();
    
    // Apply layer transformations
    ctx.translate(this.x, this.y);
    ctx.globalAlpha = this.opacity;

    // Draw all shapes in the layer
    for (const shape of this.shapes) {
      shape.draw(ctx);
    }

    ctx.restore();
  }

  /**
   * Find shape at point
   */
  public getShapeAtPoint(x: number, y: number): Shape | null {
    if (!this.visible) return null;

    // Adjust coordinates for layer position
    const localX = x - this.x;
    const localY = y - this.y;

    // Search in reverse order (top to bottom)
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i];
      if (shape.containsPoint(localX, localY)) {
        return shape;
      }
    }
    return null;
  }

  // Getters and setters
  public getId(): string {
    return this.id;
  }

  public setVisible(visible: boolean): void {
    this.visible = visible;
    this.emit('visibilitychange', { visible });
  }

  public isVisible(): boolean {
    return this.visible;
  }

  public setOpacity(opacity: number): void {
    this.opacity = Math.max(0, Math.min(1, opacity));
    this.emit('opacitychange', { opacity: this.opacity });
  }

  public getOpacity(): number {
    return this.opacity;
  }

  public setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.emit('positionchange', { x, y });
  }

  public getPosition(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  public setSize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.emit('sizechange', { width, height });
  }

  public getSize(): { width: number; height: number } {
    return { width: this.width, height: this.height };
  }

  public getShapes(): Shape[] {
    return [...this.shapes];
  }

  public clear(): void {
    this.shapes = [];
    this.emit('clear');
  }
}
