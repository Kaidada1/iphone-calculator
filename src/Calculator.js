import React, { useState } from "react";
import "./Calculator.css";

function App() {
    const [current, setCurrent] = useState("0");
    const [previous, setPrevious] = useState("");
    const [operator, setOperator] = useState(null);
    const [overwrite, setOverwrite] = useState(false);

    const appendNumber = (number) => {
        if (overwrite) {
            setCurrent(number);
            setOverwrite(false);
        } else {
            setCurrent(current === "0" ? number : current + number);
        }
    };

    const chooseOperator = (op) => {
        if (current === "") return;

        if (previous !== "" && !overwrite) {
            calculate();
            setPrevious(current);
        } else {
            setPrevious(current);
        }

        setOperator(op);
        setOverwrite(true);
    };

    const clear = () => {
        setCurrent("0");
        setPrevious("");
        setOperator(null);
        setOverwrite(false);
    };

    const toggleSign = () => {
        setCurrent((prev) => (prev.charAt(0) === "-" ? prev.slice(1) : "-" + prev));
    };

    const percent = () => {
        setCurrent((prev) => (parseFloat(prev) / 100).toString());
    };

    const calculate = () => {
        if (operator == null || previous === "") return;

        const a = parseFloat(previous);
        const b = parseFloat(current);
        let result = 0;

        switch (operator) {
            case "+":
                result = a + b;
                break;
            case "-":
                result = a - b;
                break;
            case "×":
                result = a * b;
                break;
            case "÷":
                result = a / b;
                break;
            default:
                return;
        }

        setCurrent(result.toString());
        setPrevious(`${previous} ${operator} ${current}`);
        setOperator(null);
        setOverwrite(true);
    };


    return (
        <div className="calculator">
            <div className="display">
                <div className="previous">{operator ? `${previous} ${operator}` : previous}</div>
                <div className="current">{current}</div>
            </div>

            <div className="button-grid">
                <button className="button function" onClick={clear}>AC</button>
                <button className="button function" onClick={toggleSign}>±</button>
                <button className="button function" onClick={percent}>%</button>
                <button className="button operator" onClick={() => chooseOperator("÷")}>÷</button>

                <button className="button number" onClick={() => appendNumber("7")}>7</button>
                <button className="button number" onClick={() => appendNumber("8")}>8</button>
                <button className="button number" onClick={() => appendNumber("9")}>9</button>
                <button className="button operator" onClick={() => chooseOperator("×")}>×</button>

                <button className="button number" onClick={() => appendNumber("4")}>4</button>
                <button className="button number" onClick={() => appendNumber("5")}>5</button>
                <button className="button number" onClick={() => appendNumber("6")}>6</button>
                <button className="button operator" onClick={() => chooseOperator("-")}>−</button>

                <button className="button number" onClick={() => appendNumber("1")}>1</button>
                <button className="button number" onClick={() => appendNumber("2")}>2</button>
                <button className="button number" onClick={() => appendNumber("3")}>3</button>
                <button className="button operator" onClick={() => chooseOperator("+")}>+</button>

                <button className="button number zero" onClick={() => appendNumber("0")}>0</button>
                <button className="button number" onClick={() => appendNumber(".")}>.</button>
                <button className="button operator" onClick={calculate}>=</button>
            </div>
        </div>
    );
}

export default App;
