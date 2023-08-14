/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
export class Task {
  createEl(data) {
    return `
    <div class="task" data-id="${data.id}">
    <div class="task-main">
        <input type="checkbox" class="check" ${data.status ? 'checked' : ''}>
        <p class="title-task">${data.name}</p>
        <div class="data">${data.created}</div>
        <div>
            <button class="btn btn-edit">red</button>
            <button class="btn btn-delete">delete</button>
        </div>

    </div>
    </div>
    `;
  }
}
