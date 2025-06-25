import { Button } from "@/components/ui/button";

export default function Games() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="mb-10 text-center">
                <h1 className="text-5xl font-rumisgone mb-2">Games</h1>
                <span className="font-thin text-lg">Play as much as you want!</span>
            </div>
            <div className="flex flex-wrap gap-8 justify-center">
                <div className="bg-blue-500 text-white rounded-xl shadow-lg p-8 flex flex-col items-center w-72 hover:scale-105 transition-transform">
                    <h2 className="text-2xl font-bold mb-2">Slot machines</h2>
                    <span className="mb-4">Great, easy, classic</span>
                    <Button onClick={() => { window.location.href = "/games/slots" }}>Play</Button>
                </div>
                <div className="bg-green-600 text-white rounded-xl shadow-lg p-8 flex flex-col items-center w-72 hover:scale-105 transition-transform">
                    <h2 className="text-2xl font-bold mb-2">Roulette</h2>
                    <span className="mb-4">Risky, but fun</span>
                    <Button onClick={() => { window.location.href = "/games/roulette" }}>All on red</Button>
                </div>
            </div>
        </div>
    );
}
