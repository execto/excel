import {storage} from '../../core/utils';

export function getDasboardTable() {
  const tableRecords = getTableRecords();
  if (!tableRecords.length) {
    return `<p>No tables yet</p>`;
  }

  return `<div class="header">
    <span>
      Table name
    </span>
    <span>
      Last opened date
    </span>
  </div>

  <div class="list">
    ${tableRecords.map(getTableRecordListItem).join('')}
  </div>`;
}

function getTableRecords() {
  const redcords = [];
  for (let i = 0; i < localStorage.length; i += 1) {
    const keyName = localStorage.key(i);
    if (/^excel:[0-9]*/.test(keyName)) {
      const record = storage(keyName);
      record.id = keyName.split(':')[1];
      redcords.push(record);
    }
  }

  return redcords;
}

function getTableRecordListItem(record) {
  return `
    <li class="record">
      <a href="#excel/${record.id}">${record.tableName}</a>
      <strong>${record.lastOpenDate}</strong>
    </li>
  `;
}
