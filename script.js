const display = document.getElementById('display');

function appendValue(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    if (display.value === '') return;
        let expression = display.value.replace(/%/g, '/100').replace(/×/g, '*');

    display.value = eval(expression);
  } catch (error) {
    display.value = 'Error';
    setTimeout(clearDisplay, 1500);
  }
}
