import { LayerManage } from "./LayersManage";
export class View {
  private layers: LayerManage;
  constructor() {
    this.layers = new LayerManage();
  }
  /**
   * 添加图层
   */
  addLayer() {}
  removeLayer() {}

  render() {
    this.layers.render();
  }
}