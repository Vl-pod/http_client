/* eslint-disable linebreak-style */
/* eslint-disable no-return-await */
/* eslint-disable import/prefer-default-export */
export async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function getData(url = '') {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
  return await response.json();
}

export async function getAll() {
  return getData('http://localhost:5000/api/ticket/getAll');
}

export async function getInfoId(id) {
  return getData(`http://localhost:5000/api/ticket/${id}`);
}

export async function getDeleteID(id) {
  return getData(`http://localhost:5000/api/ticket/delete/${id}`);
}

export async function postEditID(id, data) {
  return postData(`http://localhost:5000/api/ticket/edit/${id}`, data);
}
