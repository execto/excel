import {storage} from '../core/utils';

const defaultState = {
  colState: {},
  rowState: {},
  currentText: '',
  cellData: {},
  cellStyles: {},
  currentCellStyles: {},
  tableName: 'New table',
};

export const initialState = storage('exc-table') || defaultState;
