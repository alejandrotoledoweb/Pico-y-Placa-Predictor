const totalInfo = []
const placa = document.getElementById('placa')
const dia = document.getElementById('dia')
const hora = document.getElementById('time')
const createBtn = document.getElementById("revisar")
const row = document.getElementById('row');

const time1 = '06:00';
const time2 = '20:00';


function saveInfo() {
  localStorage.setItem('totalInfo', JSON.stringify(totalInfo));
}

function checkPlacaAndDay(lastNumber, day) {
  if (day == 'lunes') {
    if (lastNumber >= 0 && lastNumber <= 3) {
      return false
    } else {
      return true
    }
  } else if (day == 'martes') {
    if (lastNumber >= 2 && lastNumber <= 4) {
      return false
    } else {
      return true
    }
  } else if (day == 'miercoles') {
    if (lastNumber >= 4 && lastNumber <= 7) {
      return false
    } else { 
      return true 
    }
  } else if (day == 'jueves') {
    if (lastNumber >= 6 && lastNumber <= 9) {
      return false
    } else {
      return true
    }
  } else if (day == 'viernes'){
    if (lastNumber >= 0 && lastNumber <= 1 && lastNumber <= 9 && lastNumber >= 8) {
      return false
    } else {
      return true
    }
  } else if (day == 'sabado' || day == 'domingo') {
    return true
  }
}

function checkHour(hour) {
  if (hour > time1 && hour < time2) {
    return true
  } else {
    return false
  }
}

function checkHour2(hour) {
  if (hour < time1 || hour > time2) {
    return true
  } else {
    return false
  }
}

function deleteInfo(myInfo) {
  const infoIndex = totalInfo.indexOf(myInfo.target);
  totalInfo.splice(infoIndex, 1);
  saveInfo();
  myInfo.target.offsetParent.parentElement.remove();
}


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
  cardBody.setAttribute('id', 'response');

  const cardPlaca = document.createElement('h5');
  cardPlaca.classList.add('card-title');
  cardPlaca.textContent = verification.placa;

  const subTitle = document.createElement('h6');
  subTitle.className = 'card-subtitle';
  subTitle.textContent = verification.dia;

  const cardDia = document.createElement('p');
  cardDia.classList.add('card-text');
  cardDia.textContent = verification.hora;

  const cardStatus = document.createElement('p');
  cardStatus.classList.add('card-text');

  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('type', 'button');
  deleteBtn.className = 'btn btn-danger ml-2 pl-2 btn-delete';
  deleteBtn.textContent = 'Delete Info to Check Again';
  deleteBtn.addEventListener('click', deleteInfo);

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

function addCheckToInfos() {
  console.log(placa.value);
  console.log(dia.value);
  console.log(hora.value);
  const check = new Verification(placa.value , dia.value, hora.value);

  totalInfo.push(check);

  saveInfo();
  newInfo();
  const div = document.getElementById('response')
  const status = document.createElement('p')
  const lastNumber = check.placa.slice(6, 7)
  const hour = check.hora
  const day = check.dia
  console.log(lastNumber, hour, day)
  if (checkPlacaAndDay(lastNumber, day)) {
    if (checkHour(hour)) {
      status.textContent="Su Vehiculo SI Puede Circular"
      div.appendChild(status);
    }
  } else if (checkHour2(hour)){
    status.textContent="Su Vehiculo SI Puede Circular"
    div.appendChild(status);
  } else {
    status.textContent="Su Vehiculo NO Puede Circular"
    div.appendChild(status);
  }

  
  cleanInputs();
}

createBtn.addEventListener('click', addCheckToInfos);

restoreLocal();


