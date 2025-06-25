import { useState, useRef, useEffect } from "react";
import sergei from "@/assets/images/sergei.jpg";
import { Button } from "@/components/ui/button";

const NUMBERS = Array.from({ length: 37 }, (_, i) => i);
const REDS = [
    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
];

function getColor(num: number) {
    if (num === 0) return "green";
    if (REDS.includes(num)) return "red";
    return "black";
}

export default function Roulette() {
    const phrases = [
        "What you bettin' on today boss",
        "You're a winner my friend",
        "Keep gambling",
        "You almost won",
        "You almost lost",
        "Always on red",
        "Always on black",
        "No, vladimir vladimirovich isnt my boss",
        "They taught me this in mather russia",
        "Want a drink?",
        "Pavel, idi ka suda, u nas novyj klient",
        "ja rabotal w fsb",
    ];
    const [currentNumber, setCurrentNumber] = useState<number | null>(null);
    const [phrase, setPhrase] = useState(phrases[0]);
    const [result, setResult] = useState<string | null>(null);
    const [spinning, setSpinning] = useState(false);
    const [barOffset, setBarOffset] = useState(0);
    const [shells, setShells] = useState(() => {
        const stored = localStorage.getItem("shells");
        return stored ? parseInt(stored, 10) : 0;
    });
    const barRef = useRef<HTMLDivElement>(null);

    function spinRoulette(bet: string) {
        setShells((prev) => prev - 1);
        if (spinning) return;
        setSpinning(true);
        setResult(null);

        const num = Math.floor(Math.random() * 37);
        setCurrentNumber(num);
        setPhrase(phrases[Math.floor(Math.random() * phrases.length)]);

        setTimeout(() => {
            if (!barRef.current) return;
            const bar = barRef.current;
            const numberWidth = bar.scrollWidth / (NUMBERS.length * 3);
            const center = window.innerWidth / 2;

            const index = NUMBERS.length + num;
            const offset = index * numberWidth - center + numberWidth / 2;
            setBarOffset(offset);

            setTimeout(() => {
                let win = false;
                let reward = 0;
                if (bet === "Red" && getColor(num) === "red") {
                    win = true;
                    reward = 2;
                }
                if (bet === "Black" && getColor(num) === "black") {
                    win = true;
                    reward = 2;
                }
                if (bet === "Green" && num === 0) {
                    win = true;
                    reward = 14;
                }
                if (bet === "Even" && num !== 0 && num % 2 === 0) {
                    win = true;
                    reward = 2;
                }
                if (bet === "Odd" && num % 2 === 1) {
                    win = true;
                    reward = 2;
                }
                if (bet === "1-12" && num >= 1 && num <= 12) {
                    win = true;
                    reward = 3;
                }
                if (bet === "13-24" && num >= 13 && num <= 24) {
                    win = true;
                    reward = 3;
                }
                if (bet === "25-36" && num >= 25 && num <= 36) {
                    win = true;
                    reward = 3;
                }
                if (win) {
                    const newShells = shells + reward;
                    setShells(newShells);
                }
                setResult(win ? `You win! +${reward} shell$` : "You lose!");
                setSpinning(false);
            }, 1200);
        }, 100);
    }

    useEffect(() => {
        localStorage.setItem("shells", shells.toString());
    }, [shells]);

    const rouletteBar = Array(3)
        .fill(NUMBERS)
        .flat()
        .map((num, i) => (
            <div
                key={i}
                className={`flex flex-col items-center justify-center h-24 min-w-[60px] max-w-[60px] border border-gray-300 ${
                    getColor(num) === "red"
                        ? "bg-red-600"
                        : getColor(num) === "black"
                        ? "bg-black"
                        : "bg-green-600"
                } ${getColor(num) === "black" ? "text-white" : "text-black"} ${
                    currentNumber === num && spinning === false
                        ? "scale-110 ring-4 ring-yellow-400 z-10"
                        : ""
                }`}
                style={{ transition: "transform 0.2s" }}
            >
                <span className="text-xl font-bold">{num}</span>
            </div>
        ));

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-rumisgone mt-8 mb-4">
                Roulette (simple)
            </h1>
            <div className="mb-2 text-lg font-bold text-green-700">
                shell$: {shells}
            </div>
            {/* Pasek ruletki na całą szerokość */}
            <div className="relative w-full h-28 overflow-hidden mb-8">
                <div
                    className="absolute left-1/2 top-0 h-full w-1 bg-yellow-400 z-20"
                    style={{ transform: "translateX(-50%)" }}
                ></div>
                <div
                    ref={barRef}
                    className="flex flex-row items-center h-full transition-transform duration-[1200ms] ease-out"
                    style={{ transform: `translateX(-${barOffset}px)` }}
                >
                    {rouletteBar}
                </div>
            </div>
            {result && (
                <div
                    className={`mb-4 text-2xl font-bold ${
                        result === "You win!"
                            ? "text-green-600"
                            : "text-red-600"
                    }`}
                >
                    {result}
                </div>
            )}
            <div className="flex items-center mb-6">
                <img
                    src={sergei}
                    width="100"
                    alt="Sergei"
                    className="rounded shadow-lg"
                />
                <div className="ml-4 relative">
                    <div className=" border border-gray-300 rounded-xl px-4 py-2 shadow text-lg font-semibold min-w-[200px] max-w-xs">
                        {phrase}
                    </div>
                    <div
                        className="absolute left-0 -bottom-3 w-6 h-6  border-l border-b border-gray-300 rotate-45 -z-10"
                        style={{ marginLeft: "30px" }}
                    ></div>
                </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
                <Button
                    className="bg-red-500 text-white"
                    disabled={spinning}
                    onClick={() => spinRoulette("Red")}
                >
                    Red
                </Button>
                <Button
                    className="bg-black text-white"
                    disabled={spinning}
                    onClick={() => spinRoulette("Black")}
                >
                    Black
                </Button>
                <Button
                    className="bg-green-500 text-white"
                    disabled={spinning}
                    onClick={() => spinRoulette("Green")}
                >
                    Green
                </Button>
                <Button
                    className="bg-blue-700 text-white"
                    disabled={spinning}
                    onClick={() => spinRoulette("1-12")}
                >
                    1-12
                </Button>
                <Button
                    className="bg-blue-700 text-white"
                    disabled={spinning}
                    onClick={() => spinRoulette("13-24")}
                >
                    13-24
                </Button>
                <Button
                    className="bg-blue-700 text-white"
                    disabled={spinning}
                    onClick={() => spinRoulette("25-36")}
                >
                    25-36
                </Button>
                <Button
                    className="bg-amber-400"
                    disabled={spinning}
                    onClick={() => spinRoulette("Even")}
                >
                    Even
                </Button>
                <Button
                    className="bg-cyan-500"
                    disabled={spinning}
                    onClick={() => spinRoulette("Odd")}
                >
                    Odd
                </Button>
            </div>
        </div>
    );
}
