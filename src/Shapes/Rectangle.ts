import { Shape, ShapeStyle } from './Shape';

interface RectangleOptions {
  x?: number;
  y?: number;
  width: number;
  height: number;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
  style?: ShapeStyle;
  cornerRadius?: number;
}

export class Rectangle extends Shape {
  private width: number;
  private height: number;
  private cornerRadius: number;

  constructor(options: RectangleOptions) {
    super({
      x: options.x,
      y: options.y,
      rotation: options.rotation,
      scaleX: options.scaleX,
      scaleY: options.scaleY,
      style: options.style,
    });

    this.width = options.width;
    this.height = options.height;
    this.cornerRadius = options.cornerRadius ?? 0;
  }

  /**
   * Draw the rectangle
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    
    // Apply transformations
    this.applyTransform(ctx);
    
    // Apply styles
    this.applyStyle(ctx);

    if (this.cornerRadius > 0) {
      this.drawRoundedRect(ctx);
    } else {
      // Draw rectangle path
      ctx.beginPath();
      ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
      ctx.closePath();
    }

    // Fill and stroke
    if (this.style.fill) {
      ctx.fill();
    }
    if (this.style.stroke) {
      ctx.stroke();
    }

    ctx.restore();
  }

  /**
   * Draw rounded rectangle
   */
  private drawRoundedRect(ctx: CanvasRenderingContext2D): void {
    const x = -this.width / 2;
    const y = -this.height / 2;
    const width = this.width;
    const height = this.height;
    const radius = Math.min(this.cornerRadius, Math.min(width / 2, height / 2));

    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
  }

  /**
   * Check if a point is inside the rectangle
   */
  public containsPoint(x: number, y: number): boolean {
    // Transform the point to local coordinates
    const localX = x - this.x;
    const localY = y - this.y;
    
    // Rotate the point if needed
    let testX = localX;
    let testY = localY;
    
    if (this.rotation !== 0) {
      const cos = Math.cos(-this.rotation);
      const sin = Math.sin(-this.rotation);
      testX = localX * cos - localY * sin;
      testY = localX * sin + localY * cos;
    }

    // Scale the point
    testX /= this.scaleX;
    testY /= this.scaleY;

    // Check if the point is inside the rectangle
    return (
      testX >= -this.width / 2 &&
      testX <= this.width / 2 &&
      testY >= -this.height / 2 &&
      testY <= this.height / 2
    );
  }

  /**
   * Get the bounding box of the rectangle
   */
  public getBounds(): { x: number; y: number; width: number; height: number } {
    // For simplicity, return the bounds without considering rotation
    return {
      x: this.x - (this.width * this.scaleX) / 2,
      y: this.y - (this.height * this.scaleY) / 2,
      width: this.width * this.scaleX,
      height: this.height * this.scaleY,
    };
  }

  // Getters and setters
  public setSize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  public setCornerRadius(radius: number): void {
    this.cornerRadius = radius;
  }

  public getSize(): { width: number; height: number } {
    return {
      width: this.width,
      height: this.height,
    };
  }
}
