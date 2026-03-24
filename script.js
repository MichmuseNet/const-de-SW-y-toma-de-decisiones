//no mas de un operador

let fullOp = "";
let res = 0;

function handleClick(number) {
    console.log(number);

    if (number === "CE") {
        fullOp = "";
        showNumber(fullOp);
        return;
    }

//bloque para que el operador no se repita
    const operators=["+","-","*","/"]
    const isOperator=operators.includes(number);

    if (isOperator){
        if(fullOp===""){
            return
        }
    
    const alreadyHASoperator=operators.some(op=>fullOp.includes(op));
    if(alreadyHASoperator){
        return;
    }
}
//fin del bloque 
    fullOp = fullOp + number;
    showNumber(fullOp);

    
}

function calculate() {
    console.log({fullOp});

    const [a, op, b] = fullOp.split(/(\+|-|\*|\/)/gm);
    console.log({a, op, b});

    switch (op) {
        case "+":
            res = Number(a) + Number(b);
            break;

        case "-":
            res = Number(a) - Number(b);
            break;

        case "*":
            res = Number(a) * Number(b);
            break;

        case "/":
            res = Number(a) / Number(b);
            break;

        default:
            res = "Error";
            break;
    }

    showNumber(res);
    fullOp = res.toString();
}

function showNumber(n) {
    document.getElementById("screen").innerHTML = n;
}