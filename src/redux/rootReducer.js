export function rootReducer(state, action) {
  switch (action.type) {
    case 'TABLE_RESIZE':
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
    default:
      return state;
  }
}
