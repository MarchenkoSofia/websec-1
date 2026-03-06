const btn = document.getElementById("calc-btn");
const num1Input = document.getElementById("num1");
const num2Input = document.getElementById("num2");
const operationSelect = document.getElementById("operation");
const resultsBox = document.getElementById("results");

const error1Msg = document.getElementById("error1");
const error2Msg = document.getElementById("error2");

let history = [];
const MAX_HISTORY = 5;

function clearErrors() {
  num1Input.classList.remove("input-error");
  num2Input.classList.remove("input-error");
  error1Msg.classList.remove("visible");
  error2Msg.classList.remove("visible");
}

function showError(inputElement, msgElement, text) {
  inputElement.classList.add("input-error");
  msgElement.textContent = text;
  msgElement.classList.add("visible");
}

function validateInput(value, inputElement, msgElement) {
  if (value.trim() === "") {
    showError(inputElement, msgElement, "Поле не может быть пустым");
    return null;
  }
  const normalizedValue = value.replace(",", ".");
  const number = Number(normalizedValue);

  if (isNaN(number)) {
    showError(inputElement, msgElement, "Введите корректное число");
    return null;
  }
  return number;
}

function renderResults() {
  resultsBox.innerHTML = "";

  history.forEach((item) => {
    const div = document.createElement("div");
    div.className = "history-item";
    div.textContent = item;
    resultsBox.appendChild(div);
  });
}

btn.addEventListener("click", () => {
  clearErrors();

  const val1 = validateInput(num1Input.value, num1Input, error1Msg);
  const val2 = validateInput(num2Input.value, num2Input, error2Msg);
  const op = operationSelect.value;

  if (val1 === null || val2 === null) return;

  if (op === "/" && val2 === 0) {
    showError(num2Input, error2Msg, "Деление на ноль невозможно");
    return;
  }

  let result;
  switch (op) {
    case "+":
      result = val1 + val2;
      break;
    case "-":
      result = val1 - val2;
      break;
    case "*":
      result = val1 * val2;
      break;
    case "/":
      result = val1 / val2;
      break;
  }

  result = Math.round(result * 1000000) / 1000000;

  const operationString = `${val1} ${op} ${val2} = ${result}`;

  const currentItemElement = resultsBox.querySelector(".current-item");
  if (currentItemElement) {
    history.push(currentItemElement.textContent);
    if (history.length > MAX_HISTORY) {
      history.shift();
    }
  }

  renderResults();

  const currentDiv = document.createElement("div");
  currentDiv.className = "current-item";
  currentDiv.textContent = operationString;
  resultsBox.appendChild(currentDiv);
});

num1Input.addEventListener("input", () => {
  num1Input.classList.remove("input-error");
  error1Msg.classList.remove("visible");
});

num2Input.addEventListener("input", () => {
  num2Input.classList.remove("input-error");
  error2Msg.classList.remove("visible");
});
