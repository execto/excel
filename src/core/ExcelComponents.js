import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emmiter = options.emmiter;
    this.unsubscribers = [];
  }

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

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
