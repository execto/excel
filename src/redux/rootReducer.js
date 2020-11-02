import {CHANGE_TEXT, TABLE_RESIZE} from './actionTypes';

export function rootReducer(state, action) {
  switch (action.type) {
    case TABLE_RESIZE:
      return {
        ...state,
        colState: {
          ...state.colState,
          ...action.data.colState,
        },
        rowState: {
          ...state.rowState,
          ...action.data.rowState,
        },
      };

    case CHANGE_TEXT:
      return {
        ...state,
        currentText: action.data.value,
        cellData: {
          ...state.cellData,
          [action.data.id]: action.data.value,
        },
      };
    default:
      return state;
  }
}
