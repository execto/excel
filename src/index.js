import './sass/index.scss';
import Router from './core/router/Router';
import DasboardPage from './pages/Dashboard/DashboardPage';
import ExcelPage from './pages/ExcelPage';

new Router('#app', {
  ['']: DasboardPage,
  dashboard: DasboardPage,
  excel: ExcelPage,
});
