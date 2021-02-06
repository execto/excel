import {
  APPLY_CELL_STYLES,
  CELL_STYLE_CHANGE,
  CHANGE_TEXT,
  TABLE_NAME_CHANGE,
  TABLE_RESIZE,
} from './actionTypes';

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
    case CELL_STYLE_CHANGE:
      return {
        ...state,
        currentCellStyles: action.data,
      };
    case APPLY_CELL_STYLES:
      return {
        ...state,
        currentCellStyles: {...state.currentCellStyles, ...action.data.styles},
        cellStyles: {
          ...state.cellStyles,
          // получаем объект вида {'1:1': style, '1:2': style}
          ...action.data.cellIds.reduce((acc, id) => {
            const prevStyles = state.cellStyles[id] || {};
            return {...acc, [id]: {...prevStyles, ...action.data.styles}};
          }, {}),
        },
      };
    case TABLE_NAME_CHANGE:
      return {
        ...state,
        tableName: action.data,
      };
    default:
      return state;
  }
}
