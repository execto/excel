import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emmiter = options.emmiter;
    this.unsubscribers = [];
    this.store = options.store;
    this.storeKeySubsctiption = options.storeKeySubsctiption || [];

    this.prepare();
  }

  prepare() {}

  toHTML() {
    return '';
  }

  $emmit(event, ...args) {
    this.emmiter.emmit(event, ...args);
  }

  $on(event, callback) {
    const unsub = this.emmiter.subscribe(event, callback);
    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  storeChanged() {}

  $getState() {
    return this.store.getState();
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
    // this.$storeSub.unsubscribe();
  }
}
