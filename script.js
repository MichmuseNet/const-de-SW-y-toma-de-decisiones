let currentOperation = "";
let result=0;

function handleClick(button) {
    if (button==="CE") {
        currentOperation = "";
        displayNumber("0");
        return;
    }
    if (button === "+/-") {
        if (currentOperation ==="" || currentOperation=== "0") return;

        let operatorIndex =-1;
        const operators = ["+","-","*","/","^"];

        for (let i = currentOperation.length - 1;i >= 0;i--) {
            if (operators.includes(currentOperation[i])) {
                operatorIndex =i;
                break;
            }
        }
        if (operatorIndex ===-1) {
            currentOperation= currentOperation.startsWith("-") ? currentOperation.slice(1) : "-" + currentOperation;
        } else {
            let beforeOperator = currentOperation.slice(0, operatorIndex + 1);
            let number = currentOperation.slice(operatorIndex + 1);
            number = number.startsWith("-") ? number.slice(1) : "-" + number;
            currentOperation = beforeOperator + number;
        }

        displayNumber(currentOperation);
        return;
    }
    if (button=== ".") {
        let parts =currentOperation.split(/[\+\-\*\/\^]/);
        let lastPart =parts[parts.length - 1];

        if (!lastPart.includes(".")) {
            currentOperation+=".";
            displayNumber(currentOperation);
        }
        return;
    }
    const operators = ["+","-","*","/","^"];
    if (operators.includes(button)) {
        if (currentOperation==="" && button !=="-") return;
        let lastChar =currentOperation[currentOperation.length -1];
        if (operators.includes(lastChar)) return;
    }

    currentOperation =(currentOperation==="0") ? button : currentOperation+ button;
    displayNumber(currentOperation);
}

function calculate() {
    if (currentOperation=== "") return;
    let operators = ["+","-","*","/","^"];
    let operatorIndex = -1;
    let operator ="";
    for (let i= 1; i <currentOperation.length; i++) {
        if (operators.includes(currentOperation[i])) {
            operatorIndex= i;
            operator= currentOperation[i];
            break;
        }
    }
    if (operatorIndex ===-1) {
        displayNumber("Error");
        return;
    }
    let a = Number(currentOperation.slice(0,operatorIndex));
    let b = Number(currentOperation.slice(operatorIndex + 1));

    if (isNaN(a) || isNaN(b)) {
        displayNumber("Error");
        return;
    }
    if (operator==="+") result= a+ b;
    if (operator=== "-") result= a- b;
    if (operator=== "*") result= a* b;
    if (operator=== "/") {
        if (b===0) {
            displayNumber("Error");
            currentOperation="";
            return;
        }
        result=a/b;
    }
    if (operator==="^") result = a ** b;

    displayNumber(result);
    addToHistory(currentOperation, result);
    currentOperation = result.toString();
}

function displayNumber(number) {
    document.getElementById("screen").innerHTML= number;
}

function addToHistory(operation, result) {
    let history =document.getElementById("history");

    let historyItem =document.createElement("div");
    historyItem.className ="history-item";

    let operationText =document.createElement("div");
    operationText.className ="history-operation";
    operationText.innerHTML =operation;

    let resultText =document.createElement("div");
    resultText.className ="history-result";
    resultText.innerHTML ="= "+ result;

    historyItem.appendChild(operationText);
    historyItem.appendChild(resultText);
    history.prepend(historyItem);
}
function clearHistory() {
    document.getElementById("history").innerHTML= "";
}