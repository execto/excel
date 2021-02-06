export function getHeaderTemplate(tableName) {
  return `
      <input type="text" class="input" value="${tableName}" />
      <div>
        <div class="btn">
          <span class="material-icons">
            delete
          </span>
        </div>
        <div class="btn">
          <span class="material-icons">
            exit_to_app
          </span>
        </div>
      </div>
    `;
}
