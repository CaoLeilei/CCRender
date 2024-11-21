type EventCallback = (...args: any[]) => void;

export class EventEmitter {
  private events: Map<string, EventCallback[]> = new Map();

  /**
   * Add an event listener
   */
  public on(eventName: string, callback: EventCallback): void {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName)!.push(callback);
  }

  /**
   * Remove an event listener
   */
  public off(eventName: string, callback: EventCallback): void {
    if (!this.events.has(eventName)) return;

    const callbacks = this.events.get(eventName)!;
    const index = callbacks.indexOf(callback);
    if (index !== -1) {
      callbacks.splice(index, 1);
    }

    if (callbacks.length === 0) {
      this.events.delete(eventName);
    }
  }

  /**
   * Add a one-time event listener
   */
  public once(eventName: string, callback: EventCallback): void {
    const onceCallback = (...args: any[]) => {
      callback(...args);
      this.off(eventName, onceCallback);
    };
    this.on(eventName, onceCallback);
  }

  /**
   * Emit an event
   */
  public emit(eventName: string, ...args: any[]): void {
    if (!this.events.has(eventName)) return;

    const callbacks = this.events.get(eventName)!;
    for (const callback of callbacks) {
      callback(...args);
    }
  }

  /**
   * Remove all event listeners
   */
  public removeAllListeners(eventName?: string): void {
    if (eventName) {
      this.events.delete(eventName);
    } else {
      this.events.clear();
    }
  }

  /**
   * Get all registered event names
   */
  public eventNames(): string[] {
    return Array.from(this.events.keys());
  }

  /**
   * Get the number of listeners for an event
   */
  public listenerCount(eventName: string): number {
    return this.events.has(eventName) ? this.events.get(eventName)!.length : 0;
  }
}
