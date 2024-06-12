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
            convertDots(newDots as [boolean, boolean, boolean, boolean, boolean, boolean]);
            return newDots as [boolean, boolean, boolean, boolean, boolean, boolean];
        });
        console.log(`Active dots: ${activeDots}`);
    };

    const convertDots = async (dots: [boolean, boolean, boolean, boolean, boolean, boolean]) => {
        try {
            const response = await fetch(API_LINK + '/dots_to_music', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dots }),
            });
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error("Error converting dots: ", error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <BrailleGrid activeDots={activeDots} onDotToggle={toggleActive}/>
        </div>
    );
};