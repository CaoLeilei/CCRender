import { Shape } from '../Shapes/Shape';

export interface Point {
  x: number;
  y: number;
}

export interface MouseEventData {
  point: Point;
  target?: Shape;
  nativeEvent: MouseEvent;
}

export interface TouchEventData {
  points: Point[];
  targets: Shape[];
  nativeEvent: TouchEvent;
}

export interface DragEventData extends MouseEventData {
  dragStart: Point;
  dragDelta: Point;
}

export interface WheelEventData extends MouseEventData {
  deltaX: number;
  deltaY: number;
  deltaZ: number;
}

export enum EventTypes {
  // Mouse Events
  MOUSE_DOWN = 'mousedown',
  MOUSE_MOVE = 'mousemove',
  MOUSE_UP = 'mouseup',
  MOUSE_ENTER = 'mouseenter',
  MOUSE_LEAVE = 'mouseleave',
  CLICK = 'click',
  DOUBLE_CLICK = 'dblclick',
  
  // Touch Events
  TOUCH_START = 'touchstart',
  TOUCH_MOVE = 'touchmove',
  TOUCH_END = 'touchend',
  
  // Drag Events
  DRAG_START = 'dragstart',
  DRAG_MOVE = 'dragmove',
  DRAG_END = 'dragend',
  
  // Wheel Events
  WHEEL = 'wheel',
  
  // Shape Events
  SHAPE_ADDED = 'shapeadded',
  SHAPE_REMOVED = 'shaperemoved',
  SHAPE_MODIFIED = 'shapemodified',
  
  // Canvas Events
  CANVAS_RESIZE = 'canvasresize',
  
  // Render Events
  BEFORE_RENDER = 'beforerender',
  AFTER_RENDER = 'afterrender',
  
  // Animation Events
  ANIMATION_START = 'animationstart',
  ANIMATION_FRAME = 'animationframe',
  ANIMATION_END = 'animationend'
}
