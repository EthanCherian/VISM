import React from 'react';
import { useState } from "react";
import BrailleDot from "@/components/braille_dot";

interface BrailleGridProps {
    activeDots: [boolean, boolean, boolean, boolean, boolean, boolean];
    onDotToggle: (id: number) => void;
}

const BrailleGrid: React.FC<BrailleGridProps> = ({ activeDots, onDotToggle }) => {
    const indexToId = (index: number) => {
        // map 0-indexed list to braille dot id
        switch (index) {
            case 0:
                return 1;
            case 1:
                return 4;
            case 2:
                return 2;
            case 3:
                return 5;
            case 4:
                return 3;
            case 5:
                return 6;
            default:
                return 0;
        }
    };

    return (
        <div className="bg-gray-300 w-32 my-4 container grid grid-cols-2 grid-rows-3">
            {activeDots.map((active, index) => (
                <div key={index} className="ml-2 mr-0 my-2 p-0 gap-0 w-16">
                    <BrailleDot id={indexToId(index)} active={active} onSwitch={() => onDotToggle(indexToId(index))}/>
                </div>
            ))}
        </div>
    );
};

export default BrailleGrid;