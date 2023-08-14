/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
export class addTicketFrom {
  constructor(parentEl) {
    this.parentEl = parentEl;
    // this.onClickClose = this.onClickClose.bind(this);
  }

  static get markup() {
    return `
    <div class="addForm">
            <h4 class="addForm__title">Добавить текст</h4>
            <form action="">
                <label for="">Краткое описание
                    <input type="text" data-input="title-tasck" required>
                </label>
                <label for="">Подробное описание
                    <input type="text" data-input="description-tasck" required>
                </label>
                <button data-btn="close">Отмена</button>
                <button data-btn="send">Ок</button>
            </form>
            </div>
    `;
  }

  static get inputTitleSelector() {
    return '[data-input=title-tasck]';
  }

  static get inputDescriptionSelector() {
    return '[data-input=description-tasck]';
  }

  static get btnCloseSelector() {
    return '[data-btn=close]';
  }

  static get btnSendSelector() {
    return '[data-btn=send]';
  }

  bindToDOM() {
    this.parentEl.innerHTML += this.constructor.markup;
    this.form = this.parentEl.querySelector('.addForm');
    this.inputTitle = this.parentEl.querySelector(addTicketFrom.inputTitleSelector);
    this.inputDescript = this.parentEl.querySelector(addTicketFrom.inputDescriptionSelector);
    this.btnClose = this.parentEl.querySelector(addTicketFrom.btnCloseSelector);
    this.btnSend = this.parentEl.querySelector(addTicketFrom.btnSendSelector);
    this.flag = true;

    this.btnClose.addEventListener('click', this.onClickClose);
  }

//   onClickClose(e) {
//     e.preventDefault();
//     this.form.remove();
//     this.btnClose.removeEventListener('click', this.onClickClose);
//   }
}
