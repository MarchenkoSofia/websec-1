const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const operation = document.getElementById("operation");
const calcBtn = document.getElementById("calc-btn");
const results = document.getElementById("results");

const error1 = document.getElementById("error1");
const error2 = document.getElementById("error2");

let historyArray = [];
const MAX_HISTORY = 5;

function checkInput(inputElement, errorElement) {
  inputElement.classList.remove("input-error");
  errorElement.classList.remove("visible");

  let textValue = inputElement.value.replace(",", ".");
  let numberValue = Number(textValue);

  if (textValue === "" || isNaN(numberValue)) {
    inputElement.classList.add("input-error");
    errorElement.classList.add("visible");
    errorElement.innerText = "Введите число";
    return null;
  }

  return numberValue;
}

calcBtn.onclick = function () {
  let val1 = checkInput(num1, error1);
  let val2 = checkInput(num2, error2);

  if (val1 === null || val2 === null) {
    return;
  }

  if (operation.value === "/" && val2 === 0) {
    num2.classList.add("input-error");
    error2.classList.add("visible");
    error2.innerText = "Делить на ноль нельзя";
    return;
  }

  let result;
  if (operation.value === "+") result = val1 + val2;
  if (operation.value === "-") result = val1 - val2;
  if (operation.value === "*") result = val1 * val2;
  if (operation.value === "/") result = val1 / val2;

  let answerString = val1 + " " + operation.value + " " + val2 + " = " + result;

  historyArray.push(answerString);

  if (historyArray.length > MAX_HISTORY) {
    historyArray.shift();
  }

  results.innerHTML = "";

  for (let i = 0; i < historyArray.length; i++) {
    let div = document.createElement("div");
    div.innerText = historyArray[i];

    if (i === historyArray.length - 1) {
      div.className = "current-item";
    } else {
      div.className = "history-item";
    }

    results.appendChild(div);
  }
};

num1.oninput = function () {
  num1.classList.remove("input-error");
  error1.classList.remove("visible");
};

num2.oninput = function () {
  num2.classList.remove("input-error");
  error2.classList.remove("visible");
};
