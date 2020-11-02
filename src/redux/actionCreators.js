import {CHANGE_TEXT, TABLE_RESIZE} from './actionTypes';

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
