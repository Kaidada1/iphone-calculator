import React, { useState, useEffect } from "react";
import "./Calculator.css";
import { TiCalculator } from "react-icons/ti";
import { FaListUl } from "react-icons/fa6";


function App() {
    const [current, setCurrent] = useState("0");
    const [previous, setPrevious] = useState("");
    const [operator, setOperator] = useState(null);
    const [overwrite, setOverwrite] = useState(false);
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [currentTime, setCurrentTime] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const formatRelativeTime = (timestamp) => {
        const diff = Math.floor((currentTime - timestamp) / 1000);
        if (diff < 10) return "vừa xong";
        if (diff < 60) return `${diff} giây trước`;
        const diffMinutes = Math.floor(diff / 60);
        if (diffMinutes < 60) return `${diffMinutes} phút trước`;
        const diffHours = Math.floor(diffMinutes / 60);
        if (diffHours < 24) return `${diffHours} giờ trước`;
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays} ngày trước`;
    };

    const appendNumber = (number) => {
        if (overwrite) {
            setCurrent(number);
            setOverwrite(false);
        } else {
            if (number === "." && current.includes(".")) return;
            setCurrent(current === "0" && number !== "." ? number : current + number);
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
        setCurrent((prev) =>
            prev.charAt(0) === "-" ? prev.slice(1) : "-" + prev
        );
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
        setHistory((prev) => [
            ...prev,
            {
                expression: `${previous} ${operator} ${current}`,
                result: result.toString(),
                timestamp: Date.now()
            }
        ]);

    };

    const buttons = [
        ["AC", "function", clear],
        ["±", "function", toggleSign],
        ["%", "function", percent],
        ["÷", "operator", () => chooseOperator("÷")],

        ["7", "number", () => appendNumber("7")],
        ["8", "number", () => appendNumber("8")],
        ["9", "number", () => appendNumber("9")],
        ["×", "operator", () => chooseOperator("×")],

        ["4", "number", () => appendNumber("4")],
        ["5", "number", () => appendNumber("5")],
        ["6", "number", () => appendNumber("6")],
        ["-", "operator", () => chooseOperator("-")],

        ["1", "number", () => appendNumber("1")],
        ["2", "number", () => appendNumber("2")],
        ["3", "number", () => appendNumber("3")],
        ["+", "operator", () => chooseOperator("+")],

        [<TiCalculator size={50} />, "number", () => console.log("Calculator icon clicked")],
        ["0", "number", () => appendNumber("0")],
        [".", "number", () => appendNumber(".")],
        ["=", "operator", calculate]
    ];

    return (
        <div className="calculator">
            <div className="list" onClick={() => setShowHistory((prev) => !prev)}>
                <FaListUl />
            </div>
            <div className="display">
                <div className="previous">{operator ? `${previous} ${operator}` : previous}</div>
                <div className="current">{current}</div>
            </div>

            <div className="button-grid">
                {buttons.map(([label, className, onClick], index) => (
                    <button
                        key={index}
                        className={`button ${className}`}
                        onClick={onClick}
                    >
                        {label}
                    </button>
                ))}
            </div>
            {showHistory && (
                <div className="history-panel">
                    <div className="history-header">
                        <div className="drag-bar" />

                        <button className="close-btn" onClick={() => setShowHistory(false)}>
                            Xong
                        </button>
                    </div>
                    <div className="history-body">
                        <div>
                            {history.map((item, index) => (
                                <div>
                                    <div className="timestamp">{formatRelativeTime(item.timestamp)}</div>
                                    <div key={index} className="history-item">
                                        <div className="expression">{item.expression}</div>
                                        <div className="result">{item.result}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="history-footer">
                        <button className="edit-btn">Sửa</button>
                        <button className="delete-btn" onClick={() => setHistory([])}>
                            Xóa
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
