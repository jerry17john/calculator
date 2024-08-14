const calcDisplay = document.getElementById('calc-display');
const calcButtons = document.querySelectorAll('.btn-number, .btn-clear, .btn-backspace, .btn-operator, .btn-equals, .btn-decimal');

let displayValue = '';
let firstOperand = '';
let currentOperator = '';
let secondOperand = '';
let calcResult = '';

calcButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const { target } = event;
        const { number } = target.dataset;
        const { operator: op } = target.dataset;

        if (number) {
            appendNumber(number);
        } else if (op) {
            chooseOperator(op);
        } else if (target.id === 'clear') {
            clearCalcDisplay();
        } else if (target.id === 'backspace') {
            removeLastCharacter();
        } else if (target.id === 'equals') {
            performCalculation();
        } else if (target.id === 'decimal') {
            appendDecimal();
        }
    });
});

function appendNumber(number) {
    if (calcResult) {
        clearCalcDisplay();
    }
    displayValue += number;
    updateCalcDisplay();
}

function chooseOperator(op) {
    if (displayValue && !currentOperator) {
        firstOperand = displayValue;
        currentOperator = op;
        displayValue += ` ${currentOperator} `;
        updateCalcDisplay();
    } else if (currentOperator && displayValue.split(' ').length < 3) {
        currentOperator = op;
        displayValue = displayValue.slice(0, -2) + ` ${currentOperator} `;
        updateCalcDisplay();
    }
}

function clearCalcDisplay() {
    displayValue = '';
    firstOperand = '';
    currentOperator = '';
    secondOperand = '';
    calcResult = '';
    updateCalcDisplay();
}

function removeLastCharacter() {
    if (displayValue) {
        if (displayValue.endsWith(' ')) {
            displayValue = displayValue.slice(0, -3);
        } else {
            displayValue = displayValue.slice(0, -1);
        }
        updateCalcDisplay();
    }
}

function appendDecimal() {
    if (currentOperator) {
        const parts = displayValue.split(' ');
        if (!parts[2].includes('.')) {
            displayValue += '.';
            updateCalcDisplay();
        }
    } else {
        if (!displayValue.includes('.')) {
            displayValue += '.';
            updateCalcDisplay();
        }
    }
}

function performCalculation() {
    const parts = displayValue.split(' ');
    if (parts.length === 3) {
        firstOperand = parts[0];
        currentOperator = parts[1];
        secondOperand = parts[2];
        const num1 = parseFloat(firstOperand);
        const num2 = parseFloat(secondOperand);

        switch (currentOperator) {
            case '+':
                calcResult = num1 + num2;
                break;
            case '-':
                calcResult = num1 - num2;
                break;
            case '*':
                calcResult = num1 * num2;
                break;
            case '/':
                calcResult = num1 / num2;
                break;
        }

        displayValue = calcResult.toString();
        updateCalcDisplay();
        currentOperator = '';
        firstOperand = '';
        secondOperand = '';
    }
}

function updateCalcDisplay() {
    calcDisplay.textContent = displayValue;
}