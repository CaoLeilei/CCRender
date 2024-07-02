let idx = 0
export function createId() {
  return idx++;
}

export class ShapeObject {
  public id: number;

  public constructor(params) {
    this.id = createId();
  }

  public getId() {
    return this.id;
  }
}
