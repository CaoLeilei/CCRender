/**
 * Base shape interface for common properties
 */
export interface ShapeStyle {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
}

/**
 * Base shape class that all other shapes inherit from
 */
export abstract class Shape {
  protected x: number = 0;
  protected y: number = 0;
  protected rotation: number = 0;
  protected scaleX: number = 1;
  protected scaleY: number = 1;
  protected style: ShapeStyle;

  constructor(options: {
    x?: number;
    y?: number;
    rotation?: number;
    scaleX?: number;
    scaleY?: number;
    style?: ShapeStyle;
  } = {}) {
    this.x = options.x ?? 0;
    this.y = options.y ?? 0;
    this.rotation = options.rotation ?? 0;
    this.scaleX = options.scaleX ?? 1;
    this.scaleY = options.scaleY ?? 1;
    this.style = options.style ?? {};
  }

  /**
   * Apply transformations to the context
   */
  protected applyTransform(ctx: CanvasRenderingContext2D): void {
    ctx.translate(this.x, this.y);
    if (this.rotation !== 0) {
      ctx.rotate(this.rotation);
    }
    if (this.scaleX !== 1 || this.scaleY !== 1) {
      ctx.scale(this.scaleX, this.scaleY);
    }
  }

  /**
   * Apply style properties to the context
   */
  protected applyStyle(ctx: CanvasRenderingContext2D): void {
    const {
      fill,
      stroke,
      strokeWidth,
      opacity,
      shadowColor,
      shadowBlur,
      shadowOffsetX,
      shadowOffsetY
    } = this.style;

    ctx.globalAlpha = opacity ?? 1;
    
    if (shadowColor) {
      ctx.shadowColor = shadowColor;
      ctx.shadowBlur = shadowBlur ?? 0;
      ctx.shadowOffsetX = shadowOffsetX ?? 0;
      ctx.shadowOffsetY = shadowOffsetY ?? 0;
    }

    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = strokeWidth ?? 1;
    }

    if (fill) {
      ctx.fillStyle = fill;
    }
  }

  /**
   * Draw the shape
   * This method should be implemented by all shape classes
   */
  abstract draw(ctx: CanvasRenderingContext2D): void;

  /**
   * Check if a point is inside the shape
   * This method should be implemented by all shape classes
   */
  abstract containsPoint(x: number, y: number): boolean;

  /**
   * Get bounding box of the shape
   * This method should be implemented by all shape classes
   */
  abstract getBounds(): { x: number; y: number; width: number; height: number };

  // Getters and setters for properties
  public setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  public setRotation(angle: number): void {
    this.rotation = angle;
  }

  public setScale(x: number, y: number): void {
    this.scaleX = x;
    this.scaleY = y;
  }

  public setStyle(style: Partial<ShapeStyle>): void {
    this.style = { ...this.style, ...style };
  }

  public getPosition(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }
}
