import {ExcelComponent} from './ExcelComponents';

export class StatefullExcelComponent extends ExcelComponent {
  constructor(...args) {
    super(...args);
    this.state;
  }

  get template() {
    return JSON.stringify(this.state);
  }

  initState(initialState = {}) {
    this.state = {...initialState};
  }

  setState(newState) {
    this.state = {...this.state, ...newState};
    this.$root.html(this.template);
  }
}
