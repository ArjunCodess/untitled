'use client'

import { useState } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import DragCards from "@/components/drag-cards";
import { CountdownItem } from "@/components/shifting-coutdown";
import { Separator } from "@/components/ui/separator";
import MemoryGame from "@/components/memory-game";
import { SparklesCore } from "@/components/ui/sparkles";

export default function HomeClient() {
  const [confetti, setConfetti] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { width, height } = useWindowSize();

  const handleConfetti = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 10000);
  };

  const handleOpenModal = () => setIsModalOpen(true);

  return (
    <>
      {confetti && <Confetti width={width - 10} height={height - 10} />}
      
      <DragCards />
      
      <Separator className="bg-neutral-100" />
      
      <section className="h-[200px] flex justify-center items-center">
        <div className="flex w-full items-center">
          <CountdownItem unit="Day" text="days" onZero={handleConfetti} />
          <CountdownItem unit="Hour" text="hours" onZero={handleConfetti} />
          <CountdownItem unit="Minute" text="minutes" onZero={handleConfetti} />
          <CountdownItem unit="Second" text="seconds" onZero={() => { handleConfetti(); handleOpenModal(); }} />
        </div>
      </section>
      
      <div className="w-full">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      
      <MemoryGame />
    </>
  );
} 