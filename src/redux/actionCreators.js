import {
  CELL_STYLE_CHANGE,
  CHANGE_TEXT,
  TABLE_RESIZE,
  APPLY_CELL_STYLES,
  TABLE_NAME_CHANGE,
  TABLE_OPENED,
} from './actionTypes';

export const resizeTable = (data) => {
  const colState = {};
  const rowState = {};
  if (isNaN(data.id)) {
    colState[data.id] = data.value;
  } else {
    rowState[data.id] = data.value;
  }

  return {
    type: TABLE_RESIZE,
    data: {
      rowState,
      colState,
    },
  };
};

export const changeText = (data) => {
  return {
    type: CHANGE_TEXT,
    data,
  };
};

export const cellStyleChange = (data) => {
  return {
    type: CELL_STYLE_CHANGE,
    data,
  };
};

export const applyCellStyles = (data) => {
  return {
    type: APPLY_CELL_STYLES,
    data,
  };
};

export const tableNameChange = (data) => {
  return {
    type: TABLE_NAME_CHANGE,
    data,
  };
};

export const tableOpened = (data) => {
  return {
    type: TABLE_OPENED,
    data,
  };
};
