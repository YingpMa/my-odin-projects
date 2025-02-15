const displayValue = document.querySelector(".display");

let firstNumber = null;
let operator = null;
let secondNumber = false;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b !== 0) {
        return a / b;
    } else {
        return "Error";
    }
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            updateDisplay("Error");
    }
}

function updateDisplay(result) {
    displayValue.textContent = result;
}

function resetCalculator() {
    firstNumber = null;
    operator = null;
    secondNumber = false;
    updateDisplay("0");
}

function handleDelete() {
    const currentDisplay = displayValue.textContent;
    if (currentDisplay.length === 0) {
        updateDisplay("0");
    } else {
        updateDisplay(currentDisplay.slice(0, -1));
    }
}

function handleDigit(digit) {
    const currentDisplay = displayValue.textContent;

    if (secondNumber) {
        updateDisplay(digit);
        secondNumber = false;
    } else {
        updateDisplay(currentDisplay === "0" ? digit : currentDisplay + digit);
    }
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue.textContent);

    if (firstNumber === null && !isNaN(inputValue)) {
        firstNumber = inputValue;
    } else if (operator) {
        const result = operate(operator, firstNumber, inputValue);
        updateDisplay(roundResult(result));
        firstNumber = result;
    }

    operator = nextOperator === "=" ? null : nextOperator;
    secondNumber = true;
}

function handleEqual() {
    if (operator && firstNumber !== null) {
        const inputValue = parseFloat(displayValue.textContent);
        const result = operate(operator, firstNumber, inputValue);
        updateDisplay(roundResult(result));
        firstNumber = null;
        operator = null;
        secondNumber = false;
    }
}

function roundResult(value, decimals = 2) {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
}

const buttons = document.querySelectorAll(".buttons button");
buttons.forEach( button => {
    button.addEventListener('click', () => {
        const buttonType = button.classList.contains("number") ? "number" : "operator";
        const value = button.textContent;
        if (buttonType === "number") {
            handleDigit(value);
        } else {
            const operatorValue = button.getAttribute("data-operator");
            if (operatorValue === 'AC') {
                resetCalculator();
            } else if (operatorValue === 'DEL') {
                handleDelete();
            } else if (operatorValue === '=') {
                handleEqual();
            } else {
                handleOperator(operatorValue);
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", resetCalculator);