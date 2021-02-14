export function getHeaderTemplate(tableName) {
  return `
      <input type="text" class="input" value="${tableName}" />
      <div>
        <div class="btn">
          <span class="material-icons" data-btn-name="delete">
            delete
          </span>
        </div>
        <div class="btn">
          <a href="#dashboard" class="exit-link">
            <span class="material-icons">
              exit_to_app
            </span>
          </a>
        </div>
      </div>
    `;
}
