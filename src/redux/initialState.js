import {storage} from '../core/utils';

const defaultState = {
  colState: {},
  rowState: {},
  currentText: '',
  cellData: {},
  cellStyles: {},
  currentCellStyles: {},
  tableName: 'New table',
  lastOpenDate: new Date().toLocaleDateString(),
};

export function initialState(tableName) {
  const state = storage(tableName) || defaultState;
  state.tableId = tableName;
  return state;
}
