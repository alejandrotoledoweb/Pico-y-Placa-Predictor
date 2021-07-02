const totalInfo = []
const placa = document.getElementById('placa');
const dia = document.getElementById('dia');
const hora = document.getElementById('time');
const createBtn = document.getElementById("revisar");
const row = document.getElementById('row');

const time1 = '07:00';
const time2 = '09:30';
const time3 = '16:00';
const time4 = '19:30';


function saveInfo() {
  localStorage.setItem('totalInfo', JSON.stringify(totalInfo));
}

function checkPlacaAndDay(lastNumber, day) {
  if (day == 'lunes') {
    if (lastNumber >= 1 && lastNumber <= 2) {
      return false
    } else {
      return true
    }
  } else if (day == 'martes') {
    if (lastNumber >= 3 && lastNumber <= 4) {
      return false
    } else {
      return true
    }
  } else if (day == 'miercoles') {
    if (lastNumber >= 5 && lastNumber <= 6) {
      return false
    } else { 
      return true 
    }
  } else if (day == 'jueves') {
    if (lastNumber >= 7 && lastNumber <= 8) {
      return false
    } else {
      return true
    }
  } else if (day == 'viernes'){
    if (lastNumber == 9 && lastNumber == 0) {
      return false
    } else {
      return true
    }
  } else if (day == 'sabado' || day == 'domingo') {
    return true
  }
}

function checkHour(hour) {
  if (hour >= time1 && hour <= time2 || hour >= time3 && hour <= time4) {
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
  deleteBtn.className = 'btn btn-info ml-2 pl-2 btn-delete';
  deleteBtn.textContent = 'Borrar para otra revisión';
  deleteBtn.addEventListener('click', deleteInfo);

  cardBody.appendChild(cardPlaca);
  cardBody.appendChild(subTitle);
  cardBody.appendChild(cardDia);
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
  const check = new Verification(placa.value , dia.value.toLowerCase(), hora.value);

  totalInfo.push(check);

  saveInfo();
  newInfo();
  const div = document.getElementById('response')
  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('type', 'button');
  deleteBtn.className = 'btn btn-info ml-2 pl-2 btn-delete';
  deleteBtn.textContent = 'Borrar para otra revisión';
  deleteBtn.addEventListener('click', deleteInfo);
  const status = document.createElement('p')
  status.className = "fw-bold"
  const lastNumber = check.placa.slice(6, 7)
  const hour = check.hora
  const day = check.dia
  console.log(lastNumber, hour, day)
  if (checkPlacaAndDay(lastNumber, day)) {
    status.textContent="Su Vehiculo SI Puede Circular"
    div.appendChild(status);
    div.appendChild(deleteBtn);
  } else if (checkHour(hour)){
    status.textContent="Su Vehiculo NO Puede Circular"
    div.appendChild(status);
    div.appendChild(deleteBtn);
  } else {
    status.textContent="Su Vehiculo SI Puede Circular"
    div.appendChild(status);
    div.appendChild(deleteBtn);
  }

  
  cleanInputs();
}

createBtn.addEventListener('click', addCheckToInfos);

restoreLocal();


