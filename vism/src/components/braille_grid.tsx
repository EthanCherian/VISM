import React, { useEffect } from 'react';
import BrailleDot from "@/components/braille_dot";

interface BrailleGridProps {
    activeDots: [boolean, boolean, boolean, boolean, boolean, boolean];
    onDotToggle: (id: number) => void;
}

const BrailleGrid: React.FC<BrailleGridProps> = ({ activeDots, onDotToggle }) => {
    useEffect(() => {
        // re-render component when activeDots changes
        // console.log(`Active Dots: ${activeDots}`);
    }, [activeDots]);
    

    return (
        <div className="bg-gray-300 w-32 my-4 container grid grid-cols-2 grid-rows-3 grid-flow-col">
            {activeDots.map((active, index) => (
                <div key={index} className="ml-2 mr-0 my-2 p-0 gap-0 w-16">
                    <BrailleDot id={index + 1} active={active} onSwitch={() => onDotToggle(index + 1)}/>
                </div>
            ))}
        </div>
    );
};

export default BrailleGrid;