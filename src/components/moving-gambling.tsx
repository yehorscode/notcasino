import apple from "@/assets/slots/apple.png";
import bar from "@/assets/slots/bar.png";
import bell from "@/assets/slots/bell.png";
import cherries from "@/assets/slots/cherries.png";
import crown from "@/assets/slots/crown.png";
import diamond from "@/assets/slots/diamond.png";
import dollar from "@/assets/slots/dollar.png";
import grapes from "@/assets/slots/grapes.png";
import horseshoe from "@/assets/slots/horseshoe.png";
import lemon from "@/assets/slots/lemon.png";
import money from "@/assets/slots/money.png";
import orange from "@/assets/slots/orange.png";
import seven from "@/assets/slots/seven.png";
import slotmachine from "@/assets/slots/slot-machine.png";
import star from "@/assets/slots/star.png";
import watermelon from "@/assets/slots/watermelon.png";


const icons = [
    apple, bar, bell, cherries, crown, diamond, dollar, grapes, horseshoe, lemon, money, orange, seven, slotmachine, star, watermelon
]

export default function MovingGamblingBar() {
    return (
        <div className="w-full bg-blue-500 overflow-hidden">
            <div className="h-full pt-6 pb-6  flex items-center justify-start" style={{animation: "move 5s linear infinite"}}>
                <style>{`
                    @keyframes move {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(-100%);
                        }
                    }
                `}</style>
                {Array.from({ length: 100 }).map((_, i) => (
                    <img key={i} src={icons[i % icons.length]} className="h-10 w-auto mr-5" alt="" />
                ))}

            </div>
        </div>
    );
}
