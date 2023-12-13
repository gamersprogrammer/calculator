const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator-keys');
const display = document.querySelector('.calculator-display');

let previousKeyType = '';

keys.addEventListener("click", e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;

        // Clear all pressed classes
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('pressed'));

        // Handling number keys and decimal
        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = keyContent;
            } else {
                display.textContent = displayedNum + keyContent;
            }
            previousKeyType = 'number';
            calculator.dataset.previousKeyType = 'number';
        }

        // Handling operators
        if (
            action === 'add' ||
            action === 'minus' ||
            action === 'divide' ||
            action === 'multiply'
        ) {
            key.classList.add('pressed');
            calculator.dataset.previousKeyType = 'operator';
            previousKeyType = 'operator';
            calculator.dataset.firstValue = displayedNum;
            calculator.dataset.operator = action;
        }

        // Handling decimal
        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.';
            } else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = '0.';
            }
            calculator.dataset.previousKeyType = 'decimal';
        }

        // Handling clear key
        if (action === 'clear') {
            display.textContent = '0';
            previousKeyType = 'clear';
            calculator.dataset.previousKeyType = 'clear';
            calculator.dataset.firstValue = '';
            calculator.dataset.operator = '';
        }

        // Handling equal key
        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;

            if (firstValue && operator) {
                const calcValue = calculate(firstValue, operator, secondValue);
                display.textContent = calcValue;
                calculator.dataset.firstValue = calcValue;
            }

            previousKeyType = 'calculate';
            calculator.dataset.previousKeyType = 'calculate';
        }
    }
});

// Function to perform calculations
const calculate = (n1, operator, n2) => {
    let result = '';

    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2);
    } else if (operator === 'minus') {
        result = parseFloat(n1) - parseFloat(n2);
    } else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2);
    } else if (operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2);
    }

    return result;
};
