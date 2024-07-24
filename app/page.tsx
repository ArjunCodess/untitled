'use client'

import DragCards from "@/components/drag-cards";
import { CountdownItem } from "@/components/shifting-coutdown";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "@/components/ui/animated-modal";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ElevatorIcon, FoodIcon, ParachuteIcon, VacationIcon } from "@/components/icons";
import { MicIcon, PlaneIcon } from "lucide-react";
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
        setTimeout(() => setConfetti(false), 8000);
    };

    const handleOpenModal = () => setIsModalOpen(true);

    const images = [
        "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=3425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=2581&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ];

    return (
        <main>
            {confetti && <Confetti width={width-10} height={1.7*(height-10)} />}

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

            <section className="overflow-hidden">
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <ModalTrigger className="text-white flex justify-center w-full h-[430px] items-center">
                        <section className="flex justify-center items-center text-white">
                            <div className="text-center">
                                <h1 className="text-4xl md:text-6xl font-bold">Your Hero Text Here</h1>
                            </div>
                        </section>
                    </ModalTrigger>
                    <ModalBody>
                        <ModalContent>
                            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                                Book your trip to{" "}
                                <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                                    Bali
                                </span>{" "}
                                now! ✈️
                            </h4>
                            <div className="flex justify-center items-center">
                                {images.map((image, idx) => (
                                    <motion.div
                                        key={"images" + idx}
                                        style={{
                                            rotate: Math.random() * 20 - 10,
                                        }}
                                        whileHover={{
                                            scale: 1.1,
                                            rotate: 0,
                                            zIndex: 100,
                                        }}
                                        whileTap={{
                                            scale: 1.1,
                                            rotate: 0,
                                            zIndex: 100,
                                        }}
                                        className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
                                    >
                                        <Image
                                            src={image}
                                            alt="bali images"
                                            width="500"
                                            height="500"
                                            className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
                                        />
                                    </motion.div>
                                ))}
                            </div>
                            <div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
                                <div className="flex  items-center justify-center">
                                    <PlaneIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                        5 connecting flights
                                    </span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <ElevatorIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                        12 hotels
                                    </span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <VacationIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                        69 visiting spots
                                    </span>
                                </div>
                                <div className="flex  items-center justify-center">
                                    <FoodIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                        Good food everyday
                                    </span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <MicIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                        Open Mic
                                    </span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <ParachuteIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                        Paragliding
                                    </span>
                                </div>
                            </div>
                        </ModalContent>
                        <ModalFooter className="gap-4">
                            <button className="px-2 py-1 bg-gray-200 text-black dark:bg-neutral-950 dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </button>
                            <button className="bg-neutral-950 text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
                                Book Now
                            </button>
                        </ModalFooter>
                    </ModalBody>
                </Modal>
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