'use client';
import { useState } from "react";
import { API_LINK } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import BrailleGrid from "@/components/braille_grid";
import MusicIcon from "@/components/music_icon";

export default function Home() {
    const [activeDots, setActiveDots] = useState<[boolean, boolean, boolean, boolean, boolean, boolean]>([false, false, false, false, false, false]);
    const [note, setNote] = useState('');
    const [duration, setDuration] = useState('');
    const [accidental, setAccidental] = useState('');
    const [rest, setRest] = useState('');

    const toggleActive = (id: number) => {
        setActiveDots(prevDots => {
            const newDots = [...prevDots];
            newDots[id - 1] = !newDots[id - 1];
            convertDots(newDots as [boolean, boolean, boolean, boolean, boolean, boolean]);
            return newDots as [boolean, boolean, boolean, boolean, boolean, boolean];
        });
    };

    const clearAll = () => {
        setActiveDots([false, false, false, false, false, false]);
        setNote('');
        setDuration('');
        setAccidental('');
        setRest('');
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

            setNote(result.note);
            setDuration(result.duration);
            setAccidental(result.accidental);
            setRest(result.rest);
        } catch (error) {
            console.error("Error converting dots: ", error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center my-8">
            <div className="text-lg py-6">
                Here, you can explore some of the intricacies of braille sheet music through an interactive braille grid. <br/> <br/>
                To get started, simply click on some braille dots, and see the corresponding meaning of the formation update in real time.  
            </div>
            
            <BrailleGrid activeDots={activeDots} onDotToggle={toggleActive}/>

            <button onClick={clearAll} 
                className="mt-2 mb-6 px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded transition duration-300 ease-in-out"
            >
                Clear</button>

            <div className="flex flex-row items-center m-5">
                <MusicIcon class="note" value={note}/>
                <MusicIcon class="duration" value={duration}/>
                <MusicIcon class="accidental" value={accidental}/>
                <MusicIcon class="rest" value={rest}/>
            </div>

            <div className="text-lg py-6">
                Some hints/tips:
                <ul className="list-disc list-inside my-4">
                    <li className="px-5 mx-1">Braille dots are labeled 1-6</li>
                    <li className="px-5 mx-1">For the purposes of note and duration, dots 3 and 6 will determine the note duration, while 1, 2, 4, and 5 determine the note name</li>
                    <li className="px-5 mx-1">Rests and accidentals are treated differently and have no easy pattern for creating them</li>
                </ul>
            </div>

            <div className="text-lg py-6 justify-center items-center flex flex-col">
                <p>
                    Below is a comprehensive chart for converting between braille and standard sheet music notations, borrowed from <Link className="font-semibold text-blue-600 hover:text-blue-300" href="https://en.wikipedia.org/wiki/Braille_music#Introduction_to_Braille_music_symbols_and_syntax">Wikipedia</Link>
                </p>
                <p className="pt-4">
                    Notes, durations, and rests can be found in the top left, and accidentals can be seen in the bottom right. <br/>
                    For the sake of simplicity, I only implemented those conversions, but curious minds may examine the entirety of the chart at will.
                </p>
                <br/>
                <Image src={'/images/wiki_convert.png'} alt={"wiki convert"} width={512} height={512}/>
            </div>
        </div>
    );
};