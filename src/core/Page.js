export default class Page {
  constructor(params) {
    this.params = params;
  }

  getRoot() {
    throw new Error('getRoot method not implemented');
  }

  afterRender() {}

  destroy() {}
}
