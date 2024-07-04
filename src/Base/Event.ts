/**
 * @description 事件基类，后面很多的组件都会继承这个类，该类包含有事件监听和触发
 */
export class Event {
  private listeners: { [key: string]: Function[] };
  constructor() {
    this.listeners = {};
  }
  /**
   * @description 添加事件监听
   * @param type 事件类型
   * @param listener 事件监听函数
   */
  public on(type: string, listener: Function) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
  }

  /**
   * @description 添加事件监听
   * @param type 事件类型
   * @param listener 事件监听函数
   */
  public once(type: string, listener: Function) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
  }

  public emit(type: string, ...args: any[]) {
    if (this.listeners[type]) {
      this.listeners[type].forEach((listener) => {
        listener.apply(this, args);
      });
    }
  }
}