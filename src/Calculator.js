import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    const handleClick = (value) => {
        if (value === 'C') {
            setInput('');
            setResult('');
        } else if (value === '=') {
            try {
                const formatted = input.replace(/×/g, '*').replace(/÷/g, '/');
                setResult(eval(formatted).toString());
            } catch {
                setResult('Error');
            }
        } else {
            setInput(input + value);
        }
    };

    const buttons = [
        ['C', '+/-', '%', '÷'],
        ['7', '8', '9', '×'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '+'],
        ['0', '.', '='],
    ];

    return (
        <div className="calculator">
            <div className="display">
                <div className="input">{input || '0'}</div>
                <div className="result">{result}</div>
            </div>
            <div className="buttons">
                {buttons.map((row, i) => (
                    <div key={i} className="row">
                        {row.map((btn) => (
                            <button
                                key={btn}
                                className={`btn ${btn === '0' ? 'zero' : ''} ${isNaN(btn) && btn !== '.' ? 'operator' : ''}`}
                                onClick={() => handleClick(btn)}
                            >
                                {btn}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calculator;
