import Page from '../core/Page';
import {Header} from '../components/header/Header';
import {Toolbar} from '../components/toolbar/Toolbar';
import {Formula} from '../components/formula/Formula';
import {Table} from '../components/table/Table';
import {createStore} from '../core/createStore';
import {rootReducer} from '../redux/rootReducer';
import {debounce, storage} from '../core/utils';
import {initialState} from '../redux/initialState';
import {Excel} from '../components/excel/Excel';

export default class ExcelPage extends Page {
  constructor(param) {
    super(param);

    this.param = param;
  }

  get tableName() {
    return `excel:${this.param}`;
  }

  getRoot() {
    const store = createStore(rootReducer, initialState(this.tableName));

    const writeToStorage = debounce(
      (state) => storage(this.tableName, state),
      300
    );

    store.subscribe(writeToStorage);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
