import {$} from '../../core/dom';
import {Emmiter} from '../../core/Emmiter';
import {StoreSubscriber} from '../../core/StoreSubscriber';
import {tableOpened} from '../../redux/actionCreators';

export class Excel {
  constructor(options) {
    this.components = options.components || [];
    this.emmiter = new Emmiter();
    this.store = options.store;
    this.storeSubscriber = new StoreSubscriber(this.store);
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    const componentOptions = {
      emmiter: this.emmiter,
      store: this.store,
    };

    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, componentOptions);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });

    return $root;
  }

  init() {
    this.storeSubscriber.subscribeComponents(this.components);
    this.components.forEach((component) => component.init());
    this.store.dispatch(tableOpened(new Date().toLocaleDateString()));
  }

  destroy() {
    this.components.forEach((component) => component.destroy());
    this.storeSubscriber.unsubscribeComponents();
  }
}
