import { useState, useRef } from "react";
import bar from "@/assets/slots/bar.png";
import bell from "@/assets/slots/bell.png";
import cherries from "@/assets/slots/cherries.png";
import diamond from "@/assets/slots/diamond.png";
import grapes from "@/assets/slots/grapes.png";
import horseshoe from "@/assets/slots/horseshoe.png";
import lemon from "@/assets/slots/lemon.png";
import money from "@/assets/slots/money.png";
import seven from "@/assets/slots/seven.png";
import watermelon from "@/assets/slots/watermelon.png";
import { Button } from "@/components/ui/button";
import anton from "@/assets/images/anton.png"

import confetti from "canvas-confetti";

const images = [
    bar,
    bell,
    cherries,
    diamond,
    grapes,
    horseshoe,
    lemon,
    money,
    seven,
    watermelon,
];

type ReelIndexes = [number, number, number];

const SYMBOLS = [
    "bar",
    "bell",
    "cherries",
    "diamond",
    "grapes",
    "horseshoe",
    "lemon",
    "money",
    "seven",
    "watermelon",
];

const PAYOUTS = {
    jackpot: 100,
    triple: 20,
    double: 5,
    seven_middle: 50,
    cherries_any: 2,
};

function getWinType(reels: ReelIndexes): {
    type: string | null;
    payout: number;
} {
    const [a, b, c] = reels.map((i) => SYMBOLS[i]);

    if (a === "seven" && b === "seven" && c === "seven") {
        return { type: "jackpot", payout: PAYOUTS.jackpot };
    }

    if (a === b && b === c) {
        return { type: "triple", payout: PAYOUTS.triple };
    }

    if (a === b || b === c || a === c) {
        return { type: "double", payout: PAYOUTS.double };
    }

    if (b === "seven") {
        return { type: "seven_middle", payout: PAYOUTS.seven_middle };
    }

    if ([a, b, c].includes("cherries")) {
        return { type: "cherries_any", payout: PAYOUTS.cherries_any };
    }

    return { type: null, payout: 0 };
}

const FUN_MESSAGES = [
    "Try your luck! 🍀",
    "Feeling lucky today?",
    "Spin to win!",
    "Maybe this time...",
    "Jackpot is waiting!",
    "Arrr! Give it a spin, matey! 🏴‍☠️",
    "Will fortune smile on you?",
    "Let’s go!",
    "Big win incoming!",
    "Don’t stop now!",
];

export default function Slots() {
    const [reels, setReels] = useState<ReelIndexes>([0, 0, 0]);
    const [spinning, setSpinning] = useState(false);
    const [showFireworks, setShowFireworks] = useState(false);
    const [win, setWin] = useState<{ type: string | null; payout: number }>({
        type: null,
        payout: 0,
    });
    const [funMsg, setFunMsg] = useState(FUN_MESSAGES[0]);
    const [shake, setShake] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    function spin() {
        setSpinning(true);
        setShowFireworks(false);
        setWin({ type: null, payout: 0 });
        setFunMsg(
            FUN_MESSAGES[Math.floor(Math.random() * FUN_MESSAGES.length)]
        );
        setShake(false);
        let spins = 0;
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setReels([
                Math.floor(Math.random() * images.length),
                Math.floor(Math.random() * images.length),
                Math.floor(Math.random() * images.length),
            ] as ReelIndexes);
            spins++;
            if (spins > 20) {
                if (intervalRef.current) clearInterval(intervalRef.current);

                const final = [
                    Math.floor(Math.random() * images.length),
                    Math.floor(Math.random() * images.length),
                    Math.floor(Math.random() * images.length),
                ] as ReelIndexes;
                setReels(final);
                setSpinning(false);
                const result = getWinType(final);
                setWin(result);
                if (
                    result.type === "jackpot" ||
                    result.type === "triple" ||
                    result.type === "seven_middle"
                ) {
                    setTimeout(() => setShowFireworks(true), 300);
                    confetti({
                        particleCount: 120,
                        spread: 90,
                        origin: { y: 0.6 },
                    });
                } else if (result.type === null) {
                    setShake(true);
                }
            }
        }, 80);
    }

    return (
        <div className=" relative p-10 flex flex-col items-center justify-center overflow-hidden min-h-screen">
            <h1 className="text-5xl font-rumisgone mb-4 text-yellow-300 drop-shadow-lg animate-bounce">
                Pirate Slots
            </h1>
            <div className="mb-2 text-lg italic animate-pulse">
                {funMsg}
            </div>
            <div
                className={`flex justify-center items-center space-x-4 mb-4 transition-all duration-300 ${
                    shake ? "animate-shake" : ""
                }`}
            >
                {reels.map((idx, i) => (
                    <img
                        key={i}
                        src={images[idx]}
                        alt="slot"
                        className={`w-28 h-28 border-4 border-yellow-400 p-3 bg-green-900 rounded-2xl shadow-xl transition-transform duration-300 ${
                            spinning ? "animate-spin-slow" : "scale-110"
                        }`}
                        style={{ transition: "transform 0.3s" }}
                    />
                ))}
            </div>
            <Button
                onClick={spin}
                className="bg-yellow-500 px-14 py-8 text-2xl text-white rounded-full font-extrabold shadow-2xl border-4 animate-wiggle"
                disabled={spinning}
            >
                {spinning ? "Spinning..." : "SPIN!"}
            </Button>
            {win.type && (
                <div className="mt-6 text-center text-3xl font-extrabold text-yellow-200 animate-pop">
                    {win.type === "jackpot" && "JACKPOT! 💰"}
                    {win.type === "triple" && "Three same icons!"}
                    {win.type === "double" && "Two same icons!"}
                    {win.type === "seven_middle" && "Seven in the middle!"}
                    {win.type === "cherries_any" && "Cherries."}
                    <div className="text-2xl text-green-300 mt-2 animate-bounce">
                        You win: {win.payout} shell$
                    </div>
                </div>
            )}
            {showFireworks && <Fireworks />}
            <style>{`
                @keyframes spin-slow {
                    0% { transform: rotate(0deg) scale(1); filter: blur(3px); }
                    100% { transform: rotate(360deg) scale(1.3); }
                }
                .animate-spin-slow {
                    animation: spin-slow 0.3s linear infinite;
                }
                @keyframes shake {
                    0% { transform: translateX(0); }
                    20% { transform: translateX(-10px); }
                    40% { transform: translateX(10px); }
                    60% { transform: translateX(-10px); }
                    80% { transform: translateX(10px); }
                    100% { transform: translateX(0); }
                }
                .animate-shake {
                    animation: shake 0.5s;
                }
                @keyframes pop {
                    0% { transform: scale(0.7); opacity: 0; }
                    80% { transform: scale(1.1); opacity: 1; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .animate-pop {
                    animation: pop 0.5s;
                }
                @keyframes wiggle {
                    0%, 100% { transform: rotate(-2deg); }
                    50% { transform: rotate(2deg); }
                }
                .animate-wiggle {
                    animation: wiggle 1.2s infinite;
                }
            `}</style>
            <div className="absolute top-0 right-0 w-70">
                <img src={anton} className="w-70" alt="" />
                <span>keep gambling i believe in u</span>
            </div>
        </div>
    );
}

function Fireworks() {
    return (
        <div className="pointer-events-none fixed inset-0 flex items-center justify-center z-50">
            <svg width="300" height="300">
                <g>
                    <circle cx="150" cy="150" r="10" fill="#fff700" />
                    {[...Array(12)].map((_, i) => (
                        <line
                            key={i}
                            x1="150"
                            y1="150"
                            x2={150 + 100 * Math.cos((i * 2 * Math.PI) / 12)}
                            y2={150 + 100 * Math.sin((i * 2 * Math.PI) / 12)}
                            stroke="#ff3c00"
                            strokeWidth="4"
                            strokeDasharray="8,4"
                        />
                    ))}
                </g>
            </svg>
        </div>
    );
}
