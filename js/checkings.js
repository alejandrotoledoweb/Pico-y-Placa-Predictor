const totalInfo = []
const placa = document.querySelector('#placa')
const dia = document.querySelector('#dia')
const hora = document.querySelector('#hora')
const btn = document.querySelector('#revisar')
const lastNumber = placa.slice(6, 7)

const time1 = '06:00';
const time2 = '20:00';

export { placa, dia, hora, btn, lastNumber, time1, time2 };

export function saveInfo() {
  localStorage.setItem('totalInfo', JSON.stringify(totalInfo));
}

export function checkPlacaAndDay(lastNumber, day) {
  if (lastNumber >= 0 && lasNumber <= 3 && day == 'lunes') {
    return true 
  } else if (lastNumber >= 2 && lasNumber <= 4 && day == 'martes') {
    return true 
  } else if (lastNumber >= 4 && lasNumber <= 7 && day == 'miercoles') {
    return true 
  } else if (lastNumber >= 6 && lasNumber <= 9 && day == 'jueves') {
    return true 
  } else if (lastNumber >= 0 && lasNumber <= 1 && lasNumber <= 9 && lasNumber >= 8 && day == 'viernes'){
    return true 
  } else if (day == 'sabado' && day == 'domingo') {
    return true
  } else {
    return false
  }
}

export function checkHour(hour) {
  if (hora > time1 && hora < time2) {
    return true
  } else {
    return false
  }
}

export function deleteInfo(myInfo) {
  const infoIndex = totalInfo.indexOf(myInfo.target);
  totalInfo.splice(infoIndex, 1);
  saveInfo();
  myInfo.target.offsetParent.parentElement.remove();
}