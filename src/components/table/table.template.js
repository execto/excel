import {cellStyles} from '../../consts/cellStyles';
import parse from '../../core/parse';
import {appendData, styleObjectToInline} from '../../core/utils';

const CHARS = {
  A: 'A'.charCodeAt(0),
  Z: 'Z'.charCodeAt(0),
};

const DEFAULT_WIDTH = 100;
const DEFAULT_HEIGHT = 24;

function getSize(value, defaultValue) {
  return (value || defaultValue) + 'px';
}

function getCellStyle(style) {
  const cellStyle = style ? {...cellStyles, ...style} : {...cellStyles};
  return styleObjectToInline(cellStyle);
}

function getCell(row, state) {
  return (data, idx) => {
    const cellname = String.fromCharCode(CHARS.A + idx);
    const width = getSize(state.colState[cellname], DEFAULT_HEIGHT);
    const cellComplexName = `${idx + 1}:${row}`;
    const cellValue = state.cellData[cellComplexName] || '';
    const cellDefaultStyles = getCellStyle(state.cellStyles[cellComplexName]);

    return `
      <div 
        class="cell" 
        data-cellname="${cellname}"
        data-rowindex="${row}"
        data-cellcomplexname="${cellComplexName}"
        data-type="cell"
        data-value="${cellValue}"
        style="${cellDefaultStyles}; width: ${width};"
        contenteditable
      >
        ${parse(cellValue)}
      </div>
    `;
  };
}

function getColumn(data, colState) {
  const width = getSize(colState[data], DEFAULT_WIDTH);
  return `
    <div 
      class="column" 
      data-columnname="${data}" 
      data-type="resizeble"
      style="width: ${width};"
    >
      ${data}
      <div class="column-resizer" data-resizer="col"></div>
    </div>
  `;
}

function getRow(info, data, rowState) {
  const htmlData = {
    type: info ? 'resizeble' : false,
    linenumber: info,
  };
  const height = getSize(rowState[info], DEFAULT_HEIGHT);
  const resizer = info
    ? '<div class="row-resizer" data-resizer="row"></div>'
    : '';
  return `
    <div
      class="row"
      ${appendData(htmlData)}
      style="height: ${height}"
    >
      <div class="row-info">
        ${info || ''}
        ${resizer}
      </div>
      <div class="row-data">
        ${data.join('')}
      </div>
    </div>
  `;
}

function getCharFromCode(_, idx) {
  return String.fromCharCode(CHARS.A + idx);
}

export function getTable(rowsCount = 15, state) {
  const rows = [];
  const columnsCount = CHARS.Z - CHARS.A + 1;

  const cols = new Array(columnsCount)
    .fill('')
    .map(getCharFromCode)
    .map((data) => getColumn(data, state.colState));

  const firstRow = getRow(null, cols, {});
  rows.push(firstRow);

  for (let rowNum = 1; rowNum <= rowsCount; rowNum += 1) {
    const cells = new Array(columnsCount).fill('').map(getCell(rowNum, state));
    const row = getRow(rowNum, cells, state.rowState);
    rows.push(row);
  }

  return rows.join('');
}
