import {capitalize} from './utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root from DomListener');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const methodName = getMethodName(listener);
      if (!this[methodName]) {
        throw new Error(
          `${methodName} not implements in ${this.name} component`
        );
      }
      const callback = this[methodName].bind(this);
      this[methodName] = callback;
      this.$root.on(listener, callback);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const methodName = getMethodName(listener);
      this.$root.off(listener, this[methodName]);
    });
  }
}

const getMethodName = (listener) => {
  return 'on' + capitalize(listener);
};
