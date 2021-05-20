import { 
  totalInfo, placa, dia, hora, btn, lastNumber, saveInfo, checkPlacaAndDay, checkHour, time1, time2,
} from './checkings.js'


class Verification {
  constructor(placa, dia, hora) {
    this.placa = placa;
    this.dia = dia;
    this.hora = hora;
  }
}


function createCard(verification) {
  const column = document.createElement('section');
  column.className = 'mb-3 col-3';

  const card = document.createElement('div');
  card.className = 'shadow card';

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardPlaca = document.createElement('h5');
  cardPlaca.classList.add('card-title');
  cardPlaca.textContent = verification.placa;

  const subTitle = document.createElement('h6');
  subTitle.className = 'card-subtitle';
  subTitle.textContent = verification.dia;

  const cardDia = document.createElement('p');
  cardDia.classList.add('card-text');
  cardDia.textContent = verification.dia;

  const cardStatus = document.createElement('p');
  cardStatus.classList.add('card-text');

  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('type', 'button');
  deleteBtn.className = 'btn btn-danger ml-2 pl-2 btn-delete';
  deleteBtn.textContent = 'Delete Book';
  deleteBtn.addEventListener('click', deleteBook);
  deleteBtn.addEventListener('click', toggleModal);

  cardBody.appendChild(cardPlaca);
  cardBody.appendChild(subTitle);
  cardBody.appendChild(cardDia);
  cardBody.appendChild(deleteBtn);
  card.appendChild(cardBody);
  column.appendChild(card);
  row.appendChild(column);
}

function resetList() {
  row.innerHTML = '';
}

function newInfo() {
  resetList();
  totalInfo.forEach((info) => {
    createCard(info);
  });
}

function restoreLocal(totalInfo) {
  totalInfo = JSON.parse(localStorage.getItem('totalInfo'));
  if (totalInfo === null) totalInfo = [];
  newInfo();
}

function cleanInputs() {
  placa.value = '';
  dia.value = '';
  hora.value = '';
}