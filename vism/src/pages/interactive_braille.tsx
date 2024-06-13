'use client';
import { useState } from "react";
import { API_LINK } from "@/utils/constants";
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
            <BrailleGrid activeDots={activeDots} onDotToggle={toggleActive}/>
            {/* <p>{note}<br/> {duration} <br/> {accidental} <br/> {rest}</p> */}
            <div className="flex flex-row items-center m-5">
                <MusicIcon class="note" value={note}/>
                <MusicIcon class="duration" value={duration}/>
                <MusicIcon class="accidental" value={accidental}/>
                <MusicIcon class="rest" value={rest}/>
            </div>
        </div>
    );
};