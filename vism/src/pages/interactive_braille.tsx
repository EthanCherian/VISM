'use client';
import { useState } from "react";
import { API_LINK } from "@/utils/constants";
import BrailleGrid from "@/components/braille_grid";

export default function Home() {
    const [activeDots, setActiveDots] = useState<[boolean, boolean, boolean, boolean, boolean, boolean]>([false, false, false, false, false, false]);

    const toggleActive = (id: number) => {
        console.log(`Toggling active: ${id}`);
        setActiveDots(prevDots => {
            const newDots = [...prevDots];
            newDots[id - 1] = !newDots[id - 1];
            return newDots as [boolean, boolean, boolean, boolean, boolean, boolean];
        });
        console.log(`Active dots: ${activeDots}`);
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <BrailleGrid activeDots={activeDots} onDotToggle={toggleActive}/>
            <button
                onClick={() => { console.log(activeDots); }}>
                Click
            </button>
        </div>
    );
};