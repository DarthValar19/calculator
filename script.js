let firstNumber = "";
let secondNumber = "";
let operator = null;
let operatorLastPressed = false;

function add(x, y){
    return x + y;
}

function substract(x, y){
    return x - y;
}

function multiply(x, y){
    return x * y;
}

function divide(x, y){
    if (y === 0){
        return "Division by zero!"
    }
    return x / y;
}

function operate(x, y, operator){
    switch(operator){
        case "+":
            return add(x, y);

        case "-":
            return substract(x, y);

        case "*":
            return multiply(x, y);

        case "/":
            return divide(x, y);       
    }

}

function addNumberButtons(){
    let parentDiv = document.querySelector("#calculator-buttons-container");
    let screen = document.querySelector("#calculator-screen");
    let buttons = parentDiv.querySelectorAll(".number");
    buttons.forEach(function(button){
        button.addEventListener("click", function(){
            let screenNumbers = screen.textContent;
            if (screenNumbers === "0" || (operatorLastPressed === true)){
                screen.textContent = button.textContent;
                operatorLastPressed = false;
                return;
            }
            screen.textContent = screenNumbers + button.textContent;
        })
    })
}

function operatorButtons(){
    let parentDiv = document.querySelector("#calculator-buttons-container");
    let screen = document.querySelector("#calculator-screen");
    let buttons = parentDiv.querySelectorAll(".operator");
    buttons.forEach(function(button){
        button.addEventListener("click", function(){
            if (operator === null && firstNumber === ""){
                firstNumber = screen.textContent;
                operator = button.textContent;
                operatorLastPressed = true;
            }
            else if (secondNumber === "" && firstNumber != "" && operatorLastPressed === false){
                secondNumber = screen.textContent;
                screen.textContent = `${operate(Number(firstNumber), Number(secondNumber), operator)}`;
                firstNumber = "";
                secondNumber = "";
                operator = null;
                operatorLastPressed = true;
            }
            
        })
    })
}

function equalButton(){
    let button = document.querySelector("#equal");
    let screen = document.querySelector("#calculator-screen");
    button.addEventListener("click", function(){
        if(secondNumber === "" && firstNumber != "" && operator != null){
            secondNumber = screen.textContent;
            screen.textContent = `${operate(Number(firstNumber), Number(secondNumber), operator)}`;
            firstNumber = "";
            secondNumber = "";
            operator = null;
            operatorLastPressed = true;
        }
    })
}

function clearButton(){
    let button = document.querySelector("#clear");
    let screen = document.querySelector("#calculator-screen");
    button.addEventListener("click", function(){
        screen.textContent = "0";
        firstNumber = "";
        secondNumber = "";
        operator = null;
        operatorLastPressed = false;
    })
}

addNumberButtons();
operatorButtons();
equalButton();
clearButton();