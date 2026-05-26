"use client";
import {useState} from "react";
import {evaluate} from "mathjs";

enum ButtonType {
    NUMBER,
    OPERATOR,
    ACTION
}

interface ICalcButton {
    displayName: string;
    type: ButtonType;
    action: (current: string) => string;
}

function endsWithOperator(equation: string): boolean {
    return /[+\-*/]$/.test(equation);
}

export default function Home() {
    const [equation, setEquation] = useState<string>("");

    const buttons: ICalcButton[] = [
        { displayName: "%", type: ButtonType.OPERATOR, action: (cur) => cur + "%" },
        { displayName: "/", type: ButtonType.OPERATOR, action: (cur) => cur + "/" },
        { displayName: "*", type: ButtonType.OPERATOR, action: (cur) => cur + "*" },
        { displayName: "^", type: ButtonType.OPERATOR, action: (cur) => cur + "^" },

        { displayName: "7", type: ButtonType.NUMBER, action: (cur) => cur + "7" },
        { displayName: "8", type: ButtonType.NUMBER, action: (cur) => cur + "8" },
        { displayName: "9", type: ButtonType.NUMBER, action: (cur) => cur + "9" },
        { displayName: "<-", type: ButtonType.ACTION, action: (cur) => cur.slice(0, -1) },

        { displayName: "4", type: ButtonType.NUMBER, action: (cur) => cur + "4" },
        { displayName: "5", type: ButtonType.NUMBER, action: (cur) => cur + "5" },
        { displayName: "6", type: ButtonType.NUMBER, action: (cur) => cur + "6" },
        { displayName: "-", type: ButtonType.OPERATOR, action: (cur) => cur + "-" },

        { displayName: "1", type: ButtonType.NUMBER, action: (cur) => cur + "1" },
        { displayName: "2", type: ButtonType.NUMBER, action: (cur) => cur + "2" },
        { displayName: "3", type: ButtonType.NUMBER, action: (cur) => cur + "3" },
        { displayName: "+", type: ButtonType.OPERATOR, action: (cur) => cur + "+" },

        { displayName: ".", type: ButtonType.NUMBER, action: (cur) => cur + "." },
        { displayName: "0", type: ButtonType.NUMBER, action: (cur) => cur + "0" },
        { displayName: "=", type: ButtonType.ACTION, action: (cur) => {
                if (cur.length < 1) return cur;
                try {
                    return String(evaluate(cur));
                } catch {
                    return "Error";
                }
            }},
        { displayName: "C", type: ButtonType.ACTION, action: () => "" },
    ];

    const handleButtonClick = (button: ICalcButton) => {
        let current = equation;
        if (button.type === ButtonType.OPERATOR && endsWithOperator(current)) current = current.slice(0, -1);
        const nextState = button.action(current);

        setEquation(nextState);
    }

    return (
        <div className="flex flex-col flex-1 items-center justify-center font-sans bg-black">
            <div className="flex flex-col bg-zinc-100 rounded-2xl p-4 justify-center content-center gap-5">
                <div className="bg-gray-400 text-gray-100 min-w-60 h-10 rounded-xl text-end content-center text-xl tracking-[.2em] px-2">
                    {equation || 0}
                </div>
                <div className="grid grid-cols-4 gap-5">
                    {buttons.map((button) => (
                        <button
                            key={button.displayName}
                            onClick={() => handleButtonClick(button)}
                            className={`h-12 rounded-xl text-xl font-semibold transition-colors ${
                                button.type === ButtonType.OPERATOR
                                    ? "bg-orange-500 text-white hover:bg-orange-400"
                                    : button.type === ButtonType.ACTION
                                        ? "bg-gray-500 text-white hover:bg-gray-400"
                                        : "bg-zinc-700 text-white hover:bg-zinc-600"
                            }`}
                        >
                            {button.displayName}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
