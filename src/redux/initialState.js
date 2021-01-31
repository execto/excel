import {storage} from '../core/utils';

const defaultState = {
  colState: {},
  rowState: {},
  currentText: '',
  cellData: {},
  cellStyles: {},
  currentCellStyles: {},
};

export const initialState = storage('exc-table') || defaultState;
