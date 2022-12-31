// nombre de la tarjeta
let nameCard = document.querySelector('.name');
let nameInput = document.querySelector('#cardholder');
let nameErrorDiv = document.querySelector('.form__cardholder--error');

// numero de la tarjeta
let numberCard = document.querySelector('.number_bar');
let numberInput = document.querySelector('#cardnumber');
let numberErrorDiv = document.querySelector('.form__inputnumber--error');

// mes 
let monthCard = document.querySelector('.month');
let monthInput = document.querySelector('#month');
let monthErrorDiv = document.querySelector('.form__input-mm--error');

// año
let yearCard = document.querySelector('.year');
let yearInput = document.querySelector('#year');
let yearErrorDiv = document.querySelector('.form__input-yy--error');

// cvc
let cvcCard = document.querySelector('.card_back__cvc');
let cvcInput = document.querySelector('#cvc');
let cvcErrorDiv = document.querySelector('.form__input-cvc--error');



// ingreso dinamico del nombre
nameInput.addEventListener('input', () => {
  if (nameInput.value == '') {
    nameCard.innerText = 'JANE APPLESEED'
  } else {
    nameCard.innerText = nameInput.value;
  }
});

//ingreso dinamico del numero
numberInput.addEventListener('input', () => {



  // validacion que haya una letra,
  let regExp = /[A-z]/g;
  if (regExp.test(numberInput.value)) {
    showError(numberInput, numberErrorDiv, 'Wrong format, numbers only');
  } else {
    // borrando espacios ingresados por el usuario, agregando espacios cada 4 digitos, y borrando el espacio final
    numberInput.value = numberInput.value.replace(/\s/g, '').replace(/([0-9]{4})/g, '$1 ').trim();
    showError(numberInput, numberErrorDiv, '', false);
  }

  // actualizando graficamente la tarjeta:
  numberCard.innerText = numberInput.value;

  // mostrando los 0 por defecto cuando no se ha ingresado nada
  if (numberInput.value == '') {
    numberCard.innerText = '0000 0000 0000 0000';
  }
});

// ingreso dinamico del mes
monthInput.addEventListener('input', () => {
  monthCard.innerText = monthInput.value;
  validateLetters(monthInput, monthErrorDiv);
});

// ingreso dinamico del año
yearInput.addEventListener('input', () => {
  yearCard.innerText = yearInput.value;
  validateLetters(yearInput, yearErrorDiv);
});

// ingreso dinamico de cvc
cvcInput.addEventListener('input', () => {
  cvcCard.innerText = cvcInput.value;
  validateLetters(cvcInput, cvcErrorDiv);
});


// boton de confimar

let confirmBtn = document.querySelector('.form__submit')

let nameValidation = false;
let numberValidation = false;
let monthValidation = false;
let yearValidation = false;
let cvcValidation = false;

// form y thank  

let form = document.querySelector('.form');
let thank = document.querySelector('.thank');


confirmBtn.addEventListener('click', e => {
  e.preventDefault();


  // validar nombre
  if (verifyIsFilled(nameInput, nameErrorDiv)) {
    nameValidation = true;
  } else {
    nameValidation = false;
  }

  // validar numero
  if (verifyIsFilled(numberInput, numberErrorDiv) == true) {
    if (numberInput.value.length == 19) {
      showError(numberInput, numberErrorDiv, '', false);
      numberValidation = true;
    } else {
      showError(numberInput, numberErrorDiv, 'Wrong number');
      numberValidation = false;
    }
  }

  // validar Mes
  if (verifyIsFilled(monthInput, monthErrorDiv)) {
    if (parseInt(monthInput.value) > 0 && parseInt(monthInput.value) <= 12) {
      showError(monthInput, monthErrorDiv, '', false);
      monthValidation = true;
    } else {
      showError(monthInput, monthErrorDiv, 'Wrong Month');
      monthValidation = false;
    }
  }

  // validar año
  if (verifyIsFilled(yearInput, yearErrorDiv)) {
    if (parseInt(yearInput.value) > 22 && parseInt(yearInput.value) <= 25) {
      showError(yearInput, yearErrorDiv, '', false);
      yearValidation = true;
    } else {
      showError(yearInput, yearErrorDiv, 'Wrong Year');
      yearValidation = false;
    }
  }

  // validar cvc
  if (verifyIsFilled(cvcInput, cvcErrorDiv)) {
    if (cvcInput.value.length == 3) {
      showError(cvcInput, cvcErrorDiv, '', false);
      cvcValidation = true;
    } else {
      showError(cvcInput, cvcErrorDiv, 'Wrong CVC');
      cvcValidation = false;
    }
  }

  if (nameValidation == true && numberValidation == true && monthValidation == true && yearValidation == true && cvcValidation == true) {
    form.style.display = 'none';
    thank.style.display = 'block';
  }
});





// funciones de error

function showError(divInput, divError, msgError, show = true) {
  if (show) {
    divError.innerText = msgError;
    divInput.style.borderColor = '#FF0000';
  } else {
    divError.innerText = msgError;
    divInput.style.borderColor = 'hsl(270, 3%, 87%)';
  }
}

function verifyIsFilled(divInput, divError) {
  if (divInput.value.length > 0) {
    showError(divInput, divError, "", false);
    return true;
  } else {
    showError(divInput, divError, "Can't be blank");
    return false;
  }
}

function validateLetters(input, divError) {
  let regExp = /[A-z]/g;
  if (regExp.test(input.value)) {
    showError(input, divError, 'Wrong format, numbers only');
  } else {
    showError(input, divError, '', false);
  }
}