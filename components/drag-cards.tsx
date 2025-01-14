'use client'

import React, { MutableRefObject, useRef, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const DragCards = () => {
    return (
        <section className="relative grid min-h-screen w-full place-content-center overflow-hidden">
            <h2 className="relative z-0 text-[20vw] font-black text-neutral-800 md:text-[200px]">
                MISHIKA<span className="text-[#f6c492]">.</span>
            </h2>
            <Cards />
        </section>
    );
};

const Cards = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    return (
        <div className="absolute inset-0 z-10" ref={containerRef}>
            <Card
                containerRef={containerRef}
                src="/images/collage1.jfif"
                alt="Mishika's Picture"
                rotate="6deg"
                top="20%"
                left="25%"
                className="w-36 md:w-56"
            />
            <Card
                containerRef={containerRef}
                src="/images/collage4.jfif"
                alt="Mishika's Picture"
                rotate="12deg"
                top="45%"
                left="60%"
                className="w-24 md:w-48"
            />
            <Card
                containerRef={containerRef}
                src="/images/collage3.jfif"
                alt="Mishika's Picture"
                rotate="-6deg"
                top="20%"
                left="40%"
                className="w-52 md:w-80"
            />
            <Card
                containerRef={containerRef}
                src="/images/collage2.jfif"
                alt="Mishika's Picture"
                rotate="8deg"
                top="50%"
                left="40%"
                className="w-48 md:w-72"
            />
            <Card
                containerRef={containerRef}
                src="/images/collage5.jfif"
                alt="Mishika's Picture"
                rotate="18deg"
                top="20%"
                left="65%"
                className="w-40 md:w-64"
            />
            <Card
                containerRef={containerRef}
                src="/images/collage6.jfif"
                alt="Mishika's Picture"
                rotate="-3deg"
                top="35%"
                left="55%"
                className="w-24 md:w-48"
            />
        </div>
    );
};

interface Props {
    containerRef: MutableRefObject<HTMLDivElement | null>;
    src: string;
    alt: string;
    top: string;
    left: string;
    rotate: string;
    className?: string;
}
const Card = ({
    containerRef,
    src,
    alt,
    top,
    left,
    rotate,
    className,
}: Props) => {
    const [zIndex, setZIndex] = useState(0);

    const updateZIndex = () => {
        const els = document.querySelectorAll(".drag-elements");

        let maxZIndex = -Infinity;

        els.forEach((el) => {
            let zIndex = parseInt(
                window.getComputedStyle(el).getPropertyValue("z-index")
            );

            if (!isNaN(zIndex) && zIndex > maxZIndex) maxZIndex = zIndex;
        });

        setZIndex(maxZIndex + 1);
    };

    return (
        <motion.img
            onMouseDown={updateZIndex}
            style={{
                top,
                left,
                rotate,
                zIndex,
            }}
            className={twMerge(
                "drag-elements absolute w-48 bg-neutral-200 p-1 pb-4",
                className
            )}
            src={src}
            alt={alt}
            drag
            dragConstraints={containerRef}
            dragElastic={0.65}
        />
    );
};

export default DragCards;