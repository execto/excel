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
    const route = ActiveRoute.route;
    const Page = this.routes[route];
    const page = new Page();
    this.$root.clear();
    this.$root.append(page.getRoot());

    page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.hashchandeHandler);
  }
}
