'use client'

import DragCards from "@/components/drag-cards";
import { CountdownItem } from "@/components/shifting-coutdown";
import { Modal, ModalBody, ModalContent, ModalTrigger } from "@/components/ui/animated-modal";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import MemoryGame from "@/components/memory-game";
import { SparklesCore } from "@/components/ui/sparkles";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

export default function Home() {
    const [confetti, setConfetti] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { width, height } = useWindowSize();

    const handleConfetti = () => {
        setConfetti(true);
        setTimeout(() => setConfetti(false), 10000);
    };

    const handleOpenModal = () => setIsModalOpen(true);

    return (
        <main>
            {confetti && <Confetti width={width - 10} height={height - 10} />}

            <section className="max-h-screen">
                <DragCards />
            </section>

            <Separator className="bg-neutral-100" />

            <section className="h-[200px] flex justify-center items-center">
                <div className="flex w-full items-center">
                    <CountdownItem unit="Day" text="days" onZero={handleConfetti} />
                    <CountdownItem unit="Hour" text="hours" onZero={handleConfetti} />
                    <CountdownItem unit="Minute" text="minutes" onZero={handleConfetti} />
                    <CountdownItem unit="Second" text="seconds" onZero={() => { handleConfetti(); handleOpenModal(); }} />
                </div>
            </section>

            <Separator className="bg-neutral-100" />

            <section className="md:py-16 py-10 mx-4">
                <div className="mt-20 -mb-40 w-full bg-neutral-950 flex flex-col items-center justify-center overflow-hidden rounded-md">
                    <h2 className="text-lg lg:text-xl text-center text-neutral-200 relative z-20">
                        memory surprise test.
                    </h2>
                    <h1 className="text-4xl lg:text-6xl font-bold text-center text-white relative z-20">
                        let&apos;s play a game!
                    </h1>
                    <div className="w-[40rem] h-40 relative">
                        {/* Gradients */}
                        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-pink-500 to-transparent h-[2px] w-3/4 blur-sm" />
                        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-pink-500 to-transparent h-px w-3/4" />
                        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-red-500 to-transparent h-[5px] w-1/4 blur-sm" />
                        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-red-500 to-transparent h-px w-1/4" />

                        {/* Core component */}
                        <SparklesCore
                            background="transparent"
                            minSize={0.4}
                            maxSize={1}
                            particleDensity={1200}
                            className="w-full h-full"
                            particleColor="#FFFFFF"
                        />

                        {/* Radial Gradient to prevent sharp edges */}
                        <div className="absolute inset-0 h-full bg-neutral-950 [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
                    </div>
                </div>
                <MemoryGame />
            </section>
        </main>
    );
}