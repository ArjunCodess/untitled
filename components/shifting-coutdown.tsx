'use client'

import { useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const COUNTDOWN_FROM = "2024-07-31";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

type Units = "Day" | "Hour" | "Minute" | "Second";

export const CountdownItem = ({ unit, text, onZero }: { unit: Units; text: string; onZero: () => void }) => {
    const { ref, time } = useTimer(unit, onZero);

    return (
        <div className="flex h-24 w-1/4 flex-col items-center justify-center gap-1 border-r-[1px] border-l-[1px] border-slate-200 font-mono md:h-36 md:gap-2">
            <div className="relative w-full overflow-hidden text-center">
                <span
                    ref={ref}
                    className="block text-2xl font-medium md:text-4xl lg:text-6xl xl:text-7xl text-neutral-200"
                >
                    {time}
                </span>
            </div>
            <span className="text-xs font-light text-neutral-400 md:text-sm lg:text-base">
                {text}
            </span>
        </div>
    );
};

export const useTimer = (unit: Units, onZero: () => void) => {
    const [ref, animate] = useAnimate();

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const timeRef = useRef(0);

    const [time, setTime] = useState(0);

    useEffect(() => {
        intervalRef.current = setInterval(handleCountdown, 1000);

        return () => clearInterval(intervalRef.current || undefined);
    }, []);

    const handleCountdown = async () => {
        const end = new Date(COUNTDOWN_FROM);
        const now = new Date();
        const distance = Math.max(0, +end - +now);

        let newTime = 0;

        if (unit === "Day") newTime = Math.floor(distance / DAY);
        else if (unit === "Hour") newTime = Math.floor((distance % DAY) / HOUR);
        else if (unit === "Minute") newTime = Math.floor((distance % HOUR) / MINUTE);
        else newTime = Math.floor((distance % MINUTE) / SECOND);

        if (newTime !== timeRef.current) {
            await animate(
                ref.current,
                { y: ["0%", "-50%"], opacity: [1, 0] },
                { duration: 0.35 }
            );

            timeRef.current = newTime;
            setTime(newTime);

            await animate(
                ref.current,
                { y: ["50%", "0%"], opacity: [0, 1] },
                { duration: 0.35 }
            );
        }

        // Trigger confetti when all units are zero
        if (distance === 0 && unit === "Second") {
            onZero();
        }
    };

    return { ref, time };
};