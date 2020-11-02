import {storage} from '../core/utils';

const defaultState = {
  colState: {},
  rowState: {},
  currentText: '',
  cellData: {},
};

export const initialState = storage('exc-table') || defaultState;
