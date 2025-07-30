'use client'

import { useState } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import DragCards from "@/components/drag-cards";
import { CountdownItem } from "@/components/shifting-coutdown";
import { Separator } from "@/components/ui/separator";
import MemoryGame from "@/components/memory-game";

export default function HomeClient() {
  const [confetti, setConfetti] = useState(false);
  const [, setIsModalOpen] = useState(false);

  const { width, height } = useWindowSize();

  const handleConfetti = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 10000);
  };

  const handleOpenModal = () => setIsModalOpen(true);

  return (
    <>
      {confetti && <Confetti width={width - 10} height={height - 10} />}
      
      <div className="h-screen flex items-center justify-center">
        <DragCards />
      </div>
      
      <Separator className="bg-neutral-100" />
      
      <section className="h-[200px] flex justify-center items-center w-full overflow-hidden">
        <div className="flex w-full justify-center">
          <CountdownItem unit="Day" text="days" onZero={handleConfetti} />
          <CountdownItem unit="Hour" text="hours" onZero={handleConfetti} />
          <CountdownItem unit="Minute" text="minutes" onZero={handleConfetti} />
          <CountdownItem unit="Second" text="seconds" onZero={() => { handleConfetti(); handleOpenModal(); }} />
        </div>
      </section>
      
      <Separator className="bg-neutral-100" />
      
      <section className="py-16 md:py-24 px-4">
        <div className="w-full bg-neutral-950 flex flex-col items-center justify-center overflow-hidden rounded-md mb-16">
          <h2 className="text-lg lg:text-xl text-center text-neutral-200 relative z-20 pt-8">
            memory surprise test.
          </h2>
          <h1 className="text-4xl lg:text-6xl font-bold text-center text-white relative pb-8">
            let&apos;s play a game!
          </h1>
        </div>
        
        <MemoryGame />
      </section>
    </>
  );
}