import { BaseLayer } from "./BaseLayer";

export class LayerManage {
  private layers: BaseLayer[];
  constructor() {
    this.layers = [];
  }
  add(layer: BaseLayer)
  {
    this.layers.push(layer);
  }
  render()
  {
    this.layers.forEach(layer => {
      layer.render();
    });
  }

  /**
   * 根据图层的Index属性进行排序
   */
  sortLayers(): BaseLayer[] {
    return this.layers.sort((a, b) => {
      return a.index - b.index;
    });
  }
}