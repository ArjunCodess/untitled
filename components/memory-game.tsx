import { useState, useRef, useEffect } from "react";
import shuffle from "./shuffle";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// items with ids and image urls
const itemsWithIds = [
    { id: 1, imageUrl: "/images/card1.png" },
    { id: 1, imageUrl: "/images/card5.png" },
    { id: 2, imageUrl: "/images/card2.png" },
    { id: 2, imageUrl: "/images/card3.png" },
    { id: 3, imageUrl: "/images/card4.png" },
    { id: 3, imageUrl: "/images/card6.png" },
    { id: 4, imageUrl: "/images/card8.png" },
    { id: 4, imageUrl: "/images/card9.png" },
    { id: 5, imageUrl: "/images/card7.png" },
    { id: 5, imageUrl: "/images/card10.png" },
];

// Shuffle items
const allItems = shuffle([...itemsWithIds]);

interface CardState {
    index: number | null;
    id: number | null;
}

const defaultState: CardState = { index: null, id: null };

export default function MemoryGame() {
    const [firstCard, setFirstCard] = useState<CardState>(defaultState);
    const [secondCard, setSecondCard] = useState<CardState>(defaultState);
    const [matchedPairs, setMatchedPairs] = useState<{ [id: number]: boolean }>({});
    const [moves, setMoves] = useState<number>(0);
    const [score, setScore] = useState<number>(0); // Initialize score state

    const timer = useRef<NodeJS.Timeout | null>(null);
    const messageRef = useRef<HTMLDivElement | null>(null); // Ref for the message div

    const handleClick = (index: number, id: number): void => {
        if (firstCard.index === index || secondCard.index === index || matchedPairs[id]) {
            return; // Prevent clicking the same card or a matched card
        }

        if (timer.current) {
            clearTimeout(timer.current);
        }

        if (firstCard.index === null || (firstCard.index !== null && secondCard.index !== null)) {
            setSecondCard(defaultState);
            setFirstCard({ index, id });
        } else if (secondCard.index === null) {
            setSecondCard({ index, id });

            // Check if IDs match
            if (firstCard.id === id) {
                setMatchedPairs((prevPairs) => ({ ...prevPairs, [id]: true }));
                setScore((prevScore) => prevScore + 200); // Increase score for a match
            } else {
                timer.current = setTimeout(() => {
                    setFirstCard(defaultState);
                    setSecondCard(defaultState);
                }, 1000);
                setScore((prevScore) => prevScore - 50); // Decrease score for a mismatch
            }
        }

        setMoves((moves) => moves + 1);
    };

    const allPairsMatched = Object.keys(matchedPairs).length === itemsWithIds.length / 2;

    useEffect(() => {
        if (allPairsMatched && messageRef.current) messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [allPairsMatched]);

    return (
        <div className="text-neutral-200 text-center md:my-16 my-10 max-w-5xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-5 my-5">
                {allItems.map((item, index) => {
                    const isFlipped = firstCard.index === index || secondCard.index === index || matchedPairs[item.id];
                    return (
                        <div
                            key={index}
                            className={`card col-span-1 sm:w-full h-30 w-40 mx-auto ${isFlipped ? "flipped" : ""}`}
                            onClick={() => handleClick(index, item.id)}
                        >
                            <div className="backSide"></div>
                            <Image
                                alt={`cat ${index}`}
                                src={item.imageUrl}
                                width={100}
                                height={100}
                            />
                        </div>
                    );
                })}
            </div>
            <p className="max-w-base bg-gradient-to-br pt-2 from-white to-gray-400 bg-clip-text text-center text-base font-medium leading-tight text-transparent sm:text-lg sm:leading-tight md:text-xl md:leading-tight">
                Moves used: {Math.floor(moves / 2)}
            </p>
            <p className="max-w-base bg-gradient-to-br pt-2 from-white to-gray-400 bg-clip-text text-center text-base font-medium leading-tight text-transparent sm:text-lg sm:leading-tight md:text-xl md:leading-tight">
                Score: {score}
            </p>
            {allPairsMatched && (
                <div ref={messageRef} className="transition duration-300" id="message">
                    <p className="mt-10 text-3xl font-bold text-green-500">Our story is still fresh in your mind, right?</p>
                    <p className="text-3xl font-bold text-green-500 pb-5">Impressive score btw.</p>
                    <Link href="/memories/1">
                        <Button variant="default" className="border p-4 rounded-full border-neutral-400">
                            Let&apos;s review a bunch of memories together.<ArrowRight />
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}