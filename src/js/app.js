/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { Task } from './Task';
import {
  getAll, getDeleteID, getInfoId, postData,
} from './API.js';

const continer = document.querySelector('.container');
const btnAddTicket = document.querySelector('.btn-addTicket');

// Popup Add From
const addForm = document.querySelector('.addForm');
const btnCloseAddForm = document.querySelector('[data-btn=close]');
const btnSendAddForm = document.querySelector('[data-btn=send]');
const inputTitleTasck = document.querySelector('[data-input=title-tasck]');
const inputDescription = document.querySelector('[data-input=description-tasck]');

// Popup Edit From
const EditForm = document.querySelector('.EditForm');
const btnCloseEditForm = document.querySelector('[data-btn=EditForm__close]');
const btnSendEditForm = document.querySelector('[data-btn=EditForm__send]');
const inputTitleTasckEdit = document.querySelector('[data-input=title-tasck-edit]');
const inputDescriptionEdit = document.querySelector('[data-input=description-tasck-edit]');

// Popup delete ticket

const PopupDelete = document.querySelector('.popup-delete');
const btnClosePopupDelete = document.querySelector('[data-btn=popup-delete__close]');
const btnSendPopupDelete = document.querySelector('[data-btn=popup-delete__send]');

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const tasks = await getAll();
    tasks.forEach((item) => {
      const task = new Task();
      const taskEl = task.createEl(item);
      list.innerHTML += taskEl;
    });
  } catch (error) {
    console.error(error);
  }
});

// List task
const list = document.querySelector('.list');
const titleTask = document.querySelector('.title-task');
btnAddTicket.addEventListener('click', (e) => {
  e.preventDefault();
  addForm.classList.add('active');
});

btnCloseAddForm.addEventListener('click', (e) => {
  e.preventDefault();

  addForm.classList.remove('active');
});

btnSendAddForm.addEventListener('click', (e) => {
  e.preventDefault();
  const data = {
    name: inputTitleTasck.value,
    description: inputDescription.value,
  };
  postData('http://localhost:10000/api/ticket/create', data).then((response) => {
    const task = new Task();
    const taskEl = task.createEl(response);
    list.innerHTML += taskEl;
  });
  inputTitleTasck.value = '';
  inputDescription.value = '';
  addForm.classList.remove('active');
});

list.addEventListener('click', async (e) => {
  if (e.target.classList.contains('title-task')) {
    const parent = e.target.closest('.task');
    const taskId = parent.getAttribute('data-id');

    const existingDescription = parent.querySelector('.description-task');
    if (existingDescription) {
      parent.removeChild(existingDescription);
      parent.classList.remove('active');
      return;
    }

    try {
      const data = await getInfoId(taskId);
      console.log(data);

      const description = document.createElement('p');
      description.classList.add('description-task', 'active');
      description.textContent = data;

      parent.appendChild(description);
    } catch (error) {
      console.error(error);
    }
  }
  if (e.target.classList.contains('btn-edit')) {
    EditForm.classList.add('active');
    const parent = e.target.closest('.task');
    const taskId = parent.getAttribute('data-id');
    const title = parent.querySelector('.title-task');

    btnCloseEditForm.addEventListener('click', (e) => {
      e.preventDefault();
      EditForm.classList.remove('active');
    });

    btnSendEditForm.addEventListener('click', (e) => {
      e.preventDefault();
      const data = {
        name: inputTitleTasckEdit.value,
        description: inputDescriptionEdit.value,
      };
      postData(`http://localhost:10000/api/ticket/edit/${taskId}`, data).then((response) => {
        if (response) {
          title.textContent = inputTitleTasckEdit.value;
          inputDescriptionEdit.value = '';
          inputTitleTasckEdit.value = '';
          EditForm.classList.remove('active');
        }
      });
    });
  }

  if (e.target.classList.contains('btn-delete')) {
    PopupDelete.classList.add('active');
    const parent = e.target.closest('.task');
    const taskId = parent.getAttribute('data-id');

    btnClosePopupDelete.addEventListener('click', (e) => {
      e.preventDefault();
      PopupDelete.classList.remove('active');
    });
    btnSendPopupDelete.addEventListener('click', (e) => {
      e.preventDefault();
      getDeleteID(taskId);
      PopupDelete.classList.remove('active');
      parent.remove();
    });
  }

  if (e.target.classList.contains('check')) {
    const check = e.target;
    const parent = e.target.closest('.task');
    const taskId = parent.getAttribute('data-id');
    const data = {
      status: check.checked,
    };
    postData(`http://localhost:10000/api/ticket/edit/${taskId}`, data);
  }
});
