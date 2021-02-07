import './sass/index.scss';
// import {Excel} from './components/excel/Excel';
// import {Header} from './components/header/Header';
// import {Toolbar} from './components/toolbar/Toolbar';
// import {Formula} from './components/formula/Formula';
// import {Table} from './components/table/Table';
// import {createStore} from './core/createStore';
// import {rootReducer} from './redux/rootReducer';
// import {debounce, storage} from './core/utils';
// import {initialState} from './redux/initialState';

import Router from './core/router/Router';
import DasboardPage from './pages/DashboardPage';
import ExcelPage from './pages/ExcelPage';

new Router('#app', {
  dashboard: DasboardPage,
  excel: ExcelPage,
});
// const store = createStore(rootReducer, initialState);

// const writeToStorage = debounce((state) => storage('exc-table', state), 300);

// store.subscribe(writeToStorage);

// const excel = new Excel('#app', {
//   components: [Header, Toolbar, Formula, Table],
//   store,
// });

// excel.render();
