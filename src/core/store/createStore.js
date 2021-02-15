export function createStore(rootReducer, initialState) {
  let state = rootReducer({...initialState}, {type: '__INIT__'});
  let listeners = [];

  return {
    subscribe(fn) {
      listeners.push(fn);
      return {
        unsubscribe() {
          listeners = listeners.filter((ls) => ls !== fn);
        },
      };
    },
    dispatch(action) {
      state = rootReducer(state, action);
      listeners.map((ls) => ls(state));
    },
    getState() {
      return state;
    },
  };
}
