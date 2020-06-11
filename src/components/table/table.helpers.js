export const shouldResize = (event) => {
  return event.target.dataset.resizer ? true : false;
};

export const isCell = (event) => {
  return event.target.dataset.type === 'cell' ? true : false;
};

export const isEqualCells = ($cellA, $cellB) => {
  return $cellA.data.cellcomplexname === $cellB.data.cellcomplexname;
};

export const getCellIndexes = ($cell) => {
  return $cell.data.cellcomplexname.split(':').map((idx) => Number(idx));
};

export const getCellsRange = (startIdxs, currentIdxs) => {
  const [startColIdx, startRowIdx] = startIdxs;
  const [currentColIdx, currentRowIdx] = currentIdxs;
  const [colFrom, collTo] = [startColIdx, currentColIdx].sort((a, b) => a - b);
  const [rowFrom, rowTo] = [startRowIdx, currentRowIdx].sort((a, b) => a - b);
  return {
    colRange: {
      from: colFrom,
      to: collTo,
    },
    rowRange: {
      from: rowFrom,
      to: rowTo,
    },
  };
};
