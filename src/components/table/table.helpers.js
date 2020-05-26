export const shouldResize = (event) => {
  return event.target.dataset.resizer ? true : false;
};

export const isCell = (event) => {
  return event.target.dataset.type === 'cell' ? true : false;
};
