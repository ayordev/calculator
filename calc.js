const inputBox = document.getElementById("display-input");
const tButtons = document.getElementById("input-buttons");
const textButtons = document.querySelectorAll("#text-buttons");
const equalBtn = document.getElementById("equal-sign");
const icons = document.querySelectorAll("i[data-operator]");

// Always focus
inputBox.focus();
// Clear button
const clearBtn = document.querySelector("#clear-btn");

// Delete button
const deleteBtn = document.querySelector("#delete-btn");

// An empty Array
let operatorsArr = [];
operatorsArr.push();

// Each buttons
textButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    inputBox.value += e.target.innerText;
    inputBox.focus();
  });
});
// All icons
icons.forEach((i) => {
  i.addEventListener("click", (e) => {
    if (e.target.accessKey === "division") {
      operatorsArr.push("/");
    } else operatorsArr.push(e.target.dataset.operator);
    inputBox.value += e.target.dataset.operator;
  });
});
function calculate() {
  return dmas(tokenize(inputBox.value));
}

function tokenize(value) {
  let tokenArr = [];
  let token = "";
  let sign = "+-x÷";
  for (const string of value) {
    if (sign.includes(string)) {
      if (token === "" && string === "-") {
        token = "-";
      } else {
        tokenArr.push(parseFloat(token), string);
        token = "";
      }
    } else {
      token += string;
    }
  }
  if (token !== "") {
    tokenArr.push(parseFloat(token));
  }

  return tokenArr;
}

function dmas(tokens) {
  let operatorPrecedence = [
    { "÷": (x, y) => x / y, x: (x, y) => x * y },
    { "+": (x, y) => x + y, "-": (x, y) => x - y },
  ];

  let operator;
  for (const operators of operatorPrecedence) {
    const newTokens = [];
    for (const token of tokens) {
      if (token in operators) {
        operator = operators[token];
      } else if (operator) {
        newTokens[newTokens.length - 1] = operator(
          newTokens[newTokens.length - 1],
          token
        );
        operator = null;
      } else {
        newTokens.push(token);
      }
    }
    tokens = newTokens;
  }
  if (tokens.length > 1) {
    return tokens;
  } else {
    return parseFloat(tokens[0].toPrecision(15));
  }
}

// Adding EventListner
equalBtn.addEventListener("click", () => {
  inputBox.value = calculate();
  operatorsArr = [];
});

clearBtn.addEventListener("click", () => (inputBox.value = ""));

deleteBtn.addEventListener("click", () => {
  inputBox.value = inputBox.value.slice(0, inputBox.value.length - 1);
  inputBox.focus();
});
