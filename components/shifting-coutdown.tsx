'use client'

import { useAnimate } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

// Countdown target date
const COUNTDOWN_FROM = "2025-07-31T00:00:00"; // Midnight at the start of the day

// Constants for time calculations
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

// Type for units
type Units = "Day" | "Hour" | "Minute" | "Second";

// CountdownItem component
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

// useTimer hook
export const useTimer = (unit: Units, onZero: () => void) => {
    const [ref, animate] = useAnimate(); // Using framer-motion for animation
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const timeRef = useRef(0);
    const refElement = useRef<HTMLElement | null>(null);
    const [time, setTime] = useState(0);

    // Store the ref element when it changes
    useEffect(() => {
        if (ref.current) {
            refElement.current = ref.current;
        }
    }, [ref]);

    // Use useCallback to memoize the handleCountdown function
    const handleCountdown = useCallback(async () => {
        const end = new Date(COUNTDOWN_FROM);
        const now = new Date();
        const distance = Math.max(0, +end - +now); // Calculate distance

        let newTime = 0;

        // Calculate new time based on unit
        if (unit === "Day") newTime = Math.floor(distance / DAY);
        else if (unit === "Hour") newTime = Math.floor((distance % DAY) / HOUR);
        else if (unit === "Minute") newTime = Math.floor((distance % HOUR) / MINUTE);
        else newTime = Math.floor((distance % MINUTE) / SECOND);

        // Don't attempt animation if the element doesn't exist
        if (!refElement.current) return;

        if (newTime !== timeRef.current) {
            try {
                // Animate out old value
                await animate(
                    refElement.current,
                    { y: ["0%", "-50%"], opacity: [1, 0] },
                    { duration: 0.35 }
                );

                timeRef.current = newTime;
                setTime(newTime);

                // Animate in new value
                await animate(
                    refElement.current,
                    { y: ["50%", "0%"], opacity: [0, 1] },
                    { duration: 0.35 }
                );
            } catch (error) {
                // Just update the time without animation if there's an error
                timeRef.current = newTime;
                setTime(newTime);
            }
        }

        // Trigger confetti when all units are zero
        if (distance === 0 && unit === "Second") {
            onZero();
        }
    }, [animate, unit, onZero]);

    useEffect(() => {
        // Start countdown interval
        intervalRef.current = setInterval(handleCountdown, 1000);

        // Cleanup interval on unmount
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [handleCountdown]);

    return { ref, time };
};