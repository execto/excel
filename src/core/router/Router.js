import {$} from '../../core/dom';
import ActiveRoute from './ActiveRoute';

export default class Router {
  constructor(rootSelector, routes) {
    this.$root = $(rootSelector);
    this.routes = routes;
    this.hashchandeHandler = this.hashchandeHandler.bind(this);

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.hashchandeHandler);
    this.hashchandeHandler();
  }

  hashchandeHandler() {
    if (this.page) {
      this.page.destroy();
    }

    const route = ActiveRoute.route;
    const Page = this.routes[route];
    this.page = new Page(ActiveRoute.param);
    this.$root.clear();
    this.$root.append(this.page.getRoot());

    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.hashchandeHandler);
  }
}
