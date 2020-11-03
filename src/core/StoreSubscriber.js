export class StoreSubscriber {
  constructor(store) {
    this.store = store;
    this.sub;
  }

  subscribeComponents(components) {
    this.prevState = this.store.getState();
    this.sub = this.store.subscribe((store) => {
      components.forEach((component) => {
        component.storeKeySubsctiption.forEach((storeKey) => {
          if (this.prevState[storeKey] !== store[storeKey]) {
            component.storeChanged({[storeKey]: store[storeKey]});
          }
        });
      });
      this.prevState = store;
    });
  }

  unsubscribeComponents() {
    this.sub.unsubscribe();
  }
}
