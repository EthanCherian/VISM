import React, { useState } from 'react';

interface DotProps {
    id: number;
    active?: boolean;
    onSwitch?: (id: number) => void;
}

const BrailleDot: React.FC<DotProps> = ({ id, active, onSwitch }) => {
    const [dotActive, setDotActive] = useState<boolean>(active ?? false);

    const toggleActive = () => {
        setDotActive(!dotActive);
    };

    return (
        <>
            <button
                onClick={() => { toggleActive(); onSwitch && onSwitch(id); }}
                className={`w-12 h-12 m-0 p-0 gap-0 rounded-full flex items-center justify-center transition duration-300 ease-in-out
                            ${dotActive ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-2 border-blue-500'}`}
            >
                {id}
            </button>
        </>
    );
};

export default BrailleDot;